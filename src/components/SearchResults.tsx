import React, { useMemo } from "react"
import { MenuGroup, MenuItem, Box, Text, RampSizes } from "looker-lens/dist"
import { useCurrentModel, internalExploreURL } from "../utils/routes"
import Fuse from "fuse.js"
import { ILookmlModel } from "@looker/sdk/dist/sdk/models"
import { useHistory } from "react-router"
import { ResponsiveValue } from "styled-system"
import styled from "styled-components"

const BlockMenuItem = styled(MenuItem)`
  button {
    display: block;
  }
`

function computeFuse(model?: ILookmlModel) {
  return new Fuse(model ? model.explores : [], {
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    threshold: 0.2,
    tokenize: true,
    maxPatternLength: 128,
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
              <BlockMenuItem
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
                <MatchPreview matches={result.matches} item={result.item} />
              </BlockMenuItem>
            )
          })}
        </MenuGroup>
      )}
      {results.length == 0 && (
        <Box m="xxxlarge" textAlign="center">
          <Text variant="subdued">No Results</Text>
        </Box>
      )}
    </>
  )
}

const MatchPreview: React.FC<{
  matches: FuseMatch[]
  item: { label?: string; description?: string }
}> = ({ matches, item }) => {
  const firstMatch = matches[0]
  if (firstMatch && firstMatch.key == "label") {
    return <SearchResultString match={firstMatch} />
  } else if (firstMatch && firstMatch.key == "description") {
    return (
      <>
        <Text fontSize="small">{item.label}</Text>
        <br />
        <SearchResultString match={firstMatch} fontSize="xsmall" />
      </>
    )
  } else {
    return <Text fontSize="small">{item.label}</Text>
  }
}

interface FuseMatch {
  indices: [number, number][]
  value: string
  key: string
  arrayIndex: number
}

const SearchResultString: React.FC<{
  match: FuseMatch
  fontSize?: ResponsiveValue<RampSizes>
}> = ({ match, fontSize }) => {
  fontSize = fontSize || "small"
  let cursor = 0
  let parts: JSX.Element[] = []
  const str = match.value
  match.indices.forEach(([start, end], i) => {
    if (cursor < start) {
      parts.push(
        <Text key={i} fontSize={fontSize}>
          {str.slice(cursor, start)}
        </Text>
      )
    }
    parts.push(
      <Text fontWeight="extraBold" fontSize={fontSize} key={`b-${i}`}>
        {str.slice(start, end)}
      </Text>
    )
    cursor = end
  })
  if (cursor < str.length) {
    parts.push(
      <Text key="end" fontSize={fontSize}>
        {str.slice(cursor, str.length)}
      </Text>
    )
  }
  return <Text fontSize={fontSize}>{parts}</Text>
}
