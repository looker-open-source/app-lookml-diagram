import React, { PureComponent, useState } from "react";
import {
  Chip,
  FieldSelect,
  Flex,
  FlexItem,
  Heading,
  InputSearch,
  Spinner,
  theme,
} from "@looker/components";
import styled, { ThemeProvider } from "styled-components";
import { useAllModels } from "../utils/fetchers";
import "./styles.css";
import { PanelFields } from "./PanelFields";
import SidebarToggle from "./SidebarToggle";
import Spirals from "../images/spirals.png";
import "./styles.css";
import { internalModelURL, useCurrentModel } from "../utils/routes"
import { useHistory } from "react-router"
import { iColumnDescriptor } from "./interfaces";
import { ExploreList } from "./ExploreList";
import { SQLSnippet } from "./SQLSnippet";


const columns: iColumnDescriptor[] = [
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
    rowValueDescriptor: 'category',
    formatter: (x: any) => x,
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
  const models = useAllModels()
  const currentModel = useCurrentModel()
  const history = useHistory()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [search, setSearch] = React.useState('')

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
          {sidebarOpen && (
            <Flex flexDirection="column" pt="xxlarge" pb="xxlarge">
              <FlexItem
                borderBottom={`1px solid ${theme.colors.palette.charcoal200}`}
                ml="large"
                mr="xlarge"
                pb="xsmall"
              >
                <FieldSelect
                  name="select-model"
                  label="Select a Model"
                  labelFontSize="xsmall"
                  labelFontWeight="normal"
                  options={models
                    .filter(m => m.explores && m.explores.some(e => !e.hidden))
                    .map(m => ({ value: m.name, label: m.label }))}
                  onChange={selectedModel =>
                    history.push(internalModelURL({ model: selectedModel }))
                  }
                  value={currentModel && currentModel.name}
                />
              </FlexItem>
              <FlexItem ml="large" mr="xlarge" pt="medium">
                <Heading
                  as="h5"
                  color="palette.charcoal900"
                  fontWeight="semiBold"
                >
                  Explores
                </Heading>
                <InputSearch
                  hideSearchIcon
                  placeholder="Search Model"
                  mt="medium"
                  onChange={e => setSearch(e.currentTarget.value)}
                  value={search}
                />
              </FlexItem>
              <ExploreList
                search={search}
              />
            </Flex>
          )}
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
            model={currentModel}
          />
        </PageContent>
      </PageLayout>
    </ThemeProvider>
  );
}


interface SidebarStyleProps {
  open: boolean;
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

