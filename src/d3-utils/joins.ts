import * as d3 from 'd3';
import { ILookmlModelExplore } from '@looker/sdk/lib/sdk/3.1/models';
import { 
  TABLE_WIDTH, 
  JOIN_CONNECTOR_WIDTH, 
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  TABLE_PADDING
} from '../utils/constants'
import { onlyUnique } from '../utils/diagrammer'
import { SelectionInfoPacket } from "../components/interfaces"

export let addJoinArrowheads = (join: any, joinName: string) => {
  join.append("marker")
  .attr("id", "arrows-"+joinName)
  .attr("refX", 18)
  .attr("refY", 18)
  .attr("markerWidth", 50)
  .attr("markerHeight", 50)
  .attr("markerUnits","userSpaceOnUse")
  .attr("orient", "auto")
  .append("path")
  .attr("d", "M 12 12 24 18 12 24 15 18");
}

export function getManyPath(connectorSize: number, rightmost: number, joinField: any) {
  let path = []
  let connectorAlign = rightmost ? (connectorSize+3) : (connectorSize+3) * -1
  let baseAdj = rightmost ? -1 : 1

  let baseX = joinField.joinX + baseAdj
  let baseY = joinField.joinY + (TABLE_ROW_HEIGHT/2)

  let headX = baseX + (connectorAlign/2)
  let headY = baseY

  let manyTopX = headX + (connectorAlign*0.8)
  let manyTopY = baseY - 8

  let manyBotX = headX + (connectorAlign*0.8)
  let manyBotY = baseY + 8

  let topFork = []
  let bottomFork = []

  topFork.push({x: baseX, y: baseY})
  topFork.push({x: headX, y: headY})
  topFork.push({x: manyTopX, y: manyTopY})
  bottomFork.push({x: headX, y: headY})
  bottomFork.push({x: manyBotX, y: manyBotY})

  return [topFork, bottomFork]
}

export function getOnePath(connectorSize: number, rightmost: number, joinField: any) {
  let path = []
  let connectorAlign = rightmost ? connectorSize : connectorSize * -1
  let baseAdj = rightmost ? -1 : 1

  let baseX = joinField.joinX + baseAdj
  let baseY = joinField.joinY + (TABLE_ROW_HEIGHT/2)

  let headX = baseX + (connectorAlign*1.5)
  let headY = baseY

  path.push({x: baseX, y: baseY})
  path.push({x: headX, y: headY})

  return [path]
}

export function createLookmlJoinElement(svg: any, joinData: any, diagramDict: any, explore: ILookmlModelExplore, selectionInfo: any, setSelectionInfo: (packet: SelectionInfoPacket) => void) {
  let partArray: any[] = []
  let tablePad = JOIN_CONNECTOR_WIDTH
  let r_shift = TABLE_WIDTH + tablePad
  let l_shift = tablePad * -1

  // TODO: refactor for readability, testability
  // Break up join between multiple tables into join-parts between two tables
  let joinParts = joinData.map((d: any) => { return d.viewName}).filter(onlyUnique).sort((a: any, b: any) => {
    if (diagramDict[a][0].diagramDegree < diagramDict[b][0].diagramDegree) {
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
    return Math.abs(diagramDict[d.viewName][0].diagramDegree)
  })

  // TODO: refactor for readability, testability
  // Calculate the x,y of every field in join and sort by view and by index
  partArray.map((path: any, partI: number) => {
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
          joinY: diagramDict[d.viewName][0].diagramY + (d.fieldIndex*(TABLE_ROW_HEIGHT+(DIAGRAM_FIELD_STROKE_WIDTH-1))),
        }
      }
      return {
        ...d,
        toX: diagramDict[d.viewName][0].diagramX,
        joinX: diagramDict[d.viewName][0].diagramX + l_shift,
        joinY: diagramDict[d.viewName][0].diagramY + (d.fieldIndex*(TABLE_ROW_HEIGHT+(DIAGRAM_FIELD_STROKE_WIDTH-1))),
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

    // make join g element
    let join = svg
    .select(".diagram-area")
    .append("g")
    .attr("class", "join-"+joinData[0].joinName)

    // TODO: refactor for readability, testability
    // Add an untangling "extension" to join-part
    let joinTables = joinPath.map((d: any) => { return d.viewName})
    let terminalAlign = joinTables.filter(onlyUnique)

    let targetFirstIndex = joinTables.indexOf(terminalAlign[1])
    let sourceLasttIndex = joinTables.lastIndexOf(terminalAlign[0])

    let firstExt = diagramDict[joinPath[sourceLasttIndex].viewName][0]
    let nextExt = diagramDict[joinPath[targetFirstIndex].viewName][0]
    
    let verticalIndex = firstExt.diagramDegree > nextExt.diagramDegree ? firstExt.verticalIndex : nextExt.verticalIndex
    let verticalDestMax = firstExt.diagramDegree > nextExt.diagramDegree ? diagramDict._yOrderLookup[firstExt.diagramX] : diagramDict._yOrderLookup[nextExt.diagramX]
    let extWidthL = (1 - (verticalIndex / verticalDestMax)) * (TABLE_PADDING/3)
    let extWidthR = (verticalIndex / verticalDestMax) * (TABLE_PADDING/3)
    let extWidth = firstExt.diagramDegree > nextExt.diagramDegree ? extWidthR : extWidthL

    let extension: any = {}
    extension = Object.assign(extension, joinPath[sourceLasttIndex])

    extension.joinX = extension.joinX + extWidth
    let extendedjoinPath = [...joinPath.slice(0, sourceLasttIndex+1), extension, ...joinPath.slice(sourceLasttIndex + 1, joinPath.length)]

    // Draw join-part path
    join.append("path")
    .datum(joinPath)
    .attr("class", "join-path")
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + (TABLE_ROW_HEIGHT/2))
    )

    // TODO: extract to function
    // Draw hover element for join-part path
    let drawnJoinHover = join.append("path")
    .datum(joinPath)
    .attr("class", "join-path-hover")
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveStep)
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY + (TABLE_ROW_HEIGHT/2))
    )
    .on("mouseenter", (d: any, i: number) => {
      d3.selectAll("g.join-"+joinData[0].joinName)
      .classed("join-path-selected", true)
      .raise()
    })
    .on("mouseleave", (d: any, i: number) => {
      if (JSON.stringify(selectionInfo) !== JSON.stringify({
        lookmlElement: "join",
        name: joinData[0].joinName
      })) {
        d3.selectAll("g.join-"+joinData[0].joinName)
        .classed("join-path-selected", false)
      }
    })
    .on("click", (d: any, i: number) => {
      let arr = d3.select(d.toElement).datum()
      // @ts-ignore
      let joinObj = arr[0].joinObj
      setSelectionInfo({
        lookmlElement: "join",
        name: joinObj.name
      })
    })

    // d3.curveBundle.beta(1)

    // TODO: refactor for readability, testability
    // Draw all join-path field connectors
    joinPath.forEach((joinField: any, i: number) => {
      let connectorSize = (tablePad / 2)
      let rightmost = terminalAlign.indexOf(joinField.viewName)
      let connectorPath: any[] = []

      if (Math.abs(diagramDict[joinField.viewName][0].diagramDegree) === Math.min(...joinDegrees)) {
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

      addJoinArrowheads(join, joinData[0].joinName)

      connectorPath.map((connector: any) => {
        join.append("path")
        .datum(connector)
        .attr("class", "join-path")
        .attr("marker-end", (d:any) => "url(#arrows-" + joinData[0].joinName + ")")
        .attr("id", (d:any) => d.viewName)
        .attr("d", d3.line().curve(d3.curveLinear)
          .x((d: any) => d.x)
          .y((d: any) => d.y)
        )
      })

    })
  })
  
}
