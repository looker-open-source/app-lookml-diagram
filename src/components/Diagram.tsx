import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../utils/diagrammer'
import { theme } from '@looker/components'
import { ILookmlModelExplore } from '@looker/sdk/lib/sdk/3.1/models';

export const Diagram: React.FC<{
  dimensions: any, 
  explore: ILookmlModelExplore
}> = ({dimensions, explore}) => {
  // TODO: move diagram style functions out
  function getColor(field: any, index: number) {
    let category = field.category
    if (category === "view") {
      return field.view === explore.name ? "steelblue" : "#ccd8e4"
    } else if (category === "dimension") {
      return index % 2 ? "#FFF" : "#f6f8fa"
    } else if (category === "measure") {
      return index % 2 ? "#f7f2ee" : "#FFFFFF"
    }
  }
  function getLabel(field: any) {
    if (field.category === "view") {
      return field.view
    } else {
      return field.name.split(".")[1]
    } 
  }
  function getLabelWeight(field: any) {
    if (field.category === "view") {
      return theme.fontWeights.medium
    } else {
      return theme.fontWeights.normal
    } 
  }
  const ref = useD3(
    // d3 callback
    (svg: any) => {
      // Clean up the previous d3 render
      d3.selectAll(".plot-area > *").remove();

      const height = document.getElementById("DiagramStage").clientHeight;
      const width = document.getElementById("DiagramStage").clientWidth;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      // A function that determines x position of an element
      // based on the LookmlView it belongs to. TODO: custom pos
      const x = d3
      .scaleBand()
      .domain(dimensions.diagramViews)
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

      // A function that determines y position of an element
      // based on the index of the LookmlView it belongs to. 
      // TODO: custom pos
      const y1 = d3
      .scaleLinear()
      .domain([0, 50])
      .rangeRound([margin.top, height - margin.bottom]);

      // Create all LookmlView tables
      dimensions.diagramViews.map((lookmlViewName: string, index: number) => {
        let tableData = dimensions.diagramDict[lookmlViewName];
        let table = svg
        .select(".diagram-area")
        .selectAll(".table-row-"+lookmlViewName)
        .data(tableData)
        .enter();
        
        // Create table elements
        table.append("rect")
        .attr("fill", (r: any, i: number) => getColor(r, i))
        .attr("stroke", (r: any, i: number) => getColor(r, i))
        .attr("stroke-width", "8px")
        .attr("class", "table-row-"+lookmlViewName)
        .attr("x", (d: any) => x(d.view))
        .attr("width", x.bandwidth())
        .attr("y", (d: any, i: number) => y1(i))
        .attr("height", "18px");

        // Label table elements
        table.append("text")
        .attr("fill", (r: any) => "#282828")
        .attr("class", "table-row-"+lookmlViewName)
        .attr("font-weight", (d: any) => getLabelWeight(d))
        .attr("x", (d: any) => x(d.view))
        .attr("y", (d: any, i: number) => y1(i))
        .attr("dy", "0.8em")
        .text((d: any) => getLabel(d));
      })
    },
    // useD3 dependencies array
    [
      ...dimensions.diagramViews,
      document.getElementById("DiagramStage").clientHeight,
      document.getElementById("DiagramStage").clientWidth,
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
