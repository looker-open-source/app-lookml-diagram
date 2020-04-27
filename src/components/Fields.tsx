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

import React from "react";
import {
  Flex,
  FlexItem,
  Heading,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody
} from "@looker/components";
import styled from "styled-components";

import {ILookmlModel, ILookmlModelExplore, ILookmlModelExploreField} from "@looker/sdk";
import {ColumnDescriptor} from "./interfaces";
import { DetailDrawer } from "./DetailDrawer";

const FieldSet = styled.div`
  margin-bottom: 20px
`

export const Fields: React.FC<{
  columns: ColumnDescriptor[],
  explore: ILookmlModelExplore,
  label: String,
  model: ILookmlModel,
  fields: ILookmlModelExploreField[],
  search: string,
  shownColumns: string[],
}> = ({ columns, explore, label, fields, model, search, shownColumns }) => {
  return (
    <FieldSet>
      <Flex>
        <FlexItem>
        <Heading as="h2" fontWeight="semiBold">
          { label }
        </Heading>
      </FlexItem>
      </Flex>
      <Flex flexDirection="column">
        <Table width="100%">
          <TableHead>
            <TableRow>
              { columns.map(column => {
                if (shownColumns.includes(column.rowValueDescriptor)) {
                  return (
                    <TableHeaderCell
                      key={column.label}
                      color="palette.charcoal900"
                      pl="small"
                      pr="medium"
                    >
                      { column.label }
                    </TableHeaderCell>
                  )
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody fontSize="small">
            {fields.map((field) => {
              if (!search ||
                  (field.label_short && field.label_short.toLowerCase().includes(search.toLowerCase())) ||
                  (field.description && field.description.toLowerCase().includes(search.toLowerCase()))) {
                return (
                  <DetailDrawer
                    field={field}
                    columns={columns}
                    explore={explore}
                    key={field.name}
                    model={model}
                    shownColumns={shownColumns}
                  />
                )
              }
            })}
          </TableBody>
        </Table>
      </Flex>
    </FieldSet>
  );
};
