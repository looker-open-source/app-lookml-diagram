import React, { useState } from "react"
import { Menu, MenuItem, MenuGroup, Text, MenuSearch } from "looker-lens"
import { ILookmlModel, ILookmlModelNavExplore } from "@looker/sdk"
import { CurrentExplore } from "./DataDictionary"

const notHidden = explore => !explore.hidden
const matchesSearch = search => explore =>
  explore.label.toLowerCase().indexOf(search.toLowerCase()) !== -1

export default ({
  models,
  currentExplore,
  onExploreSelected
}: {
  models: ILookmlModel[]
  currentExplore?: CurrentExplore
  onExploreSelected: (explore: CurrentExplore) => void
}) => {
  const [search, setSearch] = useState("")

  return (
    <Menu>
      <MenuSearch
        placeholder="Search Explores..."
        value={search}
        // onClear={() => setSearch("")}
        onChange={e => setSearch(e.currentTarget.value)}
      />

      {models
        .filter(
          model =>
            model.explores.filter(notHidden).filter(matchesSearch(search))
              .length > 0
        )
        .map(model => {
          return (
            <MenuGroup label={model.label} key={model.name}>
              {model.explores
                .filter(notHidden)
                .filter(matchesSearch(search))
                .map(explore => {
                  return (
                    <MenuItem
                      current={
                        currentExplore &&
                        currentExplore.explore.name == explore.name &&
                        currentExplore.model.name == model.name
                      }
                      key={explore.name}
                      onClick={() => onExploreSelected({ model, explore })}
                    >
                      {explore.label}
                      <Text fontSize="xxsmall" color="muted">
                        {explore.description}
                      </Text>
                    </MenuItem>
                  )
                })}
            </MenuGroup>
          )
        })}
    </Menu>
  )
}
