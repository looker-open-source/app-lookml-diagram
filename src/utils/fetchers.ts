/*

 MIT License

 Copyright (c) 2022 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ExtensionContext2 } from '@looker/extension-sdk-react'
import type {
  ILookmlModel,
  ILookmlModelExplore,
  IGitBranch,
} from '@looker/sdk/lib/4.0/models'
import type { DiagrammedModel } from './LookmlDiagrammer'
import { generateModelDiagrams } from './LookmlDiagrammer'

export interface DetailedModel {
  model: ILookmlModel
  explores: ILookmlModelExplore[]
  gitBranch: IGitBranch
  gitBranches: IGitBranch[]
  fetchError: string
}

export interface DiagramError {
  kind: string
  message?: string
}

const defaultQueryOptions = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnWindowFocus: false,
}

/**
 * gets the undetailed (explore metadata-less) models from instance
 * @returns allModels - list of models
 */
export function useAllModels(): ILookmlModel[] {
  const { coreSDK } = useContext(ExtensionContext2)
  const { data } = useQuery(
    'allModels',
    () => coreSDK.ok(coreSDK.all_lookml_models({})),
    {
      ...defaultQueryOptions,
    }
  )
  const allModels = data
  return allModels
}

/**
 * gets the explore metadata for a given explore
 * @param modelName - string model name
 * @param exploreName - string explore name
 * @returns - modelexplore metadata and loading
 */
export function useLookmlModelExplore(modelName: string, exploreName: string) {
  const { coreSDK } = useContext(ExtensionContext2)
  const { isLoading, data } = useQuery(
    `${modelName}|${exploreName}`,
    () => coreSDK.ok(coreSDK.lookml_model_explore(modelName, exploreName)),
    {
      retry: false,
      ...defaultQueryOptions,
    }
  )
  const explore = data
  return { explore, isLoading }
}

/**
 * gets the explore metadata for all explores in model
 * @param model - the model whose explores to fetch
 * @returns - array of explores and errorType
 */
export function useLookmlModelExplores(model: ILookmlModel) {
  const { coreSDK } = useContext(ExtensionContext2)
  const { error, data } = useQuery(
    `${model?.name}Explores`,
    () => {
      if (model.explores) {
        return Promise.all(
          model.explores.map((explore) => {
            return coreSDK.ok(
              coreSDK.lookml_model_explore(model.name, explore.name)
            )
          })
        )
      } else {
        return Promise.resolve([])
      }
    },
    {
      enabled: !!model,
      retry: false,
      ...defaultQueryOptions,
      initialData: undefined,
    }
  )
  const explores = data
  const modelExploreError = error && 'notFound'
  return { explores, modelExploreError }
}

/**
 * gets the model diagrams from the detailed model
 * @returns diagrammable model metadata
 */
export function useModelDiagrams(
  modelDetail: DetailedModel,
  hiddenToggle: boolean,
  displayFieldType: string
): DiagrammedModel[] {
  // Removing git branches as it causes a double render
  const tempModelDetail = { ...modelDetail } as Partial<DetailedModel>
  delete tempModelDetail.gitBranches
  const queryCacheKey =
    JSON.stringify(tempModelDetail) + hiddenToggle + displayFieldType
  const { data } = useQuery(
    queryCacheKey,
    () => generateModelDiagrams(modelDetail, hiddenToggle, displayFieldType),
    {
      ...defaultQueryOptions,
      initialData: undefined,
    }
  )
  const dimensions = data
  return dimensions || []
}

/**
 * gets the current active git branch
 * @param projectId - model / project name
 * @returns gitBranch metadata
 */
export function useCurrentGitBranch(projectId: string) {
  const { coreSDK } = useContext(ExtensionContext2)
  const { error, data } = useQuery(
    `branch@${projectId}`,
    () => coreSDK.ok(coreSDK.git_branch(projectId)),
    {
      enabled: !!projectId,
      ...defaultQueryOptions,
    }
  )
  const gitBranch = data
  const branchError = error && 'git'
  return { gitBranch, branchError }
}

/**
 * gets the available git branches to switch to
 * @param projectId - model / project name
 * @returns list of available git branches
 */
export function useAvailableGitBranches(projectId: string) {
  const { coreSDK } = useContext(ExtensionContext2)
  const { error, data } = useQuery(
    `branches@${projectId}`,
    () => coreSDK.ok(coreSDK.all_git_branches(projectId)),
    {
      enabled: !!projectId,
      ...defaultQueryOptions,
    }
  )
  const gitBranches = data
  const branchesError = error && 'git'
  return { gitBranches, branchesError }
}

/**
 * provides a mutation obj for updating git branch
 * invalidatesQuery and reloads page on success
 * @param projectId - model / project name
 * @returns current gitBranch object
 */
export function useUpdateGitBranches(projectId: string) {
  const { coreSDK } = useContext(ExtensionContext2)
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (gitName: string) =>
      coreSDK.ok(
        coreSDK.update_git_branch(projectId, {
          name: gitName,
          ref: '',
        })
      ),
    {
      onSuccess: () => {
        queryClient.resetQueries()
      },
    }
  )
  return mutation
}
