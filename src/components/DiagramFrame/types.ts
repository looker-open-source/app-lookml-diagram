import { ILookmlModel, ILookmlModelExplore, IGitBranch } from "@looker/sdk/lib/sdk/4.0/models"
import { SelectionInfoPacket, VisibleViewLookup } from "../interfaces"
import { getActiveGitBranch, getAvailGitBranches, DiagramError, DetailedModel } from "../../utils/fetchers"
import { OVERRIDE_KEY_SUBTLE, DIAGRAM_HEADER_HEIGHT } from "../../utils/constants"
import { DiagrammedModel } from "../../utils/LookmlDiagrammer/"
import styled from "styled-components"
import {
  Aside,
  Section,
  SelectOptionProps,
  Icon,
  theme,
  Header,
} from "@looker/components"

export interface DiagramFrameProps {
  unfilteredModels: ILookmlModel[]
  pathModelName: string
  pathExploreName: string
  modelDetail: DetailedModel
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

export interface DiagramHeaderProps {
  currentExplore: ILookmlModelExplore,
  selectionInfo: SelectionInfoPacket,
  toggleExploreInfo: ()=>void,
}
