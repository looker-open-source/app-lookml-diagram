import * as d3 from 'd3';
import { getTranslation } from './styles'

export function getX(viewName: string, dimensions: any) {
  return dimensions.diagramDict[viewName] && dimensions.diagramDict[viewName].x
}

export function getJoinX(viewName: string, dimensions: any) {
  if (!dimensions.diagramViews.includes(viewName)) {
    return getX(viewName, dimensions)
  }
  let sel = d3.select(".table-"+viewName)
  let matrix = getTranslation(sel.attr("transform"))
  return matrix ? matrix[0]+getX(viewName, dimensions) : getX(viewName, dimensions)
}

// A function that determines y position of an element
// based on the index of the LookmlView it belongs to. 
// TODO: custom pos
const y1 = d3
.scaleLinear()
.domain([0, 35])
.rangeRound([0, 1000]);

export function getRowOffset(viewIndex: number) {
  return y1(viewIndex)
}

export function getY(viewName: string, viewIndex: number, dimensions: any) {
  return y1(viewIndex) + (dimensions.diagramDict[viewName] && dimensions.diagramDict[viewName].y)
}

export function getJoinY(viewName: string, viewIndex: number, dimensions: any) {
  if (!dimensions.diagramViews.includes(viewName)) {
    return getY(viewName, viewIndex, dimensions)
  }
  let sel = d3.select(".table-"+viewName)
  let matrix = getTranslation(sel.attr("transform"))
  return matrix ? (matrix[1] + getY(viewName,viewIndex, dimensions)) : getY(viewName,viewIndex, dimensions)
}
