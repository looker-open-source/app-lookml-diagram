import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../d3-utils/useD3'
import { theme } from '@looker/components'
import { ILookmlModelExplore } from '@looker/sdk/lib/sdk/3.1/models';
import { addFilter } from '../d3-utils/styles'
import { addZoom } from '../d3-utils/zoom'
import { createLookmlViewElement } from '../d3-utils/tables'
import { addJoinArrowheads, createLookmlJoinElement } from '../d3-utils/joins'
import { SelectionInfoPacket } from "./interfaces"
import { 
  DIAGRAM_BACKGROUND_COLOR, 
  DIAGRAM_HOVER_COLOR, 
  DIAGRAM_HOVER_TEXT_COLOR,
  DIAGRAM_BASE_TEXT_COLOR,
  DIAGRAM_SELECT_COLOR, 
  DIAGRAM_SELECT_TEXT_COLOR,
  DIAGRAM_TEXT_COLOR,
  TABLE_BACKGROUND_COLOR,
  DIAGRAM_FIELD_ICON_COLOR,
  DIAGRAM_PK_ICON_COLOR,
  DIAGRAM_JOIN_COLOR,
  DIAGRAM_VIEW_WEIGHT,
  DIAGRAM_FIELD_WEIGHT,
  DIAGRAM_FIELD_COLOR,
  DIAGRAM_VIEW_COLOR,
  DIAGRAM_BASE_VIEW_COLOR,
  DIAGRAM_DIMENSION_COLOR,
  DIAGRAM_MEASURE_COLOR,
  DIAGRAM_FIELD_STROKE_WIDTH,
  DIAGRAM_TEXT_SIZE,
  NONVIEWS,
  DIAGRAM_JOIN_SELECT_COLOR
} from "../utils/constants"
import styled from "styled-components"

const DiagramSpace = styled.svg`
  background-color: ${DIAGRAM_BACKGROUND_COLOR};
  cursor: move;
  width: 100%;
  height: 100%;
  user-select: none;

  .clickable-background {
    fill: transparent;
  }

  rect.table-background {
    stroke: ${TABLE_BACKGROUND_COLOR};
    stroke-width: 10;
  }

  // Basic table rows

  g.table-row {
    cursor: pointer;
  }

  .row-divider {
    stroke: ${TABLE_BACKGROUND_COLOR};
  }

  g.table-row > rect,
  g.table-row > path.table-row {
    stroke-width: ${DIAGRAM_FIELD_STROKE_WIDTH}px;
    stroke: ${DIAGRAM_FIELD_COLOR};
    fill: ${DIAGRAM_FIELD_COLOR};
  }

  g.table-row > path.datatype-icon {
    fill: ${DIAGRAM_FIELD_ICON_COLOR};
  }

  g.table-row > path.pk-icon {
    fill: ${DIAGRAM_PK_ICON_COLOR};
  }

  g.table-row-view > rect,
  g.table-row-view > path.table-row {
    stroke: ${DIAGRAM_VIEW_COLOR};
    fill: ${DIAGRAM_VIEW_COLOR};
  }

  g.table-row-base-view > rect,
  g.table-row-base-view > path.table-row {
    stroke: ${DIAGRAM_BASE_VIEW_COLOR};
    fill: ${DIAGRAM_BASE_VIEW_COLOR};
  }

  g.table-row-dimension > rect,
  g.table-row-measure > path.table-row {
    stroke: ${DIAGRAM_DIMENSION_COLOR};
    fill: ${DIAGRAM_DIMENSION_COLOR};
  }

  g.table-row-measure > rect,
  g.table-row-measure > path.table-row {
    stroke: ${DIAGRAM_MEASURE_COLOR};
    fill: ${DIAGRAM_MEASURE_COLOR};
  }

  g.table-row > text {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-weight: ${DIAGRAM_FIELD_WEIGHT};
    font-size: ${DIAGRAM_TEXT_SIZE};
  }

  g.table-row-view > text {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-weight: ${DIAGRAM_VIEW_WEIGHT};
  }

  g.table-row-base-view > text {
    fill: ${DIAGRAM_BASE_TEXT_COLOR};
    font-weight: ${DIAGRAM_VIEW_WEIGHT};
  }

  // Rows when hover, selected

  g.table-row-selected > rect,
  g.table-row-selected > path.table-row {
    stroke: ${DIAGRAM_SELECT_COLOR};
    fill: ${DIAGRAM_SELECT_COLOR};
  }

  g.table-row-selected > text,
  g.table-row-selected > path.pk-icon,
  g.table-row-selected > path.datatype-icon {
    fill: ${DIAGRAM_SELECT_TEXT_COLOR};
  }

  g.table-row:not(.table-row-selected):hover > rect,
  g.table-row:not(.table-row-selected):hover > path.table-row {
    stroke: ${DIAGRAM_HOVER_COLOR};
    fill: ${DIAGRAM_HOVER_COLOR};
  }

  g.table-row:not(.table-row-selected):hover > text {
    fill: ${DIAGRAM_HOVER_TEXT_COLOR};
  }

  // JOINS

  g > path.join-path {
    fill: none;
    stroke: ${DIAGRAM_JOIN_COLOR};
    stroke-width: 3px;
  }

  g > path.join-path-hover {
    fill: none;
    stroke: transparent;
    stroke-width: 100px;
    cursor: pointer;
  }

  g > marker > path {
    fill: ${DIAGRAM_JOIN_COLOR};
  }

  g.join-path-selected > path.join-path {
    stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke-width: 8px;
  }
  
  g.join-path-selected > marker > path {
    fill: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke-width: 2px;
  }

  g.join-path-selected > text.join-path-icon-label {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-size: xx-small;
    font-family: monospace;
    text-anchor: middle;
  }

  g.join-path-selected > rect.join-path-icon-background {
    fill: ${DIAGRAM_BACKGROUND_COLOR};
  }

  g.join-path-selected > path.join-path-icon-right,
  g.join-path-selected > circle.join-path-icon-right {
    fill: #6EA391;
  }

  g.join-path-selected > path.join-path-icon-left,
  g.join-path-selected > circle.join-path-icon-left {
    fill: #997CAD;
  }

  g.join-path-selected > path.join-path-icon-connector {
    stroke: #939BA5;
    stroke-width: 1.95833;
  }
`

export const Diagram: React.FC<{
  dimensions: any, 
  explore: ILookmlModelExplore,
  reload: boolean,
  selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (packet: SelectionInfoPacket) => void,
  hiddenToggle: boolean,
  displayFieldType: string,
  viewVisible: any,
}> = ({dimensions, explore, reload, selectionInfo, setSelectionInfo, hiddenToggle, displayFieldType, viewVisible}) => {
  let diagramViews = Object.keys(viewVisible).filter((viewName: string) => {
    return viewVisible[viewName]
  })

  const ref = useD3(
    // useD3 callback,
    // This function will be called for each d3 render
    (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
      // Clean up the previous d3 render
      d3.selectAll(".diagram-area > *").remove();

      // Add clickable background 
      d3.select("g.diagram-area")
      .append("rect")
      .attr("class", "clickable-background")
      .attr("width", "10000")
      .attr("height", "10000")
      .attr("x", "-5000")
      .attr("y", "-5000")
      .on("click", () => {
        setSelectionInfo({})
      })

      // Add global svg defs
      let zoom = addZoom(svg);

      let filter = addFilter(svg);

      // Create all joins
      dimensions.diagramDict._joinData.map((join: any, index: number) => {
        // but not to any disabled tables
        let allVisible = true
        join.map((joinPart: any) => {
          if (!viewVisible[joinPart.viewName]) {
            allVisible = false 
          }
        })
        allVisible && createLookmlJoinElement(svg, join, dimensions.diagramDict, explore, selectionInfo, setSelectionInfo);
      })

      // Create all tables
      diagramViews.map((lookmlViewName: string, index: number) => {
        let tableData = dimensions.diagramDict[lookmlViewName];
        tableData && createLookmlViewElement(svg, tableData, selectionInfo, setSelectionInfo);
      })

      let tableRowTypes = ["dimension", "measure", "view"]
      // Highlight anything selected on previous render
      if (tableRowTypes.includes(selectionInfo.lookmlElement)) {
        d3.select("#" + selectionInfo.name.replace(".","-"))
        .classed("table-row-selected", true)
      } else if (selectionInfo.lookmlElement === "join") {
        d3.selectAll("g.join-"+selectionInfo.name)
        .classed("join-path-selected", true)
        .raise()
      }
    },
    // useD3 dependencies array,
    // Diagram will be redrawn any time these variables change
    [
      diagramViews.length,
      explore.name,
      reload,
      selectionInfo,
      hiddenToggle,
      displayFieldType
    ]
  );
  return (
    <DiagramSpace
      ref={ref}
      id={"diagram-svg"}
    >
      <g className="diagram-area" />
    </DiagramSpace>
  );
}

export default Diagram;
