import * as d3 from 'd3';
import { ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { TABLE_WIDTH } from '../utils/constants'
import { getJoinX, getRowOffset } from './position'
import { theme } from '@looker/components'

export function createLookmlJoinElement(svg: any, joinData: any, diagramDict: any) {
  let joinPath: any[]
  let xLookup = joinData.map((d:any)=>{
    let joinedTableData = diagramDict[d.viewName]
    return joinedTableData[d.fieldIndex].diagramX
  })
  joinPath = joinData.map((d: any, i: number)=>{
    let shift = TABLE_WIDTH + 5
    let nextIndex = i;
    while (joinData[nextIndex] && joinData[nextIndex].viewName === d.viewName) {
      nextIndex++;
    }
    let lastIndex = i;
    while (joinData[lastIndex] && joinData[lastIndex].viewName === d.viewName) {
      lastIndex--;
    }
    let nextBase = xLookup[nextIndex] - xLookup[i]
    let lastBase = xLookup[lastIndex] - xLookup[i]
    if (nextBase > 240 || lastBase > 240) {
      return {
        ...d,
        xShift: shift,
      }
    }
    return {
      ...d,
      xShift: -5,
    }
  })
  let joinPathModified: any[] = []
  joinPath.map((d: any, i: number)=>{
    if (d.xShift === -5) {
      
      joinPathModified.push({
        ...d,
        xShift: d.xShift-30,
        type: "bus"
      })
      joinPathModified.push(d)
    } else {
  
      joinPathModified.push({
        ...d,
        xShift: d.xShift+30,
        type: "bus"
      })
      joinPathModified.push(d)
    }
  })
  svg.select(".diagram-area")
  .append("path")
  .datum(joinPathModified)
  .attr("class", "join-"+joinData[0].joinName)
  .attr("fill", "none")
  .attr("stroke", theme.colors.inverse)
  .attr("stroke-width", 2.5)
  .attr("id", (d:any) => d.viewName)
  .attr("d", d3.line().curve(d3.curveStepAfter)
    .x((d: any) => diagramDict[d.viewName][0].diagramX + d.xShift)
    .y((d: any) => diagramDict[d.viewName][0].diagramY + getRowOffset(d.fieldIndex) + 7)
  )
  .on("mouseenter", (d: any, i: number) => {
    d3.select(d.toElement).attr("stroke-width", 5)
  })
  .on("mouseleave", (d: any, i: number) => {
    d3.select(d.fromElement).attr("stroke-width", 2.5)
  })
  .on("click", (d: any, i: number) => {
    console.log(d)
  })
}
