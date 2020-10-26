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
  Chip,
  Flex,
  FlexItem,
  Heading,
  Button,
  Spinner,
  MessageBar,
  theme,
} from "@looker/components";
import humanize from 'humanize-string'
import styled, { ThemeProvider } from "styled-components";
import { useAllModels, getComments } from "../utils/fetchers";
import "./styles.css";
import { PanelFields } from "./PanelFields";
import SidebarToggle from "./SidebarToggle";
import { useCurrentModel, useCurrentExplore } from "../utils/routes"
import { ColumnDescriptor, CommentPermissions } from "./interfaces";
import { SQLSnippet } from "./SQLSnippet";
import { Sidebar } from './Sidebar'
import { CommentIcon } from './CommentIcon'
import { SidebarStyleProps } from "./interfaces";
import { NoModelsAvailable } from "./NoModelsAvailable";
import { ILookmlModelExploreField } from "@looker/sdk";
import { CategorizedLabel } from './CategorizedLabel'

export const columns: ColumnDescriptor[] = [
  {
    name: 'comment-icon',
    label: ' ',
    rowValueDescriptor: 'comment',
    formatter: (x: any, isRow: boolean, field: ILookmlModelExploreField, commentCount: number, canComment: boolean, reader: boolean) => {
      let showIcon = !reader || commentCount > 0
      if (canComment && isRow && showIcon) {
        return <CommentIcon count={commentCount}/>
      } else {
        return null
      }
    },
    maxWidth: '4em',
    default: true,
  },
  {
    name: 'field-label',
    label: 'Field Label',
    rowValueDescriptor: 'label_short',
    formatter: (x: any, isRow: boolean, field: ILookmlModelExploreField) => {
      if (field.field_group_label && field.field_group_variant) {
        return `${field.field_group_label} ${field.field_group_variant}`  
      } else {
        return x
      }
    },
    minWidth: '12em',
    default: true,
  },
  {
    name: 'category',
    label: 'Category',
    rowValueDescriptor: 'category',
    formatter: (x: any, isRow: boolean, field: ILookmlModelExploreField) => {
      return <CategorizedLabel label={x} category={field.category} />
    },
    minWidth: '10em',
    default: false,
  },
  {
    name: 'description',
    label: 'Description',
    rowValueDescriptor: 'description',
    formatter: (x: any, isRow: boolean) => {
      if (x && isRow && x.length > 200) {
        return x.substring(0, 200) + '...'
      }
      return x
    },
    minWidth: '10em',
    default: true,
  },
  {
    name: 'lookml-name',
    label: 'LookML Name',
    rowValueDescriptor: 'name',
    formatter: (x: any) => {
      return x.replace(/\./g, '.\u200B');
    },
    minWidth: '8em',
    default: true,
  },
  {
    name: 'type',
    label: 'Type',
    rowValueDescriptor: 'type',
    formatter: (x: any) => humanize(x),
    minWidth: '8em',
    default: true,
  },
  {
    label: 'SQL',
    rowValueDescriptor: 'sql',
    formatter: (x: any, isRow: boolean) => {
      return (<SQLSnippet isRow={isRow} src={x} />)
    },
    minWidth: '10em',
    name: 'sql',
    default: true,
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
    default: false,
  },
]

export const DataDictionary: React.FC<{}> = () => {
  const unfilteredModels = useAllModels()
  const currentModel = useCurrentModel()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const { currentExplore, loadingExplore } = useCurrentExplore()
  const { comments, authors, me, permissions, addComment, editComment, deleteComment } = getComments(currentExplore)
  
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
      <div style={{minWidth: "1200px"}}>
        <PageHeader>
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
              currentModel={currentModel}
              loadingExplore={loadingExplore}
              model={currentModel}
              comments={comments}
              addComment={addComment}
              editComment={editComment}
              deleteComment={deleteComment}
              authors={authors}
              me={me}
              permissions={permissions}
            />
          </PageContent>
        </PageLayout>
      </div>
    </ThemeProvider>
  );
}

// @ts-ignore
const PageHeader = styled(Flex)`
  background-color: ${theme.colors.key};
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: 836px 120px;
  padding: ${theme.space.large};
  background-image: url('https://marketplace-api.looker.com/app-assets/spirals.png');

  h1 {
    color: ${theme.colors.keyText};
  }
`;

// @ts-ignore
const PageLayout = styled.div<SidebarStyleProps>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ open }) =>
    open ? "16.625rem 0 1fr" : "1.5rem 0 1fr"};
  grid-template-areas: "sidebar divider main";
  position: relative;
`;

// @ts-ignore
const PageContent = styled.div`
  grid-area: main;
  position: relative;
`;

// @ts-ignore
const LayoutSidebar = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 16.625rem;
  grid-area: sidebar;
  z-index: 0;
`;

// @ts-ignore
const SidebarDivider = styled.div<SidebarStyleProps>`
  transition: border 0.3s;
  border-left: 1px solid
    ${({ theme, open }) =>
      open ? theme.colors.ui2 : "transparent"};
  grid-area: divider;
  overflow: visible;
  position: relative;
  &:hover {
    border-left: 1px solid
      ${({ theme, open }) =>
        open
          ? theme.colors.ui2
          : theme.colors.ui4};
  }
`;
