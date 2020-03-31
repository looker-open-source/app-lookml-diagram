import React, { useState, useEffect, useContext } from "react"
import { ExtensionContext } from "@looker/extension-sdk-react"
import { Looker31SDK as LookerSDK } from '@looker/sdk/dist/sdk/3.1/methods'
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk/dist/sdk/4.0/models"

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

export const loadCachedExplore = async (
  sdk: LookerSDK,
  modelName: string,
  exploreName: string
) => {
  return loadCached(`${modelName}|${exploreName}`, () =>
    sdk.ok(sdk.lookml_model_explore(modelName, exploreName))
  )
}

export const loadAllModels = async (sdk: LookerSDK) => {
  return loadCached("all_lookml_models", () => sdk.ok(sdk.all_lookml_models()))
}

export function useAllModels() {
  const { coreSDK } = useContext(ExtensionContext)
  const [value, setter] = useState<ILookmlModel[] | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      setter(await loadAllModels(coreSDK))
    }
    fetcher()
  }, [coreSDK])
  return value
}

export function useExplore(modelName?: string, exploreName?: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [value, setter] = useState<ILookmlModelExplore | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      if (modelName && exploreName) {
        setter(await loadCachedExplore(coreSDK, modelName, exploreName))
      }
    }
    fetcher()
  }, [coreSDK, modelName, exploreName])
  return value
}

export const loadModel = async (sdk: LookerSDK, modelName: string) => {
  return (await loadAllModels(sdk)).find(m => m.name === modelName)
}

export async function loadModelDetail(
  sdk: LookerSDK,
  modelName: string
): Promise<DetailedModel> {
  const model = await loadModel(sdk, modelName)
  const explores = await Promise.all(
    model.explores.map(explore => {
      return loadCachedExplore(sdk, model.name, explore.name)
    })
  )
  return {
    model,
    explores
  }
}

export function useModelDetail(modelName?: string) {
  const { coreSDK } = useContext(ExtensionContext)
  const [value, setter] = useState<DetailedModel | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      if (modelName) {
        setter(await loadModelDetail(coreSDK, modelName))
      }
    }
    fetcher()
  }, [coreSDK, modelName])
  return value
}

export interface DetailedModel {
  model: ILookmlModel
  explores: ILookmlModelExplore[]
}
