import * as d3 from 'd3';

export function addZoom(svg: any) {
  var zoom = d3.zoom()
  .scaleExtent([0.15, 2])
  .on('zoom', function(event) {
    d3.selectAll('.diagram-area')
    .attr('transform', `translate(${event.transform.x}, ${event.transform.y}) scale(${event.transform.k})`);
  })

  // console.log(zoom)

  // svg.call(zoom.transform, d3.zoomIdentity.translate(600,100).scale(0.5))

  return svg.call(zoom);
}
