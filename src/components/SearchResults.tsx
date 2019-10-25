import React, { useMemo } from "react"
import { MenuGroup, MenuItem, Box, Text } from "looker-lens/dist"
import { useCurrentModel, internalExploreURL } from "../utils/routes"
import Fuse from "fuse.js"
import { ILookmlModel } from "@looker/sdk/dist/sdk/models"
import { useHistory } from "react-router"

function computeFuse(model?: ILookmlModel) {
  return new Fuse(model ? model.explores : [], {
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["label", "name", "description"]
  })
}

interface SearchResultsProps {
  query: string
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const model = useCurrentModel()
  const history = useHistory()

  const fuse = useMemo(() => computeFuse(model), [model])
  const results = fuse.search(query)
  console.log(results)
  return (
    <>
      {results.length > 0 && (
        <MenuGroup label="Explores" key="explores">
          {results.map(result => {
            return (
              <MenuItem
                key={result.item.name}
                onClick={() =>
                  history.push(
                    internalExploreURL({
                      model: model.name,
                      explore: result.item.name
                    })
                  )
                }
              >
                {result.matches[0].key == "label" ? (
                  <SearchResultString match={result.matches[0]} />
                ) : (
                  <>{result.item.label}</>
                )}
              </MenuItem>
            )
          })}
        </MenuGroup>
      )}
      {results.length == 0 && (
        <Box m="medium">
          <Text variant="subdued" textAlign="center">
            No Results
          </Text>
        </Box>
      )}
    </>
  )
}

interface FuseMatch {
  indices: [number, number][]
  value: string
  key: string
  arrayIndex: number
}

const SearchResultString: React.FC<{ match: FuseMatch }> = ({ match }) => {
  let cursor = 0
  let parts: JSX.Element[] = []
  const str = match.value
  match.indices.forEach(([start, end], i) => {
    if (cursor < start) {
      parts.push(
        <Text key={i} fontSize="small">
          {str.slice(cursor, start)}
        </Text>
      )
    }
    parts.push(
      <Text fontWeight="extraBold" fontSize="small" key={`b-${i}`}>
        {str.slice(start, end)}
      </Text>
    )
    cursor = end
  })
  if (cursor < str.length) {
    parts.push(
      <Text key="end" fontSize="small">
        {str.slice(cursor, str.length)}
      </Text>
    )
  }
  return <Text fontSize="small">{parts}</Text>
}
