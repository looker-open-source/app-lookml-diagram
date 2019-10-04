import React, { useState } from "react"
import {
  Menu,
  MenuItem,
  MenuGroup,
  Text,
  InputText,
  palette,
  Box
} from "looker-lens"
import { ILookmlModel } from "@looker/sdk"
import { CurrentExplore } from "./DataDictionary"
import styled from "styled-components"

const notHidden = explore => !explore.hidden
const matchesSearch = search => explore =>
  explore.label.toLowerCase().indexOf(search.toLowerCase()) !== -1

const menuCustomizations = {
  bg: "#f5f5f5",
  color: palette.charcoal500,
  iconColor: palette.purple300,
  iconSize: 40,
  marker: {
    color: palette.purple300,
    size: 10
  },
  hover: {
    bg: palette.charcoal100,
    color: palette.charcoal700
  },
  current: {
    bg: palette.charcoal200,
    color: palette.charcoal700
  }
}

const GlobalSearch = styled(InputText)`
  width: 100%;
`

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
    <Menu customizationProps={menuCustomizations}>
      <Box m="medium" mb="none">
        <Text fontWeight="extraBold" fontSize="large">
          Data Dictionary
        </Text>
      </Box>
      <Box m="medium" mb="none">
        <GlobalSearch
          placeholder="Search Explores..."
          display="block"
          value={search}
          // onClear={() => setSearch("")}
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </Box>
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
                    </MenuItem>
                  )
                })}
            </MenuGroup>
          )
        })}
    </Menu>
  )
}
