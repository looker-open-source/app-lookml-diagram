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

import React, { PureComponent, useState } from "react";
import {
  Chip,
  Flex,
  FlexItem,
  Heading,
  Spinner,
  theme,
} from "@looker/components";
import humanize from 'humanize-string'
import styled, { ThemeProvider } from "styled-components";
import { useAllModels } from "../utils/fetchers";
import "./styles.css";
import { PanelFields } from "./PanelFields";
import SidebarToggle from "./SidebarToggle";
import Spirals from "../images/spirals.png";
import "./styles.css";
import { useCurrentModel, useCurrentExplore } from "../utils/routes"
import { ColumnDescriptor } from "./interfaces";
import { SQLSnippet } from "./SQLSnippet";
import { Sidebar } from './Sidebar'
import { SidebarStyleProps } from "./interfaces";
import { NoModelsAvailable } from "./NoModelsAvailable";

export const columns: ColumnDescriptor[] = [
  {
    name: 'field-label',
    label: 'Field Label',
    rowValueDescriptor: 'label_short',
    formatter: (x: any) => x,
  },
  {
    name: 'description',
    label: 'Description',
    rowValueDescriptor: 'description',
    formatter: (x: any) => x,
  },
  {
    name: 'lookml-name',
    label: 'LookML Name',
    rowValueDescriptor: 'name',
    formatter: (x: any) => x,
  },
  {
    name: 'type',
    label: 'Type',
    rowValueDescriptor: 'type',
    formatter: (x: any) => humanize(x),
  },
  {
    name: 'sql',
    label: 'SQL',
    rowValueDescriptor: 'sql',
    formatter: (x: any) => <SQLSnippet src={x} />
  },
  {
    name: 'tags',
    label: 'Tags',
    rowValueDescriptor: 'tags',
    formatter: (tags: any) => {
      return tags.map((tag: string) => (
        <Chip disabled>{tag}</Chip>
      ))
    },
  },
]

export const DataDictionary: React.FC<{}> = () => {
  const unfilteredModels = useAllModels()
  const currentModel = useCurrentModel()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const { currentExplore, loadingExplore } = useCurrentExplore()

  let models

  if (unfilteredModels) {
    models = unfilteredModels.filter(m => m.explores && m.explores.some(e => !e.hidden))
    if (!models.length) {
      return <NoModelsAvailable />
    }
  }

  if (!models) {
    return <Flex alignItems="center" height="100%" justifyContent="center"><Spinner /></Flex>
  }

  const toggleFn = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider theme={theme}>
      <PageHeader style={{ backgroundImage: "url(" + Spirals + ")" }}>
        <FlexItem>
          <Heading as="h1" fontSize="xlarge" fontWeight="semiBold" mb="xsmall">
            Data Dictionary
          </Heading>
        </FlexItem>
      </PageHeader>
      <PageLayout open={sidebarOpen}>
        <LayoutSidebar>
          {sidebarOpen && <Sidebar
            currentExplore={currentExplore}
            currentModel={currentModel}
            loadingExplore={loadingExplore}
            models={models}
            search={search}
            setSearch={setSearch}
          />}
        </LayoutSidebar>
        <SidebarDivider open={sidebarOpen}>
          <SidebarToggle
            isOpen={sidebarOpen}
            onClick={toggleFn}
            headerHeight="114px"
          />
        </SidebarDivider>
        <PageContent>
          <PanelFields
            columns={columns}
            currentExplore={currentExplore}
            loadingExplore={loadingExplore}
            model={currentModel}
          />
        </PageContent>
      </PageLayout>
    </ThemeProvider>
  );
}


const PageHeader = styled(Flex)`
  background-color: ${theme.colors.palette.purple400};
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: 836px 120px;
  padding: ${theme.space.large};

  h1 {
    color: ${theme.colors.palette.white};
  }
`;

const PageLayout = styled.div<SidebarStyleProps>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ open }) =>
    open ? "16.625rem 0 1fr" : "1.5rem 0 1fr"};
  grid-template-areas: "sidebar divider main";
  position: relative;
`;

const PageContent = styled.div`
  grid-area: main;
  position: relative;
`;

const LayoutSidebar = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16.625rem;
  grid-area: sidebar;
  z-index: 0;
`;

const SidebarDivider = styled.div<SidebarStyleProps>`
  transition: border 0.3s;
  border-left: 1px solid
    ${({ theme, open }) =>
      open ? theme.colors.palette.charcoal200 : "transparent"};
  grid-area: divider;
  overflow: visible;
  position: relative;
  &:hover {
    border-left: 1px solid
      ${({ theme, open }) =>
        open
          ? theme.colors.palette.charcoal300
          : theme.colors.palette.charcoal200};
  }
`;

