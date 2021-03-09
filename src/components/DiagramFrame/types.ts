import { ILookmlModel, ILookmlModelExplore, IGitBranch } from "@looker/sdk/lib/sdk/4.0/models"
import { SelectionInfoPacket, VisibleViewLookup } from "../interfaces"
import { getActiveGitBranch, getAvailGitBranches, DiagramError } from "../../utils/fetchers"
import { OVERRIDE_KEY_SUBTLE, DIAGRAM_HEADER_HEIGHT } from "../../utils/constants"
import { DiagrammedModel } from "../../utils/diagrammer"
import styled from "styled-components"
import {
  Aside,
  Section,
  SelectOptionProps,
  Icon,
  theme,
  Header,
} from "@looker/components"

export interface ViewOptionsProps {
  displayFieldType: any,
  hiddenToggle: any,
  viewVisible: any,
  setViewVisible: (visible: any) => void,
  handleHiddenToggle: (toggle: React.FormEvent<HTMLInputElement>) => void,
  setDisplayFieldType: (types: any) => void,
}

export interface DiagramFrameProps {
  unfilteredModels: ILookmlModel[]
  pathModelName: string
  pathExploreName: string
  modelDetail: any
  dimensions: DiagrammedModel[]
  modelError: DiagramError
  setModelError: (e: DiagramError)=>void
  hiddenToggle: boolean,
  setHiddenToggle: (t: boolean)=>void
  displayFieldType: string,
  setDisplayFieldType: (s: string)=>void,
  selectedBranch: string,
  setSelectedBranch: (b: string)=>void,
 }

 export interface DiagramSettingsProps {
  modelDetails: SelectOptionProps[],
  currentModel: ILookmlModel,
  modelName: string,
  exploreList: ExploreDropdown[],
  setModelError: (error: DiagramError) => void,
  selectedBranch: string,
  setSelectedBranch: (branchName: string) => void,
  branchOpts: SelectOptionProps[],
  gitBranch: IGitBranch,
  gitBranches: IGitBranch[],
  selectionInfo: SelectionInfoPacket,
  currentExplore: ILookmlModelExplore,
  diagramExplore: string,
  setSelectionInfo: (info: SelectionInfoPacket) => void,
  setViewVisible: (visible: VisibleViewLookup) => void,
  setZoomFactor: (zoom: number) => void,
  setViewPosition: (info: any) => void,
  setMinimapUntoggled: (toggle: boolean) => void,
  setMinimapEnabled: (toggle: boolean) => void,
}

 export interface ExploreDropdown {
  value: string;
  label: string;
}

export interface DiagramHeaderProps {
  currentExplore: ILookmlModelExplore,
  selectionInfo: SelectionInfoPacket,
  toggleExploreInfo: ()=>void,
}
