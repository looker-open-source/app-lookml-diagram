import * as d3 from 'd3';
import { getLabelColor } from './styles';
import { createLookmlJoinElement } from './joins'

// export function initializeDragging(tableData: any) {
//   function dragstarted(event: any, d: any) {
//     d3.select(".table-row-"+d.view)
//     .attr("fill", "yellow");
//   }

//   function dragged(event: any, d: any) {
//     let eventX = event.sourceEvent.x-getX(d.view)
//     let eventY = event.sourceEvent.y-getY(d.view, 0)
//     d3.selectAll(".table-"+d.view)
//     .attr("transform", ()=> {
//       return `translate(${eventX},${eventY})`
//     });
//   }

//   function dragended(this: any, event: any, d: any) {
//     tableData.joins.map((join:any,i:number)=>{
//       let pack: any
//       pack = d3.select(".join-"+join.name).datum()
//       this.select(".join-"+join.name)
//       .remove()
//       createLookmlJoinElement(this, join, pack)
//     })
//     d3.select(".table-row-"+d.view)
//     .attr("fill", getLabelColor(d));
//   }

//   let drag = d3.drag()
//   .on("start", dragstarted)
//   .on("drag", dragged)
//   .on("end", dragended);

//   return drag
// }
