import React, { useState, useEffect, useContext } from "react"
import { ExtensionContext, ExtensionContextData } from "@looker/extension-sdk-react"
import { Looker31SDK as LookerSDK, Looker31SDK } from '@looker/sdk/lib/sdk/3.1/methods'
import { ILookmlModel, ILookmlModelExplore, IUser, IGroup } from "@looker/sdk/lib/sdk/4.0/models"
import { FieldComments, CommentPermissions } from "../../src/components/interfaces";
import { delay } from "lodash";

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

export const getMyUser = async (sdk: LookerSDK) => {
  return sdk.ok(sdk.me())
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
  const [modelDetail, setModelDetail] = useState<DetailedModel | undefined>(undefined)
  useEffect(() => {
    async function fetcher() {
      if (modelName) {
        setModelDetail(await loadModelDetail(coreSDK, modelName))
      }
    }
    fetcher()
  }, [coreSDK, modelName])
  return modelDetail
}

export interface DetailedModel {
  model: ILookmlModel
  explores: ILookmlModelExplore[]
}

export function getExtLog() {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const { extensionSDK, initializeError } = extensionContext
  const [extensionLog, extensionLoggerState] = useState({diagramLog: []})

  const extensionLogger = async (newMetadata: any): Promise<void> => {
    try {
      // let staging = extensionLog.push(newMetadata)
      let staging = extensionLog
      staging.diagramLog.push(...newMetadata)
      await extensionSDK.saveContextData(staging)
      extensionLoggerState(staging)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      let context
      context = await extensionSDK.getContextData() || extensionLog
      extensionLoggerState(context)
    }
    initialize()
  }, [])

  return { extensionLog, extensionLogger }
}
