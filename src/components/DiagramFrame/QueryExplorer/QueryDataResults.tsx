/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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

import React from 'react'
import {
  SpaceVertical,
  Aside,
  DataTableColumns,
  TabList,
  DataTable,
  DataTableItem,
  DataTableCell,
  Text,
  Heading,
  ProgressCircular
} from '@looker/components'
import { Delete } from '@styled-icons/material'
import styled from 'styled-components'
import { DiagrammedModel } from '../../../utils/LookmlDiagrammer'

export interface QueryOrder {
  [field_name: string]: any
}

export const QueryExplorerPanel = styled(Aside)`
  border-left: solid 1px ${props => props.theme.colors.ui2};
  overflow-y: auto;
  background-color: ${props => props.theme.colors.background};
  z-index: 0;
`
QueryExplorerPanel.defaultProps = {
  width: `700px`,
  px: 'medium',
  py: 'large'
}

const StyledTabs = styled(TabList)`
  width: 100%;
`
const StyledText = styled(Text)`
  color: ${props => props.theme.colors.text};
`

export const QueryDataResults: React.FC<{
  queryFields: QueryOrder
  setQueryFields: (fields: QueryOrder) => void
  queryData: any
  loadingQueryData: boolean
}> = ({ queryFields, setQueryFields, queryData, loadingQueryData }) => {
  const fieldList = Object.keys(queryFields)
  if (!queryData && !loadingQueryData) {
    return (<SpaceVertical align="center"><Heading>No Data</Heading></SpaceVertical>)
  }
  if (loadingQueryData) {
    return (<SpaceVertical align="center"><ProgressCircular /></SpaceVertical>)
  }
  const queryColumns: DataTableColumns = fieldList.map((field) => {
    return {
      id: field,
      title: field,
      type: 'string'
    }
  })
  const items = queryData.map((d: any, i: number) => {
    return (
      <DataTableItem
        key={i}
        id={String(i)}
      >
        {fieldList.map(field => (
          <DataTableCell>{d[field]}</DataTableCell>
        ))}
      </DataTableItem>
    )
  })
  return (
    <DataTable caption="Cheeses example" columns={queryColumns}>
      {items}
    </DataTable>
  )
}
