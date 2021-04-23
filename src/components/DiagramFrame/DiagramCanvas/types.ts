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
import { 
  DiagramMetadata,
  DiagrammedModel
} from "../../../utils/LookmlDiagrammer/"
import { SelectionInfoPacket, VisibleViewLookup } from "../../interfaces"
import { DiagramError } from "../../../utils/fetchers"
import { ILookmlModelExplore, ILookmlModel } from '@looker/sdk/lib/sdk/3.1/models';

export interface DiagramProps {
  type: string
  dimensions: DiagramMetadata
  explore: ILookmlModelExplore
  reload: boolean
  selectionInfo: SelectionInfoPacket
  setSelectionInfo: (packet: SelectionInfoPacket) => void
  hiddenToggle: boolean
  displayFieldType: string
  viewVisible: VisibleViewLookup
  zoomFactor: number
  setZoomFactor: (zoomFactor: number) => void
  viewPosition: any
  setViewPosition: (positionPacket: any) => void
  selectedBranch: string
}

export interface DiagramToolbarProps {
  zoomFactor: number,
  reload: boolean,
  defaultMinimap: boolean,
  minimapUntoggled: boolean,
  minimapEnabled: boolean,
  setZoomFactor: (k: number)=>void,
  setViewPosition: (posPacket: any)=>void,
  setReload: (r: boolean)=>void,
  setMinimapUntoggled: (ut: boolean)=>void,
  setMinimapEnabled: (e: boolean)=>void,
}

export interface DiagramCanvasProps {
  unfilteredModels: ILookmlModel[]
  modelError: DiagramError
  pathModelName: string
  pathExploreName: string
  currentDimensions: DiagrammedModel
  zoomFactor: number
  reload: boolean
  minimapUntoggled: boolean
  minimapEnabled: boolean
  setZoomFactor: (k: number)=>void
  setViewPosition: (posPacket: any)=>void
  setReload: (r: boolean)=>void
  setMinimapUntoggled: (ut: boolean)=>void
  setMinimapEnabled: (e: boolean)=>void
  dimensions: DiagramMetadata
  explore: ILookmlModelExplore
  selectionInfo: SelectionInfoPacket
  setSelectionInfo: (packet: SelectionInfoPacket) => void
  hiddenToggle: boolean
  displayFieldType: string
  viewVisible: VisibleViewLookup
  viewPosition: any
  selectedBranch: string
}
