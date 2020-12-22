import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../d3-utils/useD3'
import { theme } from '@looker/components'
import { ILookmlModelExplore } from '@looker/sdk/lib/sdk/3.1/models';
import { addFilter } from '../d3-utils/styles'
import { addZoom } from '../d3-utils/zoom'
import { createLookmlViewElement } from '../d3-utils/tables'
import { createLookmlJoinElement } from '../d3-utils/joins'

export const Diagram: React.FC<{
  dimensions: any, 
  explore: ILookmlModelExplore,
  reload: boolean,
}> = ({dimensions, explore, reload}) => {
  let diagramViews = Object.keys(dimensions.diagramDict)
  const ref = useD3(
    // useD3 callback
    (svg: d3.Selection<SVGElement, {}, HTMLElement, any>) => {
      // Clean up the previous d3 render
      d3.selectAll(".diagram-area > *").remove();

      // Add global svg defs
      let zoom = addZoom(svg);
      let filter = addFilter(svg);

      // Create all joins
      dimensions.diagramDict._joinData.map((join: any, index: number) => {
        createLookmlJoinElement(svg, join, dimensions.diagramDict, explore);
      })

      // Create all tables
      diagramViews.map((lookmlViewName: string, index: number) => {
        const nonViews = ["_joinData", "_yOrderLookup"]
        if (nonViews.includes(lookmlViewName)) { return }
        let tableData = dimensions.diagramDict[lookmlViewName];
        createLookmlViewElement(svg, tableData);
      })

      // // Create all joins
      // dimensions.diagramDict._joinData.map((join: any, index: number) => {
      //   createLookmlJoinElement(svg, join, dimensions.diagramDict);
      // })
    },
    // useD3 dependencies array
    [
      diagramViews.length,
      explore.name,
      reload
    ]
  );
  return (
    <svg
      ref={ref}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: `${theme.colors.ui1}`
      }}
      id={"diagram-svg"}
    >
      <g className="diagram-area" />
    </svg>
  );
}

export default Diagram;
