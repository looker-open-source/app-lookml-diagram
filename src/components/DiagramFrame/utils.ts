import { IGitBranch, ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models"
import { SelectOptionProps } from "@looker/components"
import { DIAGRAM_IGNORED_MODELS } from "../../utils/constants"
import { ExploreDropdown } from "./FramePanels"

/**
 * prepares the Git Branch dropdown data
 * @param gitBranch - currently selected branch obj
 * @param gitBranches - list of available branch objs
 */
export const getBranchOptions = (gitBranch: IGitBranch, gitBranches: IGitBranch[]) => {
  return gitBranches.map((branch: IGitBranch) => {
    return gitBranch.name === branch.name ? {
      value: branch.name, 
      label: branch.name, 
      icon: "GitBranch"
    } : {
      value: branch.name, 
      label: branch.name, 
    }
  })
}

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

/**
 * Prepares a list of diagrammable explores for the 'Select an Explore' list
 * @param unfilteredModels - the unprepared list of models
 */
export function prepareExploreList(currentModel: ILookmlModel) {
  return currentModel?.explores.map((d: ILookmlModelExplore)=>{
    return {
      value: d.name,
      label: d.label
    }
  }).sort((a: ExploreDropdown, b: ExploreDropdown) => a.label < b.label ? -1 : 1)
}
