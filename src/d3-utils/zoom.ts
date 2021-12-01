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
import { ZOOM_MAX, ZOOM_MIN } from '../utils/constants'

export function addZoom(
  svg: any,
  zoomFactor: number,
  setZoomFactor: (zoomFactor: number) => void,
  viewPosition: any,
  setViewPosition: (positionPacket: any) => void,
  type: string
) {
  // canvas zoom handler function
  const zoom = d3
    .zoom()
    .scaleExtent([ZOOM_MIN, ZOOM_MAX])
    .on('zoom', function (event) {
      if (type === 'display') {
        d3.selectAll(`.${type}-area`).attr(
          'transform',
          `translate(${event.transform.x}, ${event.transform.y}) scale(${event.transform.k})`
        )
      } else {
        d3.selectAll(`.${type}-area`).attr(
          'transform',
          `translate(${viewPosition.x}, ${viewPosition.y}) scale(${zoomFactor})`
        )
      }
    })
    .on('end', function (event) {
      if (type === 'display') {
        setViewPosition({ x: event.transform.x, y: event.transform.y })
        setZoomFactor(event.transform.k)
      }
    })

  // Init handler to last render's position, or initial position
  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(viewPosition.x, viewPosition.y).scale(zoomFactor)
  )

  // Invoke handler on svg
  svg.call(zoom)
}
