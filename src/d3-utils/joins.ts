import * as d3 from 'd3';
import { ILookmlModelExplore, ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { TABLE_WIDTH, TABLE_PADDING } from '../utils/constants'
import { getJoinX, getRowOffset } from './position'
import { getNextFocusTarget, theme } from '@looker/components'
import { onlyUnique } from '../utils/diagrammer'
import { SelectionInfoPacket } from "../components/interfaces"

export function getManyPath(connectorSize: number, rightmost: number, joinField: any) {
  let path = []
  let connectorAlign = rightmost ? (connectorSize+3) : (connectorSize+3) * -1
  let baseAdj = rightmost ? -1 : 1

  let baseX = joinField.joinX + baseAdj
  let baseY = joinField.joinY + 10

  let headX = baseX + (connectorAlign/2)
  let headY = baseY

  let manyTopX = headX + connectorAlign
  let manyTopY = baseY - 10

  let manyBotX = headX + connectorAlign
  let manyBotY = baseY + 10

  path.push({x: baseX, y: baseY})
  path.push({x: headX, y: headY})
  path.push({x: manyTopX, y: manyTopY})
  path.push({x: headX, y: headY})
  path.push({x: manyBotX, y: manyBotY})
  path.push({x: headX, y: headY})

  return path
}

export function getOnePath(connectorSize: number, rightmost: number, joinField: any) {
  let path = []
  let connectorAlign = rightmost ? connectorSize : connectorSize * -1
  let baseAdj = rightmost ? -1 : 1

  let baseX = joinField.joinX + baseAdj
  let baseY = joinField.joinY + 10

  let headX = baseX + (connectorAlign*3)
  let headY = baseY

  path.push({x: baseX, y: baseY})
  path.push({x: headX, y: headY})

  return path
}

export function createLookmlJoinElement(svg: any, joinData: any, diagramDict: any, explore: ILookmlModelExplore, selectionInfo: any, setSelectionInfo: (packet: SelectionInfoPacket) => void) {
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
      if (nextBase > TABLE_WIDTH || lastBase > TABLE_WIDTH) {
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

    let join = svg
    .select(".diagram-area")
    .append("g")

    let joinTables = joinPath.map((d: any) => { return d.viewName})
    let terminalAlign = joinTables.filter(onlyUnique)

    let targetFirstIndex = joinTables.indexOf(terminalAlign[1])
    let sourceLasttIndex = joinTables.lastIndexOf(terminalAlign[0])

    let firstExt = diagramDict[joinPath[sourceLasttIndex].viewName][0]
    let nextExt = diagramDict[joinPath[targetFirstIndex].viewName][0]
    
    let verticalIndex = firstExt.diagramDegree > nextExt.diagramDegree ? firstExt.verticalIndex : nextExt.verticalIndex
    let verticalDestMax = firstExt.diagramDegree > nextExt.diagramDegree ? diagramDict._yOrderLookup[firstExt.diagramX] : diagramDict._yOrderLookup[nextExt.diagramX]
    let extWidth = (1 - (verticalIndex / verticalDestMax)) * (TABLE_WIDTH)

    let extension: any = {}
    extension = Object.assign(extension, joinPath[sourceLasttIndex])

    extension.joinX = extension.joinX + extWidth
    let extendedjoinPath = [...joinPath.slice(0, sourceLasttIndex+1), extension, ...joinPath.slice(sourceLasttIndex + 1, joinPath.length)]

    join.append("path")
    .datum(extendedjoinPath)
    .attr("class", "join-"+joinData[0].joinName)
    .attr("fill", "none")
    .attr("stroke", theme.colors.inverse)
    .attr("stroke-width", 3)
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + 10)
    )

    let drawnJoinHover = join.append("path")
    .datum(extendedjoinPath)
    .attr("class", "join-hover-"+joinData[0].joinName)
    .attr("fill", "none")
    .attr("stroke", "transparent")
    .attr("stroke-width", 100)
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + 7)
    )
    .style("cursor", "pointer")
    drawnJoinHover.on("mouseenter", (d: any, i: number) => {
      d3.selectAll(".join-connector-"+joinData[0].joinName).attr("stroke-width", 8).attr("stroke", theme.colors.key)
      d3.selectAll(".join-"+joinData[0].joinName).attr("stroke-width", 8).attr("stroke", theme.colors.key)
    })
    drawnJoinHover.on("mouseleave", (d: any, i: number) => {
      if (JSON.stringify(selectionInfo) !== JSON.stringify({
        lookmlElement: "join",
        name: joinData[0].joinName
      })) {
        d3.selectAll(".join-connector-"+joinData[0].joinName).attr("stroke-width", 3).attr("stroke", theme.colors.inverse)
        d3.selectAll(".join-"+joinData[0].joinName).attr("stroke-width", 3).attr("stroke", theme.colors.inverse)
      }
    })
    drawnJoinHover.on("click", (d: any, i: number) => {
      let arr = d3.select(d.toElement).datum()
      // @ts-ignore
      let joinObj = arr[0].joinObj
      d3.selectAll(".join-connector-"+joinData[0].joinName).attr("stroke-width", 8).attr("stroke", theme.colors.key)
      d3.selectAll(".join-"+joinData[0].joinName).attr("stroke-width", 8).attr("stroke", theme.colors.key)
      setSelectionInfo({
        lookmlElement: "join",
        name: joinObj.name
      })
    })

    joinPath.forEach((joinField: any, i: number) => {
      let connectorSize = (tablePad / 2)
      let rightmost = terminalAlign.indexOf(joinField.viewName)
      let connectorPath: any[] = []
      let connectorOther = terminalAlign.filter((d: string) => { return d !== joinField.viewName})[0]
      // check not if lower, but if lowest in join-at-large
      if (diagramDict[joinField.viewName][0].diagramDegree < diagramDict[connectorOther][0].diagramDegree) {
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

      let connectorAlign = rightmost ? connectorSize : connectorSize * -1
      let baseAdj = rightmost ? -1 : 1

      let baseX = joinField.joinX + baseAdj
      let baseY = joinField.joinY + 10

      join.append("path")
      .datum(connectorPath)
      .attr("class", "join-connector-"+joinData[0].joinName)
      .attr("fill", "none")
      .attr("stroke", theme.colors.inverse)
      .attr("stroke-width", 3)
      .attr("id", (d:any) => d.viewName)
      .attr("d", d3.line().curve(d3.curveLinear)
        .x((d: any) => d.x)
        .y((d: any) => d.y)
      )

      join.append("circle")
      .attr("class", "join-connector-"+joinData[0].joinName)
      .attr("fill", theme.colors.ui1)
      .attr("stroke", theme.colors.inverse)
      .attr("stroke-width", 3)
      .attr("r", 5)
      .attr("cx", baseX)
      .attr("cy", baseY)

    })
  })
  
}
