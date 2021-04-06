import { useRouteMatch } from "react-router-dom"
import { useAllModels, useModelDetail, DiagramError } from "./fetchers"
import { generateModelDiagrams, DiagrammedModel } from "./LookmlDiagrammer"

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
  fullPage: any
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
  
  const renderMatch = useRouteMatch({
    path: "/models/:model/explores/:explore/render",
    sensitive: true
  })

  return {
    modelName: match && match.params.model,
    exploreName: match2 && match2.params.explore,
    fieldName: match3 && match3.params.field,
    detailPane: match3 && match3.params.tab,
    fullPage: renderMatch
  }
}

export function useSelectExplore(hiddenToggle: boolean, displayFieldType: string, selectedBranch: string, diagramError: DiagramError, setDiagramError: (err: DiagramError) => void) {
  const { modelName } = usePathNames()
  const unfilteredModels = useAllModels(selectedBranch, diagramError)
  const currentModel = useCurrentModel(selectedBranch, diagramError)
  let {modelDetail} = useModelDetail(modelName, selectedBranch, diagramError, setDiagramError)
  let dimensions: DiagrammedModel[] = generateModelDiagrams(modelDetail, hiddenToggle, displayFieldType)
  return {
    unfilteredModels,
    currentModel, 
    modelDetail, 
    dimensions, 
  }
}

export function useCurrentModel(selectedBranch: string, diagramError: DiagramError) {
  const { modelName } = usePathNames()
  const modelData = useAllModels(selectedBranch, diagramError)
  let currentModel = modelData && modelData.find(m => m.name === modelName)
  return currentModel

}
