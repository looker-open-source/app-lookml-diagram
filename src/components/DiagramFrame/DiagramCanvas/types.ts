// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

import type {
  ILookmlModelExplore,
  ILookmlModel,
} from '@looker/sdk/lib/4.0/models'
import type {
  DiagramMetadata,
  DiagrammedModel,
} from '../../../utils/LookmlDiagrammer/'
import type { SelectionInfoPacket, VisibleViewLookup } from '../../interfaces'
import type { DetailedModel } from '../../../utils/fetchers'

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
}

export interface DiagramToolbarProps {
  zoomFactor: number
  reload: boolean
  defaultMinimap: boolean
  minimapUntoggled: boolean
  minimapEnabled: boolean
  setZoomFactor: (k: number) => void
  setViewPosition: (posPacket: any) => void
  setReload: (r: boolean) => void
  setMinimapUntoggled: (ut: boolean) => void
  setMinimapEnabled: (e: boolean) => void
}

export interface DiagramCanvasProps {
  unfilteredModels: ILookmlModel[]
  modelDetail: DetailedModel
  pathModelName: string
  pathExploreName: string
  currentDimensions?: DiagrammedModel
  zoomFactor: number
  reload: boolean
  minimapUntoggled: boolean
  minimapEnabled: boolean
  setZoomFactor: (k: number) => void
  setViewPosition: (posPacket: any) => void
  setReload: (r: boolean) => void
  setMinimapUntoggled: (ut: boolean) => void
  setMinimapEnabled: (e: boolean) => void
  explore: ILookmlModelExplore
  selectionInfo: SelectionInfoPacket
  setSelectionInfo: (packet: SelectionInfoPacket) => void
  hiddenToggle: boolean
  displayFieldType: string
  viewVisible: VisibleViewLookup
  viewPosition: any
}
