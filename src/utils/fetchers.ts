import React, { useState, useEffect, useContext } from "react"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { Looker31SDK as LookerSDK  } from '@looker/sdk/lib/sdk/3.1/methods'
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/4.0/models"

const globalCache: any = {}

export function getCached<T>(key: string): T {
  return globalCache[key]
}

export async function loadCached<T>(
  key: string,
  callback: () => Promise<T>
): Promise<T> {
  if (globalCache[key]) {
    return getCached(key)
  } else {
    const val = await callback()
    /* eslint-disable require-atomic-updates */
    globalCache[key] = val
    return val
  }
}

export interface DetailedModel {
  model: ILookmlModel
  explores: ILookmlModelExplore[]
}

export interface DiagramError {
  kind: string
}

// user fetchers

export const getMyUser = async (sdk: LookerSDK) => {
  return sdk.ok(sdk.me())
}

// lookml model explore fetchers

export const loadAllModels = async (sdk: LookerSDK) => {
  return loadCached("all_lookml_models", () => sdk.ok(sdk.all_lookml_models()))
}

export function useAllModels() {
  const { coreSDK } = useContext(ExtensionContext)
  const [allModels, allModelsSetter] = useState<ILookmlModel[] | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      allModelsSetter(await loadAllModels(coreSDK))
    }
    fetcher()
  }, [coreSDK])
  return allModels
}

export const loadModel = async (sdk: LookerSDK, modelName: string) => {
  return (await loadAllModels(sdk)).find(m => m.name === modelName)
}

export async function loadModelDetail(
  sdk: LookerSDK,
  modelName: string,
  setModelError: (err: DiagramError) => void
): Promise<DetailedModel> {
  const model = await loadModel(sdk, modelName)
  const explores = await Promise.all(
    model.explores.map(explore => {
      return loadCachedExplore(sdk, model.name, explore.name)
    })
  ).catch(()=>setModelError({kind: "notFound"})) || []
  return {
    model,
    explores
  }
}

export function useModelDetail(modelName?: string, selectedBranch?: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [modelDetail, setModelDetail] = useState<DetailedModel | undefined>(undefined)
  const [modelError, setModelError] = useState<DiagramError | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      if (modelName) {
        setModelDetail(await loadModelDetail(coreSDK, modelName, setModelError))
      }
    }
    fetcher().catch(()=>{
      setModelError({kind: "general"})
    })
  }, [coreSDK, modelName, selectedBranch])
  return { modelDetail, modelError, setModelError }
}

export const loadCachedExplore = async (
  sdk: LookerSDK,
  modelName: string,
  exploreName: string
) => {
  return loadCached(`${modelName}|${exploreName}`, () =>
    sdk.ok(sdk.lookml_model_explore(modelName, exploreName))
  )
}

export function useExplore(modelName?: string, exploreName?: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [currentExplore, exploreSetter] = useState<ILookmlModelExplore | undefined>(undefined)
  const [loadingExplore, loadingExploreSetter] = useState(exploreName)
  useEffect(() => {
    async function fetcher() {
      if (modelName && exploreName) {
        loadingExploreSetter(exploreName)
        exploreSetter(await loadCachedExplore(coreSDK, modelName, exploreName))
        loadingExploreSetter(null)
      }
    }
    fetcher()
  }, [coreSDK, modelName, exploreName])
  return { loadingExplore, currentExplore }
}

// git fetchers

export const getActiveBranch = async (sdk: LookerSDK, projectId: string) => {
  return sdk.ok(sdk.git_branch(projectId))
}

export const getAvailBranches = async (sdk: LookerSDK, projectId: string) => {
  return sdk.ok(sdk.all_git_branches(projectId))
}

export const changeBranch = async (sdk: LookerSDK, projectId: string, gitName: string, gitRef: string) => {
  return sdk.ok(sdk.update_git_branch(projectId, 
    {
      name: gitName,
      ref: gitRef
    }))
}

export function getActiveGitBranch(projectId: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [gitBranch, setGitBranch] = useState<any>(undefined)
  useEffect(() => {
    async function fetcher() {
      setGitBranch(await getActiveBranch(coreSDK, projectId))
    }
    projectId && fetcher()
  }, [coreSDK, projectId])
  return gitBranch
}

export function getAvailGitBranches(projectId: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [gitBranches, setGitBranches] = useState<any>(undefined)
  useEffect(() => {
    async function fetcher() {
      setGitBranches(await getAvailBranches(coreSDK, projectId))
    }
    projectId && fetcher()
  }, [coreSDK, projectId])
  return gitBranches
}

export function setGitBranch(projectId: string, gitName: string, gitRef: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [newBranch, setNewBranch] = useState<any>(undefined)
  useEffect(() => {
    async function fetcher() {
      console.log(projectId, gitName, gitRef)
      setNewBranch(await changeBranch(coreSDK, projectId, gitName, gitRef))
    }
    projectId && gitName && gitRef && fetcher()
  }, [coreSDK, projectId, gitName, gitRef])
  return newBranch
}
