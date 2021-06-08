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
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  ExtendComponentsThemeProvider,
  theme,
  IconButton,
  Text,
  ProgressCircular
} from '@looker/components'
import { Delete } from '@styled-icons/material'
import styled from 'styled-components'
import { DiagrammedModel } from '../../../utils/LookmlDiagrammer'
import { QueryDataResults } from './QueryDataResults'

export interface QueryOrder {
  [field_name: string]: any
}

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

export const QueryExplorer: React.FC<{
  queryFields: QueryOrder
  diagramMetadata: DiagrammedModel
  setQueryFields: (fields: QueryOrder) => void
  queryData: any
  loadingQueryData: boolean
}> = ({ queryFields, setQueryFields, diagramMetadata, queryData, loadingQueryData }) => {
  console.log(queryData)
  return (
    <ExtendComponentsThemeProvider
      themeCustomizations={{
        colors: {
          background: theme.colors.text,
          text: theme.colors.background,
        },
      }}
    >
      <QueryExplorerPanel>
        <SpaceVertical gap="medium">
        <Tabs>
          <StyledTabs distribute>
            <Tab>Visualization</Tab>
            <Tab>Data</Tab>
            <Tab>Code</Tab>
          </StyledTabs>
          <TabPanels width='100%' overflowY='auto' height='87vh'>
            <TabPanel><StyledText>TODO: Visualization Area and Editor</StyledText></TabPanel>
            <TabPanel>
              <QueryDataResults
                queryFields={queryFields}
                queryData={queryData}
                setQueryFields={setQueryFields}
                loadingQueryData={loadingQueryData}
              />
            </TabPanel>
            <TabPanel><StyledText>TODO: CodeDisplay</StyledText></TabPanel>
          </TabPanels>
        </Tabs>
        </SpaceVertical>
      </QueryExplorerPanel>
    </ExtendComponentsThemeProvider>
  )
}
