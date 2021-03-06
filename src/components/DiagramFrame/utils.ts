import { IGitBranch, ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models"
import { SelectOptionProps, theme } from "@looker/components"
import { OVERRIDE_KEY_SUBTLE } from "../../utils/constants"

export function viewDisabled(disabled: boolean) {
  if (!disabled) {
    return theme.colors.text1
  }
  return undefined
}

export const getBranchOptions = (gitBranch: IGitBranch, gitBranches: IGitBranch[]) => {
  return gitBranches.map((branch: IGitBranch) => {
    let opt: SelectOptionProps = {
      value: undefined,
      label: undefined,
    }
    if (gitBranch.name === branch.name) {
      opt = {
        value: branch.name, 
        label: branch.name, 
        icon: "GitBranch"
      }
    } else {
      opt = {
        value: branch.name, 
        label: branch.name, 
      }
    }
    return opt
  })
}

export function buttonShade(exploreNameSel: string, currentExplore: ILookmlModelExplore, diagramExplore: string) {
  if (currentExplore && currentExplore.name === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  if (diagramExplore === exploreNameSel) {
    return OVERRIDE_KEY_SUBTLE
  }
  return undefined
}
