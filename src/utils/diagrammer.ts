import { DetailedModel } from "./fetchers";
import { ILookmlModelExploreFieldset, ILookmlModelExploreField } from "@looker/sdk/lib/sdk/4.0/models"
import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn: any, dependencies: any[]) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);

  return ref;
}

// TODO: refactor getFields, getViews, getDiagramDict to be composable
export function getFields(exploreFields: ILookmlModelExploreFieldset) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  return fields
}

export function getViews(exploreFields: ILookmlModelExploreFieldset) {
  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  let views = fields.map((d)=>{return d.view}).filter(onlyUnique)
  return views
}

export function getDiagramDict(exploreFields: ILookmlModelExploreFieldset) {
  function onlyUnique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  let views = fields.map((d)=>{return d.view}).filter(onlyUnique)
  // TODO: type diagramDict
  let diagramDict: any = {}
  views.map((d, i) => {
    diagramDict[d] = [{category:"view",view:d,x:0,y:0},...fields.filter((e, j) => {
      return e.view === d
    })]
  })
  return diagramDict
}

export function getDiagramDimensions(details: DetailedModel) {
  let modifiedDetails: any[] = []
  details && details.explores.map((d,i) => {
    // TODO: type modifiedDetail
    let modifiedDetail = {
      exploreName: d.name,
      modelName: d.model_name,
      diagramFields: getFields(d.fields),
      diagramViews: getViews(d.fields),
      diagramDict: getDiagramDict(d.fields),
    }
    modifiedDetails.push(modifiedDetail)
  })
  return modifiedDetails
}
