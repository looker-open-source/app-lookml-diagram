import { IGitBranch, ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models"
import { SelectOptionProps, theme } from "@looker/components"
import { OVERRIDE_KEY_SUBTLE, DIAGRAM_IGNORED_MODELS } from "../../utils/constants"
import { ExploreDropdown } from "./types"

/**
 * get the color of a view list item according to its visibility status
 * @param disabled - whether or not the current view is disabled
 */
export function getViewListItemColor(disabled: boolean) {
  if (disabled) {
    return undefined
  }
  return theme.colors.text1
}

/**
 * prepares the Git Branch dropdown data
 * @param gitBranch - currently selected branch obj
 * @param gitBranches - list of available branch objs
 */
export const getBranchOptions = (gitBranch: IGitBranch, gitBranches: IGitBranch[]) => {
  return gitBranches.map((branch: IGitBranch) => {
    if (gitBranch.name === branch.name) {
      return {
        value: branch.name, 
        label: branch.name, 
        icon: "GitBranch"
      }
    } else {
      return {
        value: branch.name, 
        label: branch.name, 
      }
    }
  })
}

/**
 * gets the background color for each ExploreListItem
 * @param exploreNameSel - name of the explore list item
 * @param currentExplore - current url explore obj
 * @param diagramExplore - current diagrammed explore obj
 */
export function getExploreListItemBackground(exploreNameSel: string, currentExplore: ILookmlModelExplore, diagramExplore: string) {
  if (currentExplore && currentExplore.name === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  if (diagramExplore === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  return undefined
}

/**
 * Prepares a list of diagrammable models for the Choose a Model dropdown
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
 * Prepares a list of diagrammable explores for the Select an Explore list
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
