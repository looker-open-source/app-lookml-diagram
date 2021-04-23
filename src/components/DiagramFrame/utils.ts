import { IGitBranch, ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models"
import { SelectOptionProps } from "@looker/components"
import { DIAGRAM_IGNORED_MODELS } from "../../utils/constants"
import { ExploreDropdown } from "./FramePanels"

/**
 * Prepares a list of diagrammable models for the 'Choose a Model' dropdown
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareModelDropdown(unfilteredModels: ILookmlModel[] = []) {
  return unfilteredModels.filter((d: ILookmlModel)=>{ 
    return d.explores.length >= 1 && !DIAGRAM_IGNORED_MODELS.includes(d.name)
  }).map((d: ILookmlModel)=>{
    return {
      value: d.name,
      label: d.label
    }
  }).sort((a: SelectOptionProps, b: SelectOptionProps) => a.label < b.label ? -1 : 1)
}
