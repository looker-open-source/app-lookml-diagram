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
  DIAGRAM_HIGHLIGHT_COLOR, 
  DIAGRAM_HIGHLIGHT_TEXT_COLOR,
  DIAGRAM_TEXT_COLOR,
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
  DIAGRAM_TEXT_SIZE
} from "../utils/constants"
import styled from "styled-components"

const DiagramSpace = styled.svg`
  background-color: ${props => props.theme.colors.ui1};
  cursor: move;
  width: 100%;
  height: 100%;
  user-select: none;

  .clickable-background {
    fill: transparent;
  }

  rect.table-background {
    //filter: url(#drop-shadow);
    stroke: ${props => props.theme.colors.ui3};
    stroke-width: 10;
  }

  g.table-row {
    cursor: pointer;

    rect {
      stroke-width: ${DIAGRAM_FIELD_STROKE_WIDTH}px;
      stroke: #fff;
      fill: #fff;
    }
    .row-icon {
      fill: ${props => props.theme.colors.text1}
    }
    

    path, path.pk-icon {
      fill: ${DIAGRAM_FIELD_ICON_COLOR};
    }
    
    .row-divider {
      stroke: ${props => props.theme.colors.ui3};
    }

    &:hover  {
      rect {
        stroke: ${props => props.theme.colors.neutralAccent};
        fill: ${props => props.theme.colors.neutralAccent};
      }

    }
  }


  g.table-row-view > rect {
    stroke: ${DIAGRAM_VIEW_COLOR};
    fill: ${DIAGRAM_VIEW_COLOR};
  }

  g.table-row-base-view > rect {
    stroke: ${DIAGRAM_BASE_VIEW_COLOR};
    fill: ${DIAGRAM_BASE_VIEW_COLOR};
  }

  g.table-row-dimension > rect {
    stroke: #fff;
    fill: #fff;
  }

  g.table-row-measure {
    rect {
      stroke: ${props => props.theme.colors.warnAccent};
      fill: ${props => props.theme.colors.warnAccent};
    }

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
    fill: ${DIAGRAM_HIGHLIGHT_TEXT_COLOR};
    font-weight: ${DIAGRAM_VIEW_WEIGHT};
  }

  g.table-row-selected {
  
    rect, &:hover rect {
      stroke: ${props => props.theme.colors.ui2};
      fill: ${props => props.theme.colors.ui2};
    }
  }

  /* g.table-row-selected > text {
    fill: ${DIAGRAM_HIGHLIGHT_TEXT_COLOR};
  } */

  /* g.table-row-selected > path {
    fill: ${DIAGRAM_HIGHLIGHT_TEXT_COLOR};
  }

  g.table-row-selected > path.pk-icon {
    fill: ${DIAGRAM_HIGHLIGHT_TEXT_COLOR};
  } */

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
    stroke: ${DIAGRAM_HIGHLIGHT_COLOR};
    stroke-width: 8px;
  }
  
  g.join-path-selected > marker > path {
    fill: ${DIAGRAM_HIGHLIGHT_COLOR};
    stroke: ${DIAGRAM_HIGHLIGHT_COLOR};
    stroke-width: 2px;
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
}> = ({dimensions, explore, reload, selectionInfo, setSelectionInfo, hiddenToggle, displayFieldType}) => {
  let diagramViews = Object.keys(dimensions.diagramDict)

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
        createLookmlJoinElement(svg, join, dimensions.diagramDict, explore, selectionInfo, setSelectionInfo);
      })

      // Create all tables
      diagramViews.map((lookmlViewName: string, index: number) => {
        const nonViews = ["_joinData", "_yOrderLookup"]
        if (nonViews.includes(lookmlViewName)) { return }
        let tableData = dimensions.diagramDict[lookmlViewName];
        createLookmlViewElement(svg, tableData, selectionInfo, setSelectionInfo);
      })

      let tableRowTypes = ["dimension", "measure", "view"]
      // Highlight anything selected
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
