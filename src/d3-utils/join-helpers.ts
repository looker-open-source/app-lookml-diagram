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

import { TABLE_ROW_HEIGHT } from '../utils/constants'

export const addJoinArrowheads = (join: any, joinName: string) => {
  join
    .append('marker')
    .attr('id', 'arrows-' + joinName)
    .attr('refX', 18)
    .attr('refY', 18)
    .attr('markerWidth', 50)
    .attr('markerHeight', 50)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 12 12 24 18 12 24 15 18')
}

export interface JoinPoint {
  x: number
  y: number
  viewName?: string
}

export function getManyPath(
  connectorSize: number,
  rightmost: number,
  joinField: any
): JoinPoint[][] {
  const connectorAlign = rightmost ? connectorSize : connectorSize * -1

  const baseX = joinField.joinX
  const baseY = joinField.joinY + TABLE_ROW_HEIGHT / 2

  const manyTopX = baseX + connectorAlign
  const manyTopY = baseY - 8

  const manyBotX = baseX + connectorAlign
  const manyBotY = baseY + 8

  const topFork = []
  const bottomFork = []

  topFork.push({ x: baseX, y: baseY })
  topFork.push({ x: manyTopX, y: manyTopY })
  bottomFork.push({ x: baseX, y: baseY })
  bottomFork.push({ x: manyBotX, y: manyBotY })

  return [topFork, bottomFork]
}

export function getOnePath(
  connectorSize: number,
  rightmost: number,
  joinField: any
) {
  const path = []
  const connectorAlign = rightmost ? connectorSize : connectorSize * -1

  const baseX = joinField.joinX
  const baseY = joinField.joinY + TABLE_ROW_HEIGHT / 2

  const headX = baseX + connectorAlign
  const headY = baseY

  path.push({ x: baseX, y: baseY })
  path.push({ x: headX, y: headY })

  return [path]
}
