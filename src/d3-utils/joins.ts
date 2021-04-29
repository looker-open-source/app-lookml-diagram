/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import * as d3 from 'd3';
import { ILookmlModelExplore } from '@looker/sdk/lib/4.0/models';
import { 
  TABLE_WIDTH, 
  JOIN_CONNECTOR_WIDTH, 
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  TABLE_PADDING,
} from '../utils/constants'
import { onlyUnique, DiagramMetadata, DiagramJoin } from '../utils/LookmlDiagrammer'
import { SelectionInfoPacket } from "../components/interfaces"
import {makeJoinIcon} from "./join-icon"
import {getManyPath, getOnePath, addJoinArrowheads} from "./join-helpers"

export function createLookmlJoinElement(svg: any, joinData: DiagramJoin[], diagramDict: DiagramMetadata, explore: ILookmlModelExplore, selectionInfo: any, setSelectionInfo: (packet: SelectionInfoPacket) => void, type: string) {
  let partArray: any[] = []
  let r_shift = TABLE_WIDTH + JOIN_CONNECTOR_WIDTH
  let l_shift = JOIN_CONNECTOR_WIDTH * -1

  // Break up join between multiple tables into join-parts between two tables
  let joinParts = joinData.map((d: any) => { return d.viewName}).filter(onlyUnique).sort((a: any, b: any) => {
    if (diagramDict.tableData[a][0].diagramDegree < diagramDict.tableData[b][0].diagramDegree) {
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

  // Establish degrees in join
  let joinDegrees = joinData.map((d: any, i: number) => {
    return Math.abs(diagramDict.tableData[d.viewName][0].diagramDegree)
  })

  // Calculate the x,y of every field in join and sort left to right
  partArray.map((path: any, partI: number) => {
    let joinPath: any[]
    let xLookup = path.map((d:any)=>{
      let joinedTableData = diagramDict.tableData[d.viewName]
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
      if (nextBase > TABLE_WIDTH || lastBase > TABLE_WIDTH) {
        return {
          ...d,
          toX: diagramDict.tableData[d.viewName][0].diagramX,
          joinX: diagramDict.tableData[d.viewName][0].diagramX + r_shift,
          joinY: diagramDict.tableData[d.viewName][0].diagramY + (d.fieldIndex*(TABLE_ROW_HEIGHT+(DIAGRAM_FIELD_STROKE_WIDTH-1))),
        }
      }
      return {
        ...d,
        toX: diagramDict.tableData[d.viewName][0].diagramX,
        joinX: diagramDict.tableData[d.viewName][0].diagramX + l_shift,
        joinY: diagramDict.tableData[d.viewName][0].diagramY + (d.fieldIndex*(TABLE_ROW_HEIGHT+(DIAGRAM_FIELD_STROKE_WIDTH-1))),
      }
    }).sort((a: any, b: any) => {
      if (a.toX < b.toX) {
        return -1
      } else if (a.toX === b.toX && a.fieldIndex < b.fieldIndex) {
        return -1
      } else {
        return 1
      }
    })

    // make join g element
    let join = svg
    .select(`.${type}-area`)
    .append("g")
    .attr("class", "join-"+joinData[0].joinName)

    let joinTables = joinPath.map((d: any) => { return d.viewName})
    let terminalAlign = joinTables.filter(onlyUnique)
    let degreeAligned = [...terminalAlign]
    degreeAligned = degreeAligned.sort((a: any, b: any) => {
      if (Math.abs(diagramDict.tableData[a][0].diagramDegree) < Math.abs(diagramDict.tableData[b][0].diagramDegree)) {
        return -1
      } else {
        return 1
      }
    })
    let average = (array: any) => array.reduce((a: any, b: any) => a + b) / array.length;

    let tableJoinPath: any[] = []
    let baseTable = degreeAligned[0]
    let joinedTable = degreeAligned[1]
    let joinedFields = joinPath.filter((row: any)=>{return row.viewName === joinedTable})
    let baseFields = joinPath.filter((row: any)=>{return row.viewName === baseTable})
    let joinedNode = {
      x: joinedFields[0].joinX,
      y: average(joinedFields.map((row: any)=>row.joinY)),
    }
    let baseNode = {
      x: baseFields[0].joinX,
      y: average(baseFields.map((row: any)=>row.joinY)),
    }
    let goLeft = joinedNode.x < baseNode.x ? -1 : 1
    let goUp = joinedNode.y < baseNode.y ? -1 : 1

    let isBaseView = Math.abs(diagramDict.tableData[baseTable][0].diagramDegree) === Math.min(...joinDegrees) ? true : false
    let push = isBaseView ? (JOIN_CONNECTOR_WIDTH * 0.7) / 4 : 0

    let aX = baseNode.x + (push * goLeft * -1)
    let aY = baseNode.y + (TABLE_ROW_HEIGHT/2)

    let fX = joinedNode.x
    let fY = joinedNode.y + (TABLE_ROW_HEIGHT/2)

    let disabled = Math.abs(aY - fY) < 50 ? true : false

    let joinedDegree = diagramDict.tableData[joinedTable][0].diagramDegree
    let degreeMembers = diagramDict.yOrderLookup[joinedDegree].length + 1
    let stepPro = aY < fY
    ? (1 - (diagramDict.tableData[joinedTable][0].verticalIndex / degreeMembers))
    : (diagramDict.tableData[joinedTable][0].verticalIndex / degreeMembers)

    const joinableWidth = TABLE_PADDING - JOIN_CONNECTOR_WIDTH - TABLE_WIDTH
    let firstStep = joinableWidth * stepPro

    // Refer to ./docs/join_structure.png for the following

    // A
    tableJoinPath.push({joinX: aX, joinY: aY, name: baseFields[0].joinName, viewName: baseFields[0].viewName})

    // B
    let bX = aX + (firstStep * goLeft)
    let bY = aY
    tableJoinPath.push({
      joinX: bX,
      joinY: bY, 
    })

    // C
    let cX = bX + (2 * goLeft)
    let cY = bY + (2 * goUp)
    disabled || tableJoinPath.push({
      joinX: cX,
      joinY: cY, 
    })

    // D
    let dX = cX
    let dY = fY + (2 * goUp)
    disabled || tableJoinPath.push({
      joinX: dX,
      joinY: dY, 
    })

    // E
    let eX = dX + (2 * goLeft)
    let eY = fY
    tableJoinPath.push({
      joinX: eX,
      joinY: eY, 
    })

    // F
    tableJoinPath.push({joinX: fX, joinY: fY, name: joinedFields[0].joinName, viewName: joinedFields[0].viewName})

    // Draw join-part path
    join.append("path")
    .datum(tableJoinPath)
    .attr("class", "join-path")
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveBundle.beta(0.95))
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY)
    )

    // Draw all join-path field connectors
    joinPath.forEach((joinField: any, i: number) => {
      let connectorSize = (JOIN_CONNECTOR_WIDTH * 0.7)
      let rightmost = terminalAlign.indexOf(joinField.viewName)
      let connectorAlign = rightmost ? connectorSize : connectorSize * -1
      let connectorPath: any[] = []
      let isBaseView = Math.abs(diagramDict.tableData[joinField.viewName][0].diagramDegree) === Math.min(...joinDegrees) ? true : false

      joinField.joinX = isBaseView ? joinField.joinX + (connectorAlign / 4) : joinField.joinX

      if (isBaseView) {
        let manyKinds = ["many_to_one", "many_to_many"]
        manyKinds.includes(joinField.joinObj.relationship) 
        ? connectorPath = getManyPath(connectorSize, rightmost, joinField) 
        : connectorPath = getOnePath(connectorSize, rightmost, joinField)
      } else {
        let manyKinds = ["one_to_many", "many_to_many"]
        manyKinds.includes(joinField.joinObj.relationship) 
        ? connectorPath = getManyPath(connectorSize, rightmost, joinField) 
        : connectorPath = getOnePath(connectorSize, rightmost, joinField)
      }

      // And their arrowheads
      addJoinArrowheads(join, joinData[0].joinName)

      // Add the "bracket" that links many fields on one table
      connectorPath.map((connector: any) => {
        join.append("path")
        .datum(connector)
        .attr("class", "join-path")
        .attr("marker-end", (d:any) => isBaseView || "url(#arrows-" + joinData[0].joinName + ")")
        .attr("id", (d:any) => d.viewName)
        .attr("d", d3.line().curve(d3.curveLinear)
          .x((d: any) => d.x)
          .y((d: any) => d.y)
        )
      })

      let tableJoins = joinPath.filter((row: any)=>row.viewName === joinField.viewName)
      let joinNode = tableJoins[0]
      let joinBracketPath: any[] = []
      joinBracketPath.push({x: joinNode.joinX, y: joinNode.joinY + (TABLE_ROW_HEIGHT/2), viewName: joinNode.viewName})
      joinBracketPath.push({x: joinField.joinX, y: joinField.joinY + (TABLE_ROW_HEIGHT/2), viewName: joinField.viewName})
      tableJoins.length > 1 && join.append("path")
      .datum(joinBracketPath)
      .attr("class", "join-path")
      .attr("d", d3.line().curve(d3.curveBasis)
        .x((d: any) => d.x)
        .y((d: any) => d.y)
      )

    })

    let joinType = joinData[0].joinObj.type ? joinData[0].joinObj.type : "left_outer"
    let isCross = joinType === "cross"

    const iconWidth = isCross ? 90 : 50

    const pillWidth = iconWidth + joinType.length * 6 + 10

    let lX = cX - (pillWidth / 2)
    let lY = cY + (Math.abs(aY - fY) / 2 * goUp) - 20

    makeJoinIcon(join, iconWidth, pillWidth, lX, lY, joinType)

    // Draw hover element for join-part path
    let drawnJoinHover = join.append("path")
    .datum(tableJoinPath)
    .attr("class", "join-path-hover")
    .classed("minimap-join-path-hover", type === "minimap" ? true : false)
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveBundle.beta(1))
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY)
    )

    let hoverMouseEnter = type === "display" && drawnJoinHover.on("mouseenter", (d: any, i: number) => {
      d3.selectAll(`.${type}-area > g.join-`+joinData[0].joinName)
      .classed("join-path-selected", true)
      .raise()
    })
    let hoverMouseLeave = type === "display" && hoverMouseEnter.on("mouseleave", (d: any, i: number) => {
      if (JSON.stringify(selectionInfo) !== JSON.stringify({
        lookmlElement: "join",
        name: joinData[0].joinName
      })) {
        d3.selectAll(`.${type}-area > g.join-`+joinData[0].joinName)
        .classed("join-path-selected", false)
      }
    })
    let hoverMouseClick = type === "display" && hoverMouseLeave.on("click", (d: any, i: number) => {
      setSelectionInfo({
        lookmlElement: "join",
        name: joinData[0].joinName
      })
    })
  })

  
}
