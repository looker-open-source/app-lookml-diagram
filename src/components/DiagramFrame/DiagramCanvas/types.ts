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
} from "../../../utils/diagrammer"
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

export const Toolbar = styled(Card as any)`
  min-width: 40px;
  width: 40px;
  height: auto;
  left: 20px;
  bottom: 80px;
  position: absolute;
`

export const DiagramCanvasWrapper = styled(Section as any)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
`
export const FullPage = styled(Box as any)`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 93vh;
  flex-direction: column;
`

export const IntroText = styled(Paragraph as any)`
  text-align: center;
  margin-top: 5em;
  max-width: 40%;
  color: ${theme.colors.text1};
`

export const PageLoading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`
export const Minimap = styled(Card as any)`
  min-width: 300px;
  width: 300px;
  height: auto;
  right: 20px;
  top: 20px;
  position: absolute;
`

export const DiagramSpace = styled.svg`
  background-color: ${(props: any)=>props.type === "help-view" || props.type === "help-join" ? theme.colors.background : DIAGRAM_BACKGROUND_COLOR};
  .display-area {
    cursor: move;
  }
  width: 100%;
  height: 100%;
  user-select: none;

  .clickable-background {
    fill: transparent;
  }

  rect.table-background {
    stroke: ${TABLE_BACKGROUND_COLOR};
    stroke-width: 10;
  }

  // Basic table rows

  g.table-row:not(.minimap-table-row) {
    cursor: pointer;
  }

  .row-divider {
    stroke: ${TABLE_BACKGROUND_COLOR};
  }

  g.table-row > rect,
  g.table-row > path.table-row {
    stroke-width: ${DIAGRAM_FIELD_STROKE_WIDTH}px;
    stroke: ${DIAGRAM_FIELD_COLOR};
    fill: ${DIAGRAM_FIELD_COLOR};
  }

  g.table-row > path.datatype-icon {
    fill: ${DIAGRAM_FIELD_ICON_COLOR};
  }

  g.table-row.table-row-measure > path.datatype-icon {
    fill: ${DIAGRAM_MEASURE_ICON_COLOR};
  }

  g.table-row > path.pk-icon {
    fill: ${DIAGRAM_PK_ICON_COLOR};
  }

  g.table-row-view > rect,
  g.table-row-view > path.table-row {
    stroke: ${DIAGRAM_VIEW_COLOR};
    fill: ${DIAGRAM_VIEW_COLOR};
  }

  g.table-row-base-view > rect,
  g.table-row-base-view > path.table-row {
    stroke: ${DIAGRAM_BASE_VIEW_COLOR};
    fill: ${DIAGRAM_BASE_VIEW_COLOR};
  }

  g.table-row-dimension > rect,
  g.table-row-measure > path.table-row {
    stroke: ${DIAGRAM_DIMENSION_COLOR};
    fill: ${DIAGRAM_DIMENSION_COLOR};
  }

  g.table-row-measure > rect,
  g.table-row-measure > path.table-row {
    stroke: ${DIAGRAM_MEASURE_COLOR};
    fill: ${DIAGRAM_MEASURE_COLOR};
  }

  g.table-row > text {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-weight: ${DIAGRAM_FIELD_WEIGHT};
    font-size: ${DIAGRAM_TEXT_SIZE};
  }

  g.table-row-view > text {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-weight: ${DIAGRAM_VIEW_WEIGHT};
  }

  g.table-row-base-view > text {
    fill: ${DIAGRAM_BASE_TEXT_COLOR};
    font-weight: ${DIAGRAM_VIEW_WEIGHT};
  }

  // Rows when hover, selected

  g.table-row-selected:not(.help-table-row) > rect,
  g.table-row-selected:not(.help-table-row) > path.table-row {
    stroke: ${DIAGRAM_SELECT_COLOR};
    fill: ${DIAGRAM_SELECT_COLOR};
  }

  g.table-row-selected > text,
  g.table-row-selected > path.pk-icon,
  g.table-row-selected > path.datatype-icon,
  g.table-row-selected > path.datatype-icon,
  g.table-row-measure.table-row-selected > path.datatype-icon {
    fill: ${DIAGRAM_SELECT_TEXT_COLOR};
  }

  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > rect,
  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > path.table-row {
    stroke: ${DIAGRAM_HOVER_COLOR};
    fill: ${DIAGRAM_HOVER_COLOR};
  }

  g.table-row.table-row-measure:not(.table-row-selected):not(.help-table-row):hover > rect,
  g.table-row.table-row-measure:not(.table-row-selected):not(.help-table-row):hover > path.table-row {
    fill: ${DIAGRAM_MEASURE_HOVER_COLOR};
    stroke: ${DIAGRAM_MEASURE_HOVER_COLOR};
  }

  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > text {
    fill: ${DIAGRAM_HOVER_TEXT_COLOR};
  }

  // JOINS

  g > path.join-path {
    fill: none;
    stroke: ${DIAGRAM_JOIN_COLOR};
    stroke-width: 3px;
  }

  g > path.join-path-hover {
    fill: none;
    stroke: transparent;
    stroke-width: 100px;
  }
  
  g > path.join-path-hover:not(.minimap-join-path-hover) {
    cursor: pointer;
  }

  g > marker > path {
    fill: ${DIAGRAM_JOIN_COLOR};
  }

  g.join-path-selected > path.join-path {
    stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke-width: 8px;
  }
  
  g.join-path-selected > marker > path {
    fill: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
    stroke-width: 2px;
  }

  g.join-path-selected > text.join-path-icon-label {
    fill: ${DIAGRAM_TEXT_COLOR};
    font-size: xx-small;
    font-family: monospace;
    text-anchor: middle;
  }

  g.join-path-selected > rect.join-path-icon-background {
    fill: ${DIAGRAM_BACKGROUND_COLOR};
  }

  g.join-path-selected > path.join-path-icon-right,
  g.join-path-selected > circle.join-path-icon-right {
    fill: #6EA391;
  }

  g.join-path-selected > path.join-path-icon-left,
  g.join-path-selected > circle.join-path-icon-left {
    fill: #997CAD;
  }

  g.join-path-selected > path.join-path-icon-connector {
    stroke: #939BA5;
    stroke-width: 1.95833;
  }
`
