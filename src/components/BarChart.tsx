import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../utils/diagrammer'
import { theme } from '@looker/components'
import { cpuUsage } from 'process';

export const BarChart: React.FC<{data: any, dimensions: any}> = ({data, dimensions}) => {
    function getColorByComponent(category: string) {
      if (category === "view") {
        return "steelblue"
      } else if (category === "dimension") {
        return "#ccd8e4"
      } else if (category === "measure") {
        return "#e4d0bd"
      }
    }
    const ref = useD3(
        // d3 callback
        (svg) => {
          // console.log(svg._groups[0][0])
          d3.selectAll(".plot-area > *").remove();
          const height = svg._groups[0][0].clientHeight;
          const width = svg._groups[0][0].clientWidth;
          const margin = { top: 20, right: 30, bottom: 30, left: 40 };

          const x = d3
            .scaleBand()
            .domain(dimensions.diagramViews)
            .rangeRound([margin.left, width - margin.right])
            .padding(0.1);

          const y1 = d3
            .scaleLinear()
            .domain([0, 100])
            .rangeRound([margin.top, height - margin.bottom]);
          console.log(dimensions)

          dimensions.diagramViews.map((d: string, i: number) => {
            let tableData = dimensions.diagramDict[d];
            console.log(tableData)
            svg
              .select(".plot-area")
              .selectAll(".bar"+d)
              .data(tableData)
              .join("rect")
              .attr("fill", (r: any) => getColorByComponent(r.category))
              .attr("class", "bar"+d)
              .attr("text", (d) => d.view)
              .attr("x", (d) => x(d.view))
              .attr("width", x.bandwidth())
              .attr("y", (d, i) => y1(i))
              .attr("height", "10px");
          })
        },
        // dependencies array
        [
          data.length,
          dimensions,
        ]
      );
  return (
    <svg
      ref={ref}
      style={{
        height: "90%",
        width: "100%",
        backgroundColor: `${theme.colors.ui1}`
      }}
      id={"diagram-svg"}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;
