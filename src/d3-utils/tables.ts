import { TABLE_WIDTH } from '../utils/constants'
import * as d3 from 'd3';
// import { drag } from './drag'
import { theme } from '@looker/components'
import { getLabelColor, getColor, getLabelWeight, getLabel } from './styles';
import { getX, getY, getRowOffset } from './position';
import { SelectionInfoPacket } from "../components/interfaces"
import { isArrayLike } from 'lodash';

export function createLookmlViewElement(
  svg: d3.Selection<SVGElement, {}, HTMLElement, any>, 
  tableData: any[],
  selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (packet: SelectionInfoPacket) => void,
  ) {
  
  let header = tableData[0]

  let table = svg
  .select(".diagram-area")
  .append("g")
  .attr("class", "table-"+header.view)

  table.append("rect")
  .attr("fill", theme.colors.background)
  .style("filter", "url(#drop-shadow)")
  .attr("class", "table-background-"+header.view)
  .attr("x", header.diagramX)
  .attr("y", header.diagramY)
  .attr("width", TABLE_WIDTH)
  .attr("height", getRowOffset(tableData.length)-7)
  
  let tableRow = table.selectAll(".table-row-"+header.view)
  .data(tableData)
  .enter()
  .append("g")
  .attr("class", "table-row-"+header.view)
  .attr("id", (d: any, i: number) => {return `${d.name && d.name.replace(".","-")}`})
  .attr("transform", (d: any, i: number) => {
    return `translate(${header.diagramX}, ${header.diagramY + getRowOffset(i)})`
  })
  .style("cursor", "pointer");

  // Create table elements
  tableRow.append("rect")
  .attr("fill", (d: any) => getColor(d))
  .attr("stroke", (d: any) => getColor(d))
  .attr("stroke-width", "10px")
  .attr("width", TABLE_WIDTH)
  .attr("height", "20px");

  // Add drag handler to each table
  // tableRow.call(drag);

  // Label table elements
  tableRow.append("text")
  .attr("fill", (d: any) => getLabelColor(d))
  .attr("font-weight", (d: any) => getLabelWeight(d))
  .attr("dy", "0.8em")
  .text((d: any) => getLabel(d));


  tableRow.on("mouseenter", (d: any, i: number) => {
    let arr: any = d3.select(d.toElement).datum()
    d3.select("#" + arr.name.replace(".","-") + " > rect").attr("stroke", theme.colors.key).attr("fill", theme.colors.key)
    d3.select("#" + arr.name.replace(".","-") + " > text").attr("fill", theme.colors.keyText)
  })
  .on("mouseleave", (d: any, i: number) => {
    let arr: any = d3.select(d.fromElement).datum()
    if (JSON.stringify(selectionInfo) !== JSON.stringify({
      lookmlElement: arr.category,
      name: arr.name
    })) {
      d3.select("#" + arr.name.replace(".","-") + " > rect").attr("stroke", getColor(arr)).attr("fill", getColor(arr))
      d3.select("#" + arr.name.replace(".","-") + " > text").attr("fill", getLabelColor(arr))
    }
  })
  .on("click", (d: any, i: number) => {
    let arr: any = d3.select(d.toElement).datum()
    setSelectionInfo({
      lookmlElement: arr.category,
      name: arr.name
    })
    d3.select("#" + arr.name.replace(".","-") + " > rect").attr("stroke", theme.colors.key).attr("fill", theme.colors.key)
    d3.select("#" + arr.name.replace(".","-") + " > text").attr("fill", theme.colors.keyText)
  });
}
