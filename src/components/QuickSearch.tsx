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
  Button,
  ButtonGroup,
  ButtonItem,
  ButtonOutline,
  Flex,
  FlexItem,
  Heading,
  IconButton,
  InputSearch,
  Spinner,
  theme,
} from "@looker/components";
import styled from "styled-components";


export const Main = styled(Box)`
  border-radius: 0.25rem;
  min-height: 1.2em;
  padding 0.2em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
`;

export const FilterHeading = styled(Heading)`
  margin-bottom: 0.4em;
  color: ${theme.colors.palette.charcoal500};
`;

export const Group = styled(FlexItem)`
  margin-right: 1.2em;
`

export const QuickSearch: React.FC<{
  deselectedFields: string[]
  fields: string[]
  fieldTypes: string[]
  hasDescription: string[]
  hasTags: string[]
  setDeselectedFields: (fields: string[]) => void
  setFieldTypes: (fieldTypes: string[]) => void
  setHasDescription: (hasDescription: string[]) => void
  setHasTags: (hasTags: string[]) => void
}> = ({
  deselectedFields,
  fields,
  fieldTypes,
  hasDescription,
  hasTags,
  setDeselectedFields,
  setFieldTypes,
  setHasDescription,
  setHasTags,
}) => {
  const newDeselected = (deselected: string[]) => {
    /* This is a little awkward and feels inside out because
    in PanelFields we have to declare the state and setter before
    we are able to access all the field types (because hook order matters),
    so instead of tracking fields in state we track which ones have
    been deselected, allowing us to start with an empty array.
     */
    const missing = fields.filter(f => !deselected.includes(f))
    setDeselectedFields(missing)
  }

  return (
    <Main>
      <Flex flexDirection="row" flexWrap="wrap" mt="xlarge" pl="xxlarge" pr="xxlarge">
        <Group>
          <FilterHeading as="h6">Has Description</FilterHeading>
          <ButtonGroup value={hasDescription} onChange={setHasDescription}>
            <ButtonItem value={"yes"}>Yes</ButtonItem>
            <ButtonItem value={"no"}>No</ButtonItem>
          </ButtonGroup>
        </Group>

        <Group>
          <FilterHeading as="h6">Fields</FilterHeading>
          <ButtonGroup value={fieldTypes} onChange={setFieldTypes}>
            <ButtonItem value="dimensions">Dimension</ButtonItem>
            <ButtonItem value="measures">Measure</ButtonItem>
          </ButtonGroup>
        </Group>

        <Group>
          <FilterHeading as="h6">Has Tags</FilterHeading>
          <ButtonGroup value={hasTags} onChange={setHasTags}>
            <ButtonItem value="yes">Yes</ButtonItem>
            <ButtonItem value="no">No</ButtonItem>
          </ButtonGroup>
        </Group>

        <Group>
          <FilterHeading as="h6">Type</FilterHeading>
          <ButtonGroup value={fields.filter(f => !deselectedFields.includes(f))} onChange={newDeselected}>
            { fields.map(field => {
              return (
                <ButtonItem key={field} value={field}>{ field }</ButtonItem>
              )
            })}
          </ButtonGroup>
        </Group>

      </Flex>
    </Main>
  )
}
