import React, { useState } from "react";
import { Fields } from "./Fields";
import {
  Box,
  ButtonOutline,
  Flex,
  FlexItem,
  InputSearch,
} from "@looker/components";
import { ViewOptions } from './ViewOptions'
import styled from "styled-components";
import { useCurrentExplore} from "../utils/routes";
import groupBy from "lodash/groupBy"
import values from "lodash/values"
import flatten from "lodash/flatten"
import toPairs from "lodash/toPairs"
import orderBy from "lodash/orderBy"
import { ExternalLink } from "./ExternalLink";
import { exploreURL } from "../utils/urls";
import {ColumnDescriptor} from "./interfaces";
import { ILookmlModel } from "@looker/sdk";


export const Main = styled(Box)`
  position: relative;
  width: 100%;
  height: 95vh;
`;

export const ExploreSearch = styled(InputSearch)`
  margin-top: 0;
  margin-bottom: 2em;
`

export const defaultShowColumns = [
  'label_short',
  'description',
  'name',
  'type',
  'sql',
  'tags',
]


export const PanelFields: React.FC<{columns: ColumnDescriptor[], model: ILookmlModel}> = ({ columns, model }) => {
  const currentExplore = useCurrentExplore()
  const [oldExplore, setOldExplore] = useState(currentExplore)
  const [search, setSearch] = useState('')
  const [shownColumns, setShownColumns] = useState([
    'label_short',
    'description',
    'name',
    'type',
    'sql',
    'tags',
  ])

  if (currentExplore) {
    if (currentExplore !== oldExplore) {
      setSearch('')
      setOldExplore(currentExplore)
    }

    const groups = orderBy(
      toPairs(
        groupBy(
          flatten(values(currentExplore.fields)).filter(f => !f.hidden),
          f => f.view_label
        )
      ),
      ([group]) => group
    )
    return (
      <Main p="xxlarge">
        <Flex flexDirection="row" justifyContent="space-between">
          <FlexItem width="350px">
            <ExploreSearch
              hideSearchIcon
              placeholder="Filter fields in this Explore"
              mt="medium"
              onChange={e => setSearch(e.currentTarget.value)}
              value={search}
            />
          </FlexItem>
          <FlexItem>
            <ExternalLink target="_blank" href={exploreURL(currentExplore)}>
              <ButtonOutline mr="small">
                Explore
              </ButtonOutline>
            </ExternalLink>
            <ViewOptions
              columns={columns}
              shownColumns={shownColumns}
              setShownColumns={setShownColumns}
            />
          </FlexItem>
        </Flex>
        <Box>
          {groups.map(group => {
            return (
              <Fields
                columns={columns}
                explore={currentExplore}
                fields={group[1]}
                key={group[0]}
                label={group[0]}
                model={model}
                search={search}
                shownColumns={shownColumns}
              />
            )
          })
          }
        </Box>
      </Main>
    )
  } else {
    return null
  }
};
