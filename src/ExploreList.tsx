import * as React from "react"
import { Menu, MenuItem, MenuGroup } from "looker-lens"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"

export default ({
  models,
  onExploreSelected
}: {
  models: ILookmlModel[]
  onExploreSelected: (
    model: ILookmlModel,
    explore: ILookmlModelNavExplore
  ) => void
}) => (
  <Menu>
    {models
      .filter(model => model.explores.length > 0)
      .map(model => {
        return (
          <MenuGroup label={model.label} key={model.name}>
            {model.explores.map(explore => {
              return (
                <MenuItem
                  key={explore.name}
                  onClick={() => onExploreSelected(model, explore)}
                >
                  {explore.label}
                </MenuItem>
              )
            })}
          </MenuGroup>
        )
      })}
  </Menu>
)
