import * as d3 from 'd3';
import {   
  ZOOM_INIT,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
  X_INIT
} from '../utils/constants'

export function addZoom(
  svg: any, 
  zoomFactor: number, 
  setZoomFactor: (zoomFactor: number) => void, 
  viewPosition: any, 
  setViewPosition: (positionPacket: any) => void
  ) {
  var zoom = d3.zoom()
  .scaleExtent([ZOOM_MIN, ZOOM_MAX])
  .on('zoom', function(event) {
    d3.selectAll('.diagram-area')
    .attr('transform', `translate(${event.transform.x}, ${event.transform.y}) scale(${event.transform.k})`);
  })
  .on('end', function(event) {
    setViewPosition({x: event.transform.x, y: event.transform.y})
    setZoomFactor(event.transform.k)
  })

  svg.call(zoom.transform, d3.zoomIdentity.translate(viewPosition.x, viewPosition.y).scale(zoomFactor))

  svg.call(zoom);
}
