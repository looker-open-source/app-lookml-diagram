import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../utils/diagrammer'
import { MAX_TEXT_LENGTH, TABLE_WIDTH } from '../utils/constants'
import { theme } from '@looker/components'
import { ILookmlModelExplore, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { ILookmlModelExploreField } from '@looker/sdk';

export const Diagram: React.FC<{
  dimensions: any, 
  explore: ILookmlModelExplore,
}> = ({dimensions, explore}) => {
  let arr: number[] = []
  let correctionArr = dimensions.diagramViews.map((d:any, i:number)=>{
    arr.push(dimensions.diagramDict[d][0].x)
    arr.push(dimensions.diagramDict[d][0].y)
  })
  let corSum = arr.reduce(function(a, b){return a + b;}, 0)
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
  function truncateLabel(text: string) {
    if (text.length > MAX_TEXT_LENGTH) {
      return text.substring(0, MAX_TEXT_LENGTH)+"..."
    }
    return text
  }
  function getLabel(field: any) {
    if (field.category === "view") {
      return truncateLabel(field.view)
    } else {
      return truncateLabel(field.name.split(".")[1])
    } 
  }
  function getLabelColor(field: any) {
    if (field.category === "view") {
      return field.view === explore.name ? theme.colors.keyText : theme.colors.text
    } else {
      return theme.colors.text
    } 
  }
  function getLabelWeight(field: any) {
    if (field.category === "view") {
      return theme.fontWeights.medium
    } else {
      return theme.fontWeights.normal
    } 
  }
  function addFilter(svg: any) {
    var defs = svg.append("defs");
    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "150%");
    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");
    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
  }
  const ref = useD3(
    // d3 callback
    (svg: any) => {

      // Clean up the previous d3 render
      d3.selectAll(".diagram-area > *").remove();

      var zoom = d3.zoom()
      .scaleExtent([0, 2])
      .on('zoom', function(event) {
          d3.selectAll('.diagram-area')
           .attr('transform', event.transform);
      });

      svg.call(zoom);

      const height = document.getElementById("DiagramStage").clientHeight;
      const width = (dimensions.diagramViews.length * TABLE_WIDTH)
      const margin = { top: 20, right: 30, bottom: 30, left: 20 };

      function dragstarted(event: any, d: any) {
        d3.select(".table-row-"+d.view)
        .attr("stroke", "yellow")
        .attr("fill", "yellow");
      }
    
      function dragged(event: any, d: any) {
        console.log(d3.selectAll(".table-row-"+d.view).attr("data-index"))
        d3.selectAll(".table-row-"+d.view)
        .attr("x", d.x = event.x)
        .attr("y", d.y = event.y);
      }
    
      function dragended(event: any, d: any) {
        d3.selectAll(".table-row-"+d.view)
        .attr("stroke", getColor(d, 0))
        .attr("fill", getColor(d, 0));
      }
    
      let drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

      // A function that determines x position of an element
      // based on the LookmlView it belongs to. TODO: custom pos
      const x = d3
      .scaleBand()
      .domain(dimensions.diagramViews)
      .rangeRound([margin.left, width+margin.left])
      .paddingInner(0.9);

      function getX(viewName: string) {
        return x(viewName)
      }

      // A function that determines y position of an element
      // based on the index of the LookmlView it belongs to. 
      // TODO: custom pos
      const y1 = d3
      .scaleLinear()
      .domain([0, 40])
      .rangeRound([margin.top, height + margin.top]);

      function getY(viewName: string, viewIndex: number) {
        return y1(viewIndex)
      }

      // Create all LookmlView tables
      dimensions.diagramViews.map((lookmlViewName: string, index: number) => {
        let tableData = dimensions.diagramDict[lookmlViewName];

        let filter = addFilter(svg);

        // Create table background
        svg.select(".diagram-area")
        .append("rect")
        .attr("fill", theme.colors.background)
        .style("filter", "url(#drop-shadow)")
        .attr("class", "table-background-"+lookmlViewName)
        .attr("x", getX(lookmlViewName))
        .attr("y", getY(lookmlViewName, 0))
        .attr("width", TABLE_WIDTH)
        .attr("height", getY(lookmlViewName, tableData.length-1));

        let table = svg
        .select(".diagram-area")
        .selectAll(".table-row-"+lookmlViewName)
        .data(tableData)
        .enter()
        .append("g")
        .attr("class", "table-row-"+lookmlViewName)
        .attr("transform", (d: any, i: number) => {return `translate(${getX(lookmlViewName)},${getY(lookmlViewName, i)})`});

        // Create table elements
        table.append("rect")
        .attr("fill", (r: any, i: number) => getColor(r, i))
        .attr("stroke", (r: any, i: number) => getColor(r, i))
        .attr("stroke-width", "10px")
        .attr("width", TABLE_WIDTH)
        .attr("height", "20px")
        .call(drag);

        // Label table elements
        table.append("text")
        .attr("fill", (r: any) => getLabelColor(r))
        .attr("font-weight", (d: any) => getLabelWeight(d))
        .attr("dy", "0.8em")
        .text((d: any) => getLabel(d));
      })

      explore.joins.map((join: ILookmlModelExploreJoins, index: number) => {
        let joinPathData = join.dependent_fields.map((field: string, index: number) => {
          let joinFieldArr = field.split(".")
          let tableRef = dimensions.diagramDict[joinFieldArr[0]]
          let fieldLookup = tableRef && dimensions.diagramDict[joinFieldArr[0]].findIndex((x: ILookmlModelExploreField) => x.name === field)
          return {table: joinFieldArr[0], field: fieldLookup || 0}
        })
        svg.select(".diagram-area")
        .append("path")
        .datum(joinPathData)
        .attr("class", "join-"+join.name)
        .attr("fill", "none")
        .attr("stroke", theme.colors.inverse)
        .attr("stroke-width", 3)
        .attr("d", d3.line()
          .x((d: any) => getX(d.table))
          .y((d: any) => getY(d.table, d.field))
        )
      })
    },
    // useD3 dependencies array
    [
      dimensions.diagramViews.length,
      arr.length,
      corSum
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
