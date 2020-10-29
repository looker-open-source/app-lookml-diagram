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

import React from "react"
import {
  Box,
  Flex,
  FlexItem,
  Heading,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableBody,
  theme
} from "@looker/components"
import styled from "styled-components"
import { ColumnDescriptor, CommentPermissions } from "./interfaces"
import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField,
  IUser
} from "@looker/sdk"
import { DetailDrawer } from "./DetailDrawer"
import { DETAILS_PANE } from "../utils/constants"

export const TableWrapper = styled(Box as any)`
  border-bottom: 0.5px solid ${theme.colors.ui2};

  &:last-child {
    border-bottom: none;
  }
`

// Sticky Table Header
export const StickyHeader = styled(TableHeaderCell as any)`
  @supports (position: sticky) {
    position: sticky;
    top: 0;
  }
`

export const Fields: React.FC<{
  columns: ColumnDescriptor[]
  explore: ILookmlModelExplore
  label: string
  model: ILookmlModel
  fields: ILookmlModelExploreField[]
  search: string
  shownColumns: string[]
  comments: string
  addComment: (newCommentStr: string, field: string) => void
  editComment: (newCommentStr: string, field: string) => void
  deleteComment: (newCommentStr: string, field: string) => void
  authors: IUser[]
  me: IUser
  permissions: CommentPermissions
}> = ({
  columns,
  explore,
  label,
  fields,
  model,
  search,
  shownColumns,
  comments,
  addComment,
  editComment,
  deleteComment,
  authors,
  me,
  permissions
}) => {
  const [tab, setTab] = React.useState(DETAILS_PANE)
  return (
    <TableWrapper p="xxlarge">
      <Flex>
        <FlexItem>
          <Heading as="h2" fontWeight="semiBold" mb="large">
            {label}
          </Heading>
        </FlexItem>
      </Flex>
      <Flex flexDirection="column">
        <Table width="100%">
          <TableHead>
            <TableRow>
              {columns.map(column => {
                if (shownColumns.includes(column.rowValueDescriptor)) {
                  return (
                    <StickyHeader
                      key={column.label}
                      backgroundColor="ui1"
                      fontWeight="medium"
                      color="text"
                      fontSize="small"
                      p="medium"
                      pl="small"
                    >
                      {column.label}
                    </StickyHeader>
                  )
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody fontSize="small">
            {fields.map(field => {
              if (
                !search ||
                (field.label_short &&
                  field.label_short
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (field.description &&
                  field.description
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (field.field_group_label &&
                  field.field_group_label
                    .toLowerCase()
                    .includes(search.toLowerCase()))
              ) {
                return (
                  <DetailDrawer
                    field={field}
                    columns={columns}
                    explore={explore}
                    key={field.name}
                    model={model}
                    shownColumns={shownColumns}
                    tab={tab}
                    setTab={setTab}
                    comments={comments}
                    addComment={addComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    authors={authors}
                    me={me}
                    permissions={permissions}
                  />
                )
              }
            })}
          </TableBody>
        </Table>
      </Flex>
    </TableWrapper>
  )
}
