import { useRouteMatch } from "react-router-dom"
import { useAllModels, useExplore, useModelDetail } from "./fetchers"
import { getDiagramDimensions } from "./diagrammer"

export function internalExploreURL({
  model,
  explore,
  field,
  tab,
}: {
  model: string
  explore: string
  field?: string,
  tab?: string,
}) {
  let url = `/models/${encodeURIComponent(model)}/explores/${encodeURIComponent(
    explore
  )}`
  if (field) {
    url = `${url}/field/${encodeURIComponent(field)}`
  }
  if (tab) {
    url = `${url}/pane/${encodeURIComponent(tab)}`
  }
  return url
}

export function relationshipsURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}/relationships`
}

export function internalModelURL({ model }: { model: string }) {
  return `/models/${encodeURIComponent(model)}`
}

export function usePathNames(): {
  modelName?: string
  exploreName?: string
  fieldName?: string
  detailPane?: string
  isRelationships: boolean
} {
  const match =
    useRouteMatch<{ model: string }>({
      path: "/models/:model",
      sensitive: true
    }) || undefined

  const match2 =
    useRouteMatch<{ model: string; explore: string }>({
      path: "/models/:model/explores/:explore",
      sensitive: true
    }) || undefined

  const match3 =
    useRouteMatch<{ model: string; explore: string; field: string; tab: string;}>({
      path: "/models/:model/explores/:explore/field/:field/pane/:tab",
    }) || undefined
  
  const relMatch = useRouteMatch({
    path: "/models/:model/relationships",
    sensitive: true
  })

  return {
    modelName: match && match.params.model,
    exploreName: match2 && match2.params.explore,
    fieldName: match3 && match3.params.field,
    detailPane: match3 && match3.params.tab,
    isRelationships: !!relMatch,
  }
}

export function useCurrentExplore() {
  const { modelName, exploreName } = usePathNames()
  return useExplore(modelName, exploreName)
}

export function useSelectExplore(diagramPersist: any) {
  var start = performance.now()
  const { modelName, exploreName } = usePathNames()
  // get model and all explore info
  let details = useModelDetail(modelName)
  // calculate diagram dimensions
  let dimensions = getDiagramDimensions(details, diagramPersist)
  var end = performance.now()
  var time = end - start;
  let explore = details && details.explores.filter(d=>{
    return d.name === exploreName
  })[0]
  let metadata = {
    source: "useSelectExplore",
    date: new Date().toISOString(),
    duration: time, 
    model: modelName,
    explore: exploreName,
    joins: explore && explore.joins.length,
    fields: explore && (explore.fields.dimensions.length + explore.fields.measures.length),
  };
  return {details, exploreName, metadata, dimensions}
}

export function useCurrentModel() {
  const { modelName } = usePathNames()
  const modelData = useAllModels()
  return modelData && modelData.find(m => m.name === modelName)
}
