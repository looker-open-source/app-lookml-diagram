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

import * as d3 from 'd3'
import {
  TABLE_WIDTH,
  JOIN_CONNECTOR_WIDTH,
  TABLE_ROW_HEIGHT,
  DIAGRAM_FIELD_STROKE_WIDTH,
  TABLE_PADDING,
} from '../utils/constants'
import type { DiagramMetadata, DiagramJoin } from '../utils/LookmlDiagrammer'
import { onlyUnique } from '../utils/LookmlDiagrammer'
import type { SelectionInfoPacket } from '../components/interfaces'
import { makeJoinIcon } from './join-icon'
import type { JoinPoint } from './join-helpers'
import { getManyPath, getOnePath, addJoinArrowheads } from './join-helpers'

export function createLookmlJoinElement(
  svg: any,
  joinData: DiagramJoin[],
  diagramDict: DiagramMetadata,
  selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (packet: SelectionInfoPacket) => void,
  type: string
) {
  const partArray: DiagramJoin[][] = []
  const r_shift = TABLE_WIDTH + JOIN_CONNECTOR_WIDTH
  const l_shift = JOIN_CONNECTOR_WIDTH * -1

  // Break up join between multiple tables into join-parts between two tables
  const joinParts = joinData
    .map((d) => {
      return d.viewName
    })
    .filter(onlyUnique)
    .sort((a, b) => {
      if (
        diagramDict.tableData[a][0].diagramDegree <
        diagramDict.tableData[b][0].diagramDegree
      ) {
        return -1
      } else {
        return 1
      }
    })
  const stopPartIndex = joinParts.length - 2
  joinParts.forEach((_d, i) => {
    if (i <= stopPartIndex) {
      partArray.push(
        joinData.filter((joinPoint) => {
          return (
            joinPoint.viewName === joinParts[i] ||
            joinPoint.viewName === joinParts[i + 1]
          )
        })
      )
    }
  })

  // Index based lookup structure for join part degree (the number of joins away from base table)
  const joinDegrees = joinData.map((d) => {
    return Math.abs(diagramDict.tableData[d.viewName][0].diagramDegree)
  })

  // Calculate the x,y of every field in join and sort left to right
  partArray.forEach((path) => {
    const xLookup = path.map((d) => {
      const joinedTableData = diagramDict.tableData[d.viewName]
      return joinedTableData[d.fieldIndex].diagramX
    })
    const joinPath: DiagramJoin[] = path
      .map((d, i) => {
        let nextIndex = i
        while (path[nextIndex] && path[nextIndex].viewName === d.viewName) {
          nextIndex++
        }
        let lastIndex = i
        while (path[lastIndex] && path[lastIndex].viewName === d.viewName) {
          lastIndex--
        }
        const nextBase = xLookup[nextIndex] - xLookup[i]
        const lastBase = xLookup[lastIndex] - xLookup[i]
        if (nextBase > TABLE_WIDTH || lastBase > TABLE_WIDTH) {
          return {
            ...d,
            toX: diagramDict.tableData[d.viewName][0].diagramX,
            joinX: diagramDict.tableData[d.viewName][0].diagramX + r_shift,
            joinY:
              diagramDict.tableData[d.viewName][0].diagramY +
              d.fieldIndex *
                (TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1)),
          }
        }
        return {
          ...d,
          toX: diagramDict.tableData[d.viewName][0].diagramX,
          joinX: diagramDict.tableData[d.viewName][0].diagramX + l_shift,
          joinY:
            diagramDict.tableData[d.viewName][0].diagramY +
            d.fieldIndex *
              (TABLE_ROW_HEIGHT + (DIAGRAM_FIELD_STROKE_WIDTH - 1)),
        }
      })
      .sort((a, b) => {
        if (a.toX < b.toX) {
          return -1
        } else if (a.toX === b.toX && a.fieldIndex < b.fieldIndex) {
          return -1
        } else {
          return 1
        }
      })

    // make join g element
    const join = svg
      .select(`.${type}-area`)
      .append('g')
      .attr('class', 'join-' + joinData[0].joinName)

    const joinTables = joinPath.map((d) => {
      return d.viewName
    })
    const terminalAlign = joinTables.filter(onlyUnique)
    let degreeAligned = [...terminalAlign]
    degreeAligned = degreeAligned.sort((a, b) => {
      if (
        Math.abs(diagramDict.tableData[a][0].diagramDegree) <
        Math.abs(diagramDict.tableData[b][0].diagramDegree)
      ) {
        return -1
      } else {
        return 1
      }
    })

    const average = (array: any) =>
      array.reduce((a: any, b: any) => a + b) / array.length

    const tableJoinPath: DiagramJoin[] = []
    const baseTable = degreeAligned[0]
    const joinedTable = degreeAligned[1]
    const joinedFields = joinPath.filter((row) => {
      return row.viewName === joinedTable
    })
    const baseFields = joinPath.filter((row) => {
      return row.viewName === baseTable
    })
    const joinedNode = {
      x: joinedFields[0].joinX,
      y: average(joinedFields.map((row) => row.joinY)),
    }
    const baseNode = {
      x: baseFields[0].joinX,
      y: average(baseFields.map((row: any) => row.joinY)),
    }
    const goLeft = joinedNode.x < baseNode.x ? -1 : 1
    const goUp = joinedNode.y < baseNode.y ? -1 : 1

    const isBaseView =
      Math.abs(diagramDict.tableData[baseTable][0].diagramDegree) ===
      Math.min(...joinDegrees)
    const push = isBaseView ? (JOIN_CONNECTOR_WIDTH * 0.7) / 4 : 0

    // Refer to ./docs/join_structure.png for the following
    // Joins are "untangled" by calculating offsets at key points
    // along the line. Joins can be made up of 6 or 4 points

    const aX = baseNode.x + push * goLeft * -1
    const aY = baseNode.y + TABLE_ROW_HEIGHT / 2

    const fX = joinedNode.x
    const fY = joinedNode.y + TABLE_ROW_HEIGHT / 2

    const disabled = Math.abs(aY - fY) < 50

    const joinedDegree = diagramDict.tableData[joinedTable][0].diagramDegree
    const degreeMembers = diagramDict.yOrderLookup[joinedDegree].length + 1
    const stepPro =
      aY < fY
        ? 1 -
          diagramDict.tableData[joinedTable][0].verticalIndex / degreeMembers
        : diagramDict.tableData[joinedTable][0].verticalIndex / degreeMembers

    const joinableWidth = TABLE_PADDING - JOIN_CONNECTOR_WIDTH - TABLE_WIDTH
    const firstStep = joinableWidth * stepPro

    // A
    tableJoinPath.push({
      joinX: aX,
      joinY: aY,
      joinName: baseFields[0].joinName,
      viewName: baseFields[0].viewName,
    })

    // B
    const bX = aX + firstStep * goLeft
    const bY = aY
    tableJoinPath.push({
      joinX: bX,
      joinY: bY,
    })

    // C
    const cX = bX + 2 * goLeft
    const cY = bY + 2 * goUp
    disabled ||
      tableJoinPath.push({
        joinX: cX,
        joinY: cY,
      })

    // D
    const dX = cX
    const dY = fY + 2 * goUp
    disabled ||
      tableJoinPath.push({
        joinX: dX,
        joinY: dY,
      })

    // E
    const eX = dX + 2 * goLeft
    const eY = fY
    tableJoinPath.push({
      joinX: eX,
      joinY: eY,
    })

    // F
    tableJoinPath.push({
      joinX: fX,
      joinY: fY,
      joinName: joinedFields[0].joinName,
      viewName: joinedFields[0].viewName,
    })

    // Draw join-part path
    join
      .append('path')
      .datum(tableJoinPath)
      .attr('class', 'join-path')
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveBundle.beta(0.95))
          .x((d: any) => d.joinX)
          .y((d: any) => d.joinY)
      )

    // Draw all join-path field connectors
    joinPath.forEach((joinField) => {
      const connectorSize = JOIN_CONNECTOR_WIDTH * 0.7
      const rightmost = terminalAlign.indexOf(joinField.viewName)
      const connectorAlign = rightmost ? connectorSize : connectorSize * -1
      const isBaseView =
        Math.abs(diagramDict.tableData[joinField.viewName][0].diagramDegree) ===
        Math.min(...joinDegrees)
      let connectorPath: JoinPoint[][] = []

      joinField.joinX = isBaseView
        ? joinField.joinX + connectorAlign / 4
        : joinField.joinX

      if (isBaseView) {
        const manyKinds = ['many_to_one', 'many_to_many']
        manyKinds.includes(joinField.joinObj.relationship)
          ? (connectorPath = getManyPath(connectorSize, rightmost, joinField))
          : (connectorPath = getOnePath(connectorSize, rightmost, joinField))
      } else {
        const manyKinds = ['one_to_many', 'many_to_many']
        manyKinds.includes(joinField.joinObj.relationship)
          ? (connectorPath = getManyPath(connectorSize, rightmost, joinField))
          : (connectorPath = getOnePath(connectorSize, rightmost, joinField))
      }

      // Draw their arrowheads
      addJoinArrowheads(join, joinData[0].joinName)

      // Add the "bracket" that links many fields on one table
      connectorPath.forEach((connector) => {
        join
          .append('path')
          .datum(connector)
          .attr('class', 'join-path')
          .attr(
            'marker-end',
            () => isBaseView || 'url(#arrows-' + joinData[0].joinName + ')'
          )
          .attr(
            'd',
            d3
              .line()
              .curve(d3.curveLinear)
              .x((d: any) => d.x)
              .y((d: any) => d.y)
          )
      })

      const tableJoins = joinPath.filter(
        (row) => row.viewName === joinField.viewName
      )
      const joinNode = tableJoins[0]
      const joinBracketPath: JoinPoint[] = []
      joinBracketPath.push({
        x: joinNode.joinX,
        y: joinNode.joinY + TABLE_ROW_HEIGHT / 2,
        viewName: joinNode.viewName,
      })
      joinBracketPath.push({
        x: joinField.joinX,
        y: joinField.joinY + TABLE_ROW_HEIGHT / 2,
        viewName: joinField.viewName,
      })
      tableJoins.length > 1 &&
        join
          .append('path')
          .datum(joinBracketPath)
          .attr('class', 'join-path')
          .attr(
            'd',
            d3
              .line()
              .curve(d3.curveBasis)
              .x((d: any) => d.x)
              .y((d: any) => d.y)
          )
    })

    const joinType = joinData[0].joinObj.type
      ? joinData[0].joinObj.type
      : 'left_outer'
    const isCross = joinType === 'cross'
    const iconWidth = isCross ? 90 : 50
    const pillWidth = iconWidth + joinType.length * 6 + 10

    const lX = cX - pillWidth / 2
    const lY = cY + (Math.abs(aY - fY) / 2) * goUp - 20

    makeJoinIcon(join, iconWidth, pillWidth, lX, lY, joinType)

    // Draw hover element for join-part path
    const drawnJoinHover = join
      .append('path')
      .datum(tableJoinPath)
      .attr('class', 'join-path-hover')
      .classed('minimap-join-path-hover', type === 'minimap')
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveBundle.beta(1))
          .x((d: any) => d.joinX)
          .y((d: any) => d.joinY)
      )

    const hoverMouseEnter =
      type === 'display' &&
      drawnJoinHover.on('mouseenter', () => {
        d3.selectAll(`.${type}-area > g.join-` + joinData[0].joinName)
          .classed('join-path-selected', true)
          .raise()
      })
    const hoverMouseLeave =
      type === 'display' &&
      hoverMouseEnter.on('mouseleave', () => {
        if (
          JSON.stringify(selectionInfo) !==
          JSON.stringify({
            lookmlElement: 'join',
            name: joinData[0].joinName,
          })
        ) {
          d3.selectAll(
            `.${type}-area > g.join-` + joinData[0].joinName
          ).classed('join-path-selected', false)
        }
      })
    type === 'display' &&
      hoverMouseLeave.on('click', () => {
        setSelectionInfo({
          lookmlElement: 'join',
          name: joinData[0].joinName,
        })
      })
  })
}
