import styled from "styled-components"
import { 
  DIAGRAM_BACKGROUND_COLOR, 
  DIAGRAM_HOVER_COLOR, 
  DIAGRAM_HOVER_TEXT_COLOR,
  DIAGRAM_BASE_TEXT_COLOR,
  DIAGRAM_SELECT_COLOR, 
  DIAGRAM_SELECT_TEXT_COLOR,
  DIAGRAM_TEXT_COLOR,
  TABLE_BACKGROUND_COLOR,
  DIAGRAM_FIELD_ICON_COLOR,
  DIAGRAM_PK_ICON_COLOR,
  DIAGRAM_JOIN_COLOR,
  DIAGRAM_VIEW_WEIGHT,
  DIAGRAM_FIELD_WEIGHT,
  DIAGRAM_FIELD_COLOR,
  DIAGRAM_VIEW_COLOR,
  DIAGRAM_BASE_VIEW_COLOR,
  DIAGRAM_DIMENSION_COLOR,
  DIAGRAM_MEASURE_COLOR,
  DIAGRAM_FIELD_STROKE_WIDTH,
  DIAGRAM_TEXT_SIZE,
  NONVIEWS,
  DIAGRAM_JOIN_SELECT_COLOR,
  DIAGRAM_MEASURE_HOVER_COLOR,
  DIAGRAM_MEASURE_ICON_COLOR
} from "../../../utils/constants"
import { 
  DiagramMetadata,
  DiagrammedModel
} from "../../../utils/LookmlDiagrammer/"
import { SelectionInfoPacket, VisibleViewLookup } from "../../interfaces"
import { DiagramError } from "../../../utils/fetchers"
import {
  Card,
  Paragraph,
  Box,
  Section,
  theme,
} from "@looker/components"
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
