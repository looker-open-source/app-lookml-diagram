import * as d3 from 'd3';
import { ILookmlModelExplore } from '@looker/sdk/lib/sdk/3.1/models';
import { 
  TABLE_WIDTH, 
  JOIN_CONNECTOR_WIDTH, 
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  TABLE_PADDING,
  DIAGRAM_BACKGROUND_COLOR
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
  let connectorAlign = rightmost ? connectorSize : connectorSize * -1

  let baseX = joinField.joinX
  let baseY = joinField.joinY + (TABLE_ROW_HEIGHT/2)

  let manyTopX = baseX + connectorAlign
  let manyTopY = baseY - 8

  let manyBotX = baseX + connectorAlign
  let manyBotY = baseY + 8

  let topFork = []
  let bottomFork = []

  topFork.push({x: baseX, y: baseY})
  topFork.push({x: manyTopX, y: manyTopY})
  bottomFork.push({x: baseX, y: baseY})
  bottomFork.push({x: manyBotX, y: manyBotY})

  return [topFork, bottomFork]
}

export function getOnePath(connectorSize: number, rightmost: number, joinField: any) {
  let path = []
  let connectorAlign = rightmost ? connectorSize : connectorSize * -1

  let baseX = joinField.joinX
  let baseY = joinField.joinY + (TABLE_ROW_HEIGHT/2)

  let headX = baseX + connectorAlign
  let headY = baseY

  path.push({x: baseX, y: baseY})
  path.push({x: headX, y: headY})

  return [path]
}

export function createLookmlJoinElement(svg: any, joinData: any, diagramDict: any, explore: ILookmlModelExplore, selectionInfo: any, setSelectionInfo: (packet: SelectionInfoPacket) => void) {
  let partArray: any[] = []
  let r_shift = TABLE_WIDTH + JOIN_CONNECTOR_WIDTH
  let l_shift = JOIN_CONNECTOR_WIDTH * -1

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
  // Calculate the x,y of every field in join and sort left to right
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
      } else if (a.toX === b.toX && a.fieldIndex < b.fieldIndex) {
        return -1
      } else {
        return 1
      }
    })

    // make join g element
    let join = svg
    .select(".diagram-area")
    .append("g")
    .attr("class", "join-"+joinData[0].joinName)

    // TODO: refactor for readability, testability
    // Add an untangling "extension" to join-part
    let joinTables = joinPath.map((d: any) => { return d.viewName})
    let terminalAlign = joinTables.filter(onlyUnique)
    let degreeAligned = [...terminalAlign]
    degreeAligned = degreeAligned.sort((a: any, b: any) => {
      if (Math.abs(diagramDict[a][0].diagramDegree) < Math.abs(diagramDict[b][0].diagramDegree)) {
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

    let isBaseView = Math.abs(diagramDict[baseTable][0].diagramDegree) === Math.min(...joinDegrees) ? true : false
    let push = isBaseView ? (JOIN_CONNECTOR_WIDTH * 0.7) / 4 : 0

    let aX = baseNode.x + (push * goLeft * -1)
    let aY = baseNode.y + (TABLE_ROW_HEIGHT/2)

    let fX = joinedNode.x
    let fY = joinedNode.y + (TABLE_ROW_HEIGHT/2)

    let disabled = Math.abs(aY - fY) < 50 ? true : false

    let joinedDegree = diagramDict[joinedTable][0].diagramDegree
    let stepPro = aY < fY && diagramDict._yOrderLookup[joinedDegree] > 2
    ? (1 - (diagramDict[joinedTable][0].verticalIndex / diagramDict._yOrderLookup[joinedDegree]))
    : (diagramDict[joinedTable][0].verticalIndex / diagramDict._yOrderLookup[joinedDegree])
    let firstStep = stepPro * (TABLE_PADDING - JOIN_CONNECTOR_WIDTH - (TABLE_WIDTH*1.5))

    // A
    tableJoinPath.push({joinX: aX, joinY: aY, name: baseFields[0].joinName, viewName: baseFields[0].viewName})

    // B
    let bX = aX + (firstStep * goLeft) + (10 * goLeft)
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
    disabled || tableJoinPath.push({
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
    .attr("d", d3.line().curve(d3.curveBundle.beta(1))
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY)
    )

    let joinType = joinData[0].joinObj.type ? joinData[0].joinObj.type : "left_outer"
    let joinTypeLabel = joinType.replace("_", " ").toUpperCase()
    let isCross = joinType === "cross"

    let leftFill = 0
    let rightFill = 0
    if (joinType === "left_outer" || joinType === "full_outer" || joinType === "cross") {
      leftFill = 0.2
    }
    if (joinType === "full_outer" || joinType === "cross") {
      rightFill = 0.2
    }

    let iconOffset = isCross ? 35 : 24

    let lX = cX - iconOffset
    let lY = cY + (Math.abs(aY - fY) / 2 * goUp) - 24

    join.append("rect")
    .attr("fill", "none")
    .attr("class", "join-path-icon-background")
    .attr("width", iconOffset * 2)
    .attr("height", 50)
    .attr("transform", `translate(${lX}, ${lY + 5})`)

    isCross || join.append("path")
    .attr("d", "M23.6468 14.9375C17.7708 16.8958 14.834 26.6875 23.6468 32.5625C32.46 25.7083 28.5434 16.8958 23.6468 14.9375Z")
    .attr("fill", "none")
    .attr("fill-opacity", 0.2)
    .attr("class", "join-path-icon-right")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross || join.append("path")
    .attr("d", "M23.6468 14.9375C17.7708 16.8958 14.834 26.6875 23.6468 32.5625C32.46 25.7083 28.5434 16.8958 23.6468 14.9375Z")
    .attr("fill", "none")
    .attr("fill-opacity", 0.2)
    .attr("class", "join-path-icon-left")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross || join.append("path")
    .attr("d", "M28.5415 33.5417C33.9493 33.5417 38.3332 29.1578 38.3332 23.75C38.3332 18.3422 33.9493 13.9583 28.5415 13.9583C23.1337 13.9583 18.7498 18.3422 18.7498 23.75C18.7498 29.1578 23.1337 33.5417 28.5415 33.5417ZM28.5415 35.5C35.0308 35.5 40.2915 30.2393 40.2915 23.75C40.2915 17.2607 35.0308 12 28.5415 12C22.0522 12 16.7915 17.2607 16.7915 23.75C16.7915 30.2393 22.0522 35.5 28.5415 35.5Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("class", "join-path-icon-right")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross || join.append("path")
    .attr("d", "M18.75 33.5417C24.1578 33.5417 28.5417 29.1578 28.5417 23.75C28.5417 18.3422 24.1578 13.9583 18.75 13.9583C13.3422 13.9583 8.95833 18.3422 8.95833 23.75C8.95833 29.1578 13.3422 33.5417 18.75 33.5417ZM18.75 35.5C25.2393 35.5 30.5 30.2393 30.5 23.75C30.5 17.2607 25.2393 12 18.75 12C12.2607 12 7 17.2607 7 23.75C7 30.2393 12.2607 35.5 18.75 35.5Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("class", "join-path-icon-left")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross || join.append("path")
    .attr("d", "M21.4928 14.3483C20.6225 14.0949 19.7022 13.959 18.7502 13.959C13.3424 13.959 8.9585 18.3429 8.9585 23.7507C8.9585 29.1584 13.3424 33.5423 18.7502 33.5423C19.7027 33.5423 20.6234 33.4063 21.4941 33.1527C18.6387 31.0091 16.7917 27.5952 16.7917 23.75C16.7917 19.9053 18.6382 16.4919 21.4928 14.3483Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("fill-opacity", leftFill)
    .attr("class", "join-path-icon-left")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross || join.append("path")
    .attr("d", "M25.7983 33.1508C28.6533 31.0072 30.5001 27.5936 30.5001 23.7487C30.5001 19.9038 28.6533 16.4902 25.7983 14.3465C26.6688 14.093 27.5894 13.957 28.5417 13.957C33.9495 13.957 38.3334 18.3409 38.3334 23.7487C38.3334 29.1565 33.9495 33.5404 28.5417 33.5404C27.5894 33.5404 26.6688 33.4044 25.7983 33.1508Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("fill-opacity", rightFill)
    .attr("class", "join-path-icon-right")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("path")
    .attr("d", "M42.3335 31.5827L26.6668 15.916")
    .attr("stroke", "none")
    .attr("stroke-width", 0)
    .attr("class", "join-path-icon-connector")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("path")
    .attr("d", "M42.3332 15.916L26.6665 31.5827")
    .attr("stroke", "none")
    .attr("stroke-width", 0)
    .attr("class", "join-path-icon-connector")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("path")
    .attr("d", "M50.1665 33.5417C55.5743 33.5417 59.9582 29.1578 59.9582 23.75C59.9582 18.3422 55.5743 13.9583 50.1665 13.9583C44.7587 13.9583 40.3748 18.3422 40.3748 23.75C40.3748 29.1578 44.7587 33.5417 50.1665 33.5417ZM50.1665 35.5C56.6558 35.5 61.9165 30.2393 61.9165 23.75C61.9165 17.2607 56.6558 12 50.1665 12C43.6772 12 38.4165 17.2607 38.4165 23.75C38.4165 30.2393 43.6772 35.5 50.1665 35.5Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("class", "join-path-icon-right")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("circle")
    .attr("fill", "none")
    .attr("fill-opacity", 0.2)
    .attr("cx", 50.1667)
    .attr("cy", 23.7507)
    .attr("r", 9.79167)
    .attr("class", "join-path-icon-right")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("path")
    .attr("d", "M18.8335 33.5417C24.2413 33.5417 28.6252 29.1578 28.6252 23.75C28.6252 18.3422 24.2413 13.9583 18.8335 13.9583C13.4257 13.9583 9.04183 18.3422 9.04183 23.75C9.04183 29.1578 13.4257 33.5417 18.8335 33.5417ZM18.8335 35.5C25.3228 35.5 30.5835 30.2393 30.5835 23.75C30.5835 17.2607 25.3228 12 18.8335 12C12.3442 12 7.0835 17.2607 7.0835 23.75C7.0835 30.2393 12.3442 35.5 18.8335 35.5Z")
    .attr("fill-rule", "evenodd")
    .attr("clip-rule", "evenodd")
    .attr("fill", "none")
    .attr("class", "join-path-icon-left")
    .attr("transform", `translate(${lX}, ${lY})`)

    isCross && join.append("circle")
    .attr("fill", "none")
    .attr("fill-opacity", 0.2)
    .attr("cx", 18.8332)
    .attr("cy", 23.7507)
    .attr("r", 9.79167)
    .attr("class", "join-path-icon-left")
    .attr("transform", `translate(${lX}, ${lY})`)

    join.append("text")
    .attr("class", "join-path-icon-label")
    .attr("fill", "none")
    .text(joinTypeLabel)
    .attr("transform", `translate(${cX}, ${lY + 48})`);

    // d3.curveBundle.beta(1)

    // TODO: extract to function
    // Draw hover element for join-part path
    let drawnJoinHover = join.append("path")
    .datum(tableJoinPath)
    .attr("class", "join-path-hover")
    .attr("id", (d:any) => d.viewName)
    .attr("d", d3.line().curve(d3.curveBundle.beta(1))
      .x((d: any) => d.joinX)
      .y((d: any) => d.joinY)
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
      let arr: any = d3.select(d.toElement).datum()
      setSelectionInfo({
        lookmlElement: "join",
        name: arr[0].name
      })
    })

    // TODO: refactor for readability, testability
    // Draw all join-path field connectors
    joinPath.forEach((joinField: any, i: number) => {
      let connectorSize = (JOIN_CONNECTOR_WIDTH * 0.7)
      let rightmost = terminalAlign.indexOf(joinField.viewName)
      let connectorAlign = rightmost ? connectorSize : connectorSize * -1
      let connectorPath: any[] = []
      let isBaseView = Math.abs(diagramDict[joinField.viewName][0].diagramDegree) === Math.min(...joinDegrees) ? true : false

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

      addJoinArrowheads(join, joinData[0].joinName)

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
  })

  
}
