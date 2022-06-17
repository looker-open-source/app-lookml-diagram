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
import type {
  SelectionInfoPacket,
  VisibleViewLookup,
} from '../../../interfaces'
import type { ExploreDropdown } from '../types'
import type { DetailedModel } from '../../../../utils/fetchers'

export interface ExploreListProps {
  currentModel: ILookmlModel
  exploreList: ExploreDropdown[]
  selectionInfo: SelectionInfoPacket
  currentExplore: ILookmlModelExplore
  diagramExplore: string
  setSelectionInfo: (info: SelectionInfoPacket) => void
  setViewVisible: (visible: VisibleViewLookup) => void
  setZoomFactor: (zoom: number) => void
  setViewPosition: (info: any) => void
  setMinimapUntoggled: (toggle: boolean) => void
  setMinimapEnabled: (toggle: boolean) => void
}

export interface DiagramSettingsProps {
  modelPathName: string
  explorePathName: string
  modelDetails: SelectOptionProps[]
  exploreList: ExploreDropdown[]
  modelDetail: DetailedModel
  selectionInfo: SelectionInfoPacket
  currentExplore: ILookmlModelExplore
  diagramExplore: string
  setSelectionInfo: (info: SelectionInfoPacket) => void
  setViewVisible: (visible: VisibleViewLookup) => void
  setZoomFactor: (zoom: number) => void
  setViewPosition: (info: any) => void
  setMinimapUntoggled: (toggle: boolean) => void
  setMinimapEnabled: (toggle: boolean) => void
}
