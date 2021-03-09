import { 
  TABLE_ROW_HEIGHT,
} from '../utils/constants'

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
