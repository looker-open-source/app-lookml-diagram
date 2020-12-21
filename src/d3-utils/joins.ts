import * as d3 from 'd3';
import { ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { TABLE_WIDTH } from '../utils/constants'
import { getJoinX, getRowOffset } from './position'
import { theme } from '@looker/components'
import { onlyUnique } from '../utils/diagrammer'

export function createLookmlJoinElement(svg: any, joinData: any, diagramDict: any) {
  let partArray: any[] = []
  let tablePad = 25
  let r_shift = TABLE_WIDTH + tablePad
  let l_shift = tablePad * -1
  let joinParts = joinData.map((d: any) => { return d.viewName}).filter(onlyUnique).sort((a: any, b: any) => {
    if (diagramDict[a][0].diagramX < diagramDict[b][0].diagramX) {
      return -1
    } else {
      return 1
    }
  })
  let stopPartIndex = joinParts.length - 2
  joinParts.forEach((d: any, i: number) => {
    if (i <= stopPartIndex) {
      partArray.push(joinData.filter((joinPoint: any, pointI: number) => {
        return joinPoint.viewName === joinParts[i] || joinPoint.viewName === joinParts[i+1]
      }))
    }
  })
  partArray.map((path: any) => {
    let joinPath: any[]
    let xLookup = path.map((d:any)=>{
      let joinedTableData = diagramDict[d.viewName]
      return joinedTableData[d.fieldIndex].diagramX
    })
    joinPath = path.map((d: any, i: number)=>{
      let nextIndex = i;
      while (path[nextIndex] && path[nextIndex].viewName === d.viewName) {
        nextIndex++;
      }
      let lastIndex = i;
      while (path[lastIndex] && path[lastIndex].viewName === d.viewName) {
        lastIndex--;
      }
      let nextBase = xLookup[nextIndex] - xLookup[i]
      let lastBase = xLookup[lastIndex] - xLookup[i]
      if (nextBase > 230 || lastBase > 230) {
        return {
          ...d,
          toX: diagramDict[d.viewName][0].diagramX,
          joinX: diagramDict[d.viewName][0].diagramX + r_shift,
          joinY: diagramDict[d.viewName][0].diagramY + getRowOffset(d.fieldIndex),
        }
      }
      return {
        ...d,
        toX: diagramDict[d.viewName][0].diagramX,
        joinX: diagramDict[d.viewName][0].diagramX + l_shift,
        joinY: diagramDict[d.viewName][0].diagramY + getRowOffset(d.fieldIndex),
      }
    }).sort((a: any, b: any) => {
      if (a.toX < b.toX) {
        return -1
      } if (a.toX === b.toX && a.fieldIndex < b.fieldIndex) {
        return -1
      } else {
        return 1
      }
    })


    console.log(joinPath)

    let join = svg
    .select(".diagram-area")
    .append("g")

    let terminalAlign = joinPath.map((d: any) => { return d.viewName}).filter(onlyUnique)

    joinPath.forEach((joinField: any, i: number) => {
      let connectorX = terminalAlign.indexOf(joinField.viewName) ? joinField.joinX : joinField.joinX - tablePad
      join.append("rect")
      .attr("class", "join-"+joinField.joinName)
      .attr("fill", "none")
      .attr("stroke", theme.colors.inverse)
      .attr("stroke-width", 2.5)
      .attr("id", joinField.selector)
      .attr("x", connectorX)
      .attr("y", joinField.joinY - 2)
      .attr("width", tablePad)
      .attr("height", tablePad - 2)
    })

    join.append("path")
    .datum(joinPath)
    .attr("class", "join-"+joinData[0].joinName)
    .attr("fill", "none")
    .attr("stroke", theme.colors.inverse)
    .attr("stroke-width", 2.5)
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + 10)
    )

    join.append("path")
    .datum(joinPath)
    .attr("class", "join-hover-"+joinData[0].joinName)
    .attr("fill", "none")
    .attr("stroke", "transparent")
    .attr("stroke-width", 100)
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + 7)
    )
    .on("mouseenter", (d: any, i: number) => {
      console.log(d)
      d3.selectAll(".join-"+joinData[0].joinName).attr("stroke-width", 5)
    })
    .on("mouseleave", (d: any, i: number) => {
      d3.selectAll(".join-"+joinData[0].joinName).attr("stroke-width", 2.5)
    })
    .on("click", (d: any, i: number) => {
      console.log(d)
    })
  })
  
}
