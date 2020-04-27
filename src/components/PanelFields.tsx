/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { useState } from "react";
import { Fields } from "./Fields";
import {
  Box,
  ButtonOutline,
  Flex,
  FlexItem,
  InputSearch,
  Spinner,
} from "@looker/components";
import { ViewOptions } from './ViewOptions'
import styled from "styled-components";
import groupBy from "lodash/groupBy"
import values from "lodash/values"
import flatten from "lodash/flatten"
import toPairs from "lodash/toPairs"
import orderBy from "lodash/orderBy"
import { ExternalLink } from "./ExternalLink";
import { exploreURL } from "../utils/urls";
import {ColumnDescriptor} from "./interfaces";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk";

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


export const PanelFields: React.FC<{
  columns: ColumnDescriptor[],
  currentExplore: ILookmlModelExplore | null,
  loadingExplore: string,
  model: ILookmlModel}
> = ({ columns, currentExplore, loadingExplore, model }) => {

  const [search, setSearch] = useState('')
  const [shownColumns, setShownColumns] = useState([
    'label_short',
    'description',
    'name',
    'type',
    'sql',
    'tags',
  ])

  if (loadingExplore) {
    return (
      <Main p="xxlarge">
        <Flex alignItems="center" height="100%" justifyContent="center"><Spinner /></Flex>
      </Main>
    )
  }

  if (currentExplore) {
    if (loadingExplore && search) {
      setSearch('')
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
    return <Main p="xxlarge" />
  }
};
