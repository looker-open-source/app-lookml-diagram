/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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
import type {
  ILookmlModel,
  ILookmlModelExplore,
} from '@looker/sdk/lib/4.0/models'
import type { SelectOptionProps } from '@looker/components'
import { DIAGRAM_IGNORED_MODELS } from '../../utils/constants'
import type { ExploreDropdown } from './FramePanels'

/**
 * Prepares a list of diagrammable models for the 'Choose a Model' dropdown
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareModelDropdown(unfilteredModels: ILookmlModel[] = []) {
  return unfilteredModels
    .filter((d: ILookmlModel) => {
      return d.explores.length >= 1 && !DIAGRAM_IGNORED_MODELS.includes(d.name)
    })
    .map((d: ILookmlModel) => {
      return {
        value: d.name,
        label: d.label,
      }
    })
    .sort((a: SelectOptionProps, b: SelectOptionProps) =>
      a.label < b.label ? -1 : 1
    )
}

/**
 * Prepares a list of diagrammable explores for the 'Select an Explore' list
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareExploreList(currentModel: ILookmlModel) {
  return currentModel?.explores
    .map((d: ILookmlModelExplore) => {
      return {
        value: d.name,
        label: d.label,
      }
    })
    .sort((a: ExploreDropdown, b: ExploreDropdown) =>
      a.label < b.label ? -1 : 1
    )
}
