import React, { useState } from "react"
import {
  Menu,
  MenuItem,
  MenuGroup,
  Text,
  palette,
  Box,
  InputText,
  styled
} from "looker-lens"
import {
  internalExploreURL,
  useCurrentModel,
  usePathNames,
  relationshipsURL
} from "../utils/routes"
import { useHistory } from "react-router-dom"
import { SearchResults } from "./SearchResults"

const notHidden = (explore: { hidden?: boolean }) => !explore.hidden

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

export const ExploreList: React.FC = props => {
  const history = useHistory()
  const currentModel = useCurrentModel()
  const { exploreName, isRelationships } = usePathNames()
  const [search, setSearch] = useState("")
  return (
    <Menu customizationProps={menuCustomizations}>
      <Box m="medium" mb="none">
        <Text fontWeight="extraBold" fontSize="large">
          Data Dictionary
        </Text>
      </Box>
      {props.children}
      {currentModel && (
        <>
          <Box m="medium" mb="none">
            <GlobalSearch
              placeholder="Search Model..."
              display="block"
              value={search}
              // onClear={() => setSearch("")}
              onChange={e => setSearch(e.currentTarget.value)}
            />
          </Box>
          {search.length ? (
            <SearchResults query={search} />
          ) : (
            <>
              <MenuGroup label="Information" key="model">
                <MenuItem
                  current={isRelationships}
                  key="relationships"
                  onClick={() =>
                    history.push(
                      relationshipsURL({
                        model: currentModel.name!
                      })
                    )
                  }
                >
                  Relationships
                </MenuItem>
              </MenuGroup>
              <MenuGroup label="Explores" key="explores">
                {currentModel.explores!.filter(notHidden).map(explore => (
                  <MenuItem
                    current={exploreName == explore.name}
                    key={explore.name}
                    onClick={() =>
                      history.push(
                        internalExploreURL({
                          model: currentModel.name!,
                          explore: explore.name!
                        })
                      )
                    }
                  >
                    {explore.label}
                  </MenuItem>
                ))}
              </MenuGroup>
            </>
          )}
        </>
      )}
    </Menu>
  )
}
