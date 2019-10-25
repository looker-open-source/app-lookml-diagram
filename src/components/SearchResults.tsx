import React, { useMemo, useState } from "react"
import { MenuItem, Box, Text, RampSizes } from "looker-lens/dist"
import { useCurrentModel, internalExploreURL } from "../utils/routes"
import Fuse from "fuse.js"
import {
  ILookmlModel,
  ILookmlModelExploreField,
  ILookmlModelExploreFieldset
} from "@looker/sdk/dist/sdk/models"
import { useHistory } from "react-router"
import { ResponsiveValue } from "styled-system"
import styled from "styled-components"
import { useModelDetail, DetailedModel } from "../utils/fetchers"

const BlockMenuItem = styled(MenuItem)`
  button {
    display: block;
    padding-top: 3px;
    padding-bottom: 3px;
  }
`

const BlockMenuItemChild = styled(BlockMenuItem)`
  button {
    padding-left: 30px;
  }
`

interface BaseSearchResult {
  label: string
  name: string
  description?: string
}

interface ExploreSearchResult extends BaseSearchResult {
  type: "explore"
}

interface FieldSearchResult extends BaseSearchResult {
  type: "field"
  exploreNames: string[]
}

type SearchResult = FieldSearchResult | ExploreSearchResult

interface Fieldset extends ILookmlModelExploreFieldset {
  [key: string]: ILookmlModelExploreField[]
}

function computeFuse(model?: ILookmlModel, modelDetail?: DetailedModel) {
  const searchResults: SearchResult[] = []
  if (model) {
    model.explores.forEach(({ name, label, description }) => {
      searchResults.push({
        type: "explore",
        name,
        label,
        description
      })
    })
  }
  if (modelDetail) {
    const fieldMap: { [key: string]: FieldSearchResult } = {}
    modelDetail.explores.forEach(explore => {
      for (const type in explore.fields) {
        ;(explore.fields as Fieldset)[type].forEach(field => {
          if (fieldMap[field.name]) {
            fieldMap[field.name].exploreNames.push(explore.name)
          } else {
            fieldMap[field.name] = {
              type: "field",
              name: field.name,
              label: field.label,
              description: field.description,
              exploreNames: [explore.name]
            }
            searchResults.push(fieldMap[field.name])
          }
        })
      }
    })
  }

  return new Fuse(searchResults, {
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
  const modelDetail = useModelDetail(model && model.name)
  const history = useHistory()

  const fuse = useMemo(() => computeFuse(model, modelDetail), [
    model,
    modelDetail
  ])

  const results = useMemo(() => fuse.search(query, { limit: 25 }), [
    query,
    model,
    modelDetail
  ])

  const [selectedResult, setSelectedResult] = useState<
    FieldSearchResult | undefined
  >()

  return (
    <>
      {results.length > 0 && (
        <Box key="results" my="medium">
          {results.map((result, index) => {
            return (
              <React.Fragment key={index}>
                <BlockMenuItem
                  key="item"
                  onClick={() => {
                    const item = result.item
                    if (item.type == "field") {
                      if (item.exploreNames.length > 1) {
                        selectedResult
                          ? setSelectedResult(undefined)
                          : setSelectedResult(item)
                      } else {
                        history.push(
                          internalExploreURL({
                            model: model.name,
                            explore: item.exploreNames[0],
                            field: item.name
                          })
                        )
                      }
                    } else {
                      history.push(
                        internalExploreURL({
                          model: model.name,
                          explore: item.name
                        })
                      )
                    }
                  }}
                >
                  <MatchPreview matches={result.matches} item={result.item} />
                </BlockMenuItem>
                {selectedResult &&
                  selectedResult == result.item &&
                  selectedResult.exploreNames.map(explore => {
                    const exploreData = modelDetail.explores.find(
                      e => e.name == explore
                    )
                    return (
                      <BlockMenuItemChild
                        key={explore}
                        onClick={() => {
                          history.push(
                            internalExploreURL({
                              model: model.name,
                              explore,
                              field: selectedResult.name
                            })
                          )
                        }}
                      >
                        in explore &ldquo;{exploreData.label}&rdquo;
                      </BlockMenuItemChild>
                    )
                  })}
              </React.Fragment>
            )
          })}
        </Box>
      )}
      {results.length == 0 && modelDetail && (
        <Box key="no-results" m="xxxlarge" textAlign="center">
          <Text variant="subdued">No Results</Text>
        </Box>
      )}
      {!modelDetail && (
        <Box key="loading" m="xxxlarge" textAlign="center">
          <Text variant="subdued">Loading fields...</Text>
        </Box>
      )}
    </>
  )
}

const MatchPreview: React.FC<{
  matches: FuseMatch[]
  item: SearchResult
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
