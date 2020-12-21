import * as d3 from 'd3';

export function addZoom(svg: any) {
  var zoom = d3.zoom()
  .scaleExtent([0.15, 2])
  .on('zoom', function(event) {
    d3.selectAll('.diagram-area')
    .attr('transform', event.transform);
  });

  return svg.call(zoom);
}
