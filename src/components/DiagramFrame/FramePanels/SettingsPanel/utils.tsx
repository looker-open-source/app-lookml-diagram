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
import React from 'react'
import type {
  ILookmlModel,
  ILookmlModelExplore,
  IGitBranch,
} from '@looker/sdk/lib/4.0/models'
import { GitBranch } from '@looker/icons'
import type { SelectOptionProps } from '@looker/components'
import type {
  SelectionInfoPacket,
  VisibleViewLookup,
} from '../../../interfaces'
import {
  X_INIT,
  Y_INIT,
  ZOOM_INIT,
  OVERRIDE_KEY_SUBTLE,
} from '../../../../utils/constants'
import { internalExploreURL } from '../../../../utils/routes'
import type { ExploreDropdown } from '../types'

export function handleExploreChange(
  history: any,
  currentModel: ILookmlModel,
  currentExplore: ExploreDropdown,
  selectionInfo: SelectionInfoPacket,
  setSelectionInfo: (info: SelectionInfoPacket) => void,
  setViewVisible: (visible: VisibleViewLookup) => void,
  setZoomFactor: (zoom: number) => void,
  setViewPosition: (info: any) => void,
  setMinimapUntoggled: (toggle: boolean) => void,
  setMinimapEnabled: (toggle: boolean) => void
) {
  selectionInfo.lookmlElement === 'explore' || setSelectionInfo({})
  setViewVisible({})
  setZoomFactor(ZOOM_INIT)
  setViewPosition({ x: X_INIT, y: Y_INIT })
  setMinimapUntoggled(true)
  setMinimapEnabled(false)
  history.push(
    internalExploreURL({
      model: currentModel.name,
      explore: currentExplore.value,
    })
  )
}

/**
 * gets the background color for each ExploreListItem
 * @param exploreNameSel - name of the explore list item
 * @param currentExplore - current url explore obj
 * @param diagramExplore - current diagrammed explore obj
 */
export function getExploreListItemBackgroundColor(
  exploreNameSel: string,
  currentExplore: ILookmlModelExplore,
  diagramExplore: string
) {
  if (currentExplore && currentExplore.name === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  if (diagramExplore === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  return undefined
}

/**
 * prepares the Git Branch dropdown data
 * @param gitBranch - currently selected branch obj
 * @param gitBranches - list of available branch objs
 */
export const getBranchOptions = (
  gitBranch: IGitBranch,
  gitBranches: IGitBranch[]
): SelectOptionProps[] => {
  return gitBranches?.map((branch: IGitBranch) => {
    return gitBranch.name === branch.name
      ? {
          value: branch.name,
          label: branch.name,
          icon: <GitBranch />,
        }
      : {
          value: branch.name,
          label: branch.name,
          icon: undefined,
        }
  })
}
