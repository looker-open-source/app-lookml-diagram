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

import React, { useState, SyntheticEvent } from "react"
import {
  Chip,
  Flex,
  FlexItem,
  Heading,
  Spinner,
  Select,
  Text,
  SpaceVertical,
  FieldSelect,
  Space,
  IconButton,
  ComponentsProvider,
  Page,
  Label,
  ButtonTransparent,
  Icon,
  Aside,
  Section,
  Header,
  Menu,
  MenuItem,
  MenuList,
  MenuDisclosure,
  Layout,
  FieldCheckbox,
  ButtonToggle,
  ButtonItem,
  theme
} from "@looker/components"
import styled, { ThemeProvider } from "styled-components"
import { useAllModels } from "../utils/fetchers"
import JsonViewer from "./JsonViewer"
import "./styles.css"
import { useHistory } from "react-router"
import { internalModelURL, internalExploreURL } from "../utils/routes"
import { useCurrentModel, useCurrentExplore } from "../utils/routes"

export const DontShrink = styled(SpaceVertical as any)`

  flex-shrink: 0;

  ${props => props.alignCenter ? 'align-items: center': undefined};
`


export const ExploreList = styled.ul`
  margin: 0;
`
export const ExploreListitem = styled.li`
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
`

export const ExploreButton = styled.button`
  all: inherit;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;

 
  ${Icon} {
    transform: translateX(0px);
    transition: all 500ms ease-out;
  } 

  &:hover {
    background-color: ${(props) => props.theme.colors.neutralSubtle};
    
    ${Icon} {
      transform: translateX(4px);
    }

  }

  & > * {
    pointer-events: none;
  }


`

export const PageLoading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

export const DiagramHeader = styled(Header as any)`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
  transition: transform 500ms ease-out;



  &.no-explore {
    transform: translateY(-90px);
  }

  &.has-explore {
    transform: translateY(0);

  }
`


const Rail = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  align-items: center;
`

const SettingsPanel = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  overflow-y: auto;
`

const Stage = styled(Section as any)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
`
const FauxButton = styled.button`
  all: inherit;
  width: auto;
  padding: 8px;
  border-radius: 50%;

  &:hover {
    background: ${(props) => props.theme.colors.neutralSubtle};
  }
`

const InlineSelect = styled(Space as any)`
  cursor: pointer;
`

export const LookmlDiagram: React.FC<{}> = () => {
  const history = useHistory()
  const unfilteredModels = useAllModels()
  const currentModel = useCurrentModel()
  const { currentExplore, loadingExplore } = useCurrentExplore()
  const [flowView, setFlowView] = React.useState('Sidebar')
  const [showSettings, setShowSettings] = React.useState(true)
  const [selectedExplore, setSelectedExplore] = React.useState(false)
  const [zoomLevel, setZoomLevel] = React.useState(65)
  const [isLoading, setIsLoading] = React.useState(false)

  let modelDetails = unfilteredModels && unfilteredModels.filter(d=>{ 
    return d.explores.length >= 1
  }).map(d=>{
    let numExplores = d.explores.length
    return {
      value: d.name,
      label: d.label,
      description: `${numExplores} explores`
    }
  })

  let modelData = unfilteredModels && unfilteredModels.filter(d=>{
    let modelMatch = currentModel && currentModel.name
    return d.name === modelMatch
  })

  let exploreList = currentModel && currentModel.explores.map((d)=>{
    return {
      value: d.name,
      label: d.label
    }
  })

  function showDiagram() {
    if (currentExplore && currentModel) {
      setShowSettings(false)
    }
  }

  return (
    <ComponentsProvider>
      {/* <Flex p="large">
        <FlexItem flexBasis="20%">
          <Text>Model</Text>
          <Select
            label="Model"
            options={modelDetails}
            onChange={selectedModel =>
              history.push(internalModelURL({ model: selectedModel }))
            }
          />
        </FlexItem>
        <FlexItem flexBasis="20%">
          <JsonViewer data={modelData}/>
        </FlexItem>
        <FlexItem flexBasis="20%">
          <Text>Explore</Text>
          <Select
            label="Explore"
            options={exploreList}
            onChange={(explore) => {
              history.push(
                internalExploreURL({
                  model: currentModel.name,
                  explore: explore
                })
              )
            }}
          />
        </FlexItem>
        <FlexItem flexBasis="20%">
          <JsonViewer data={currentExplore}/>
        </FlexItem>
      </Flex> */}
      <Layout hasAside height="100%">
          {flowView === 'Sidebar' && (
            <>
              <Rail width="50px">
                <SpaceVertical alignItems="center" gap="xsmall">
                  <IconButton
                    icon="GearOutline"
                    label="Settings"
                    size="large"
                    onClick={() => setShowSettings(!showSettings)}
                    toggle={showSettings}
                  />
                  <IconButton
                    icon="Dashboard"
                    label="Diagram"
                    size="large"
                    toggle={selectedExplore && !showSettings ? true : undefined}
                    onClick={showDiagram}
                  />
                </SpaceVertical>
              </Rail>
              {showSettings && (
                <SettingsPanel width="275px" px="medium" py="large">
                  <SpaceVertical>
                    <Heading fontSize="large">Diagram Settings</Heading>
                    <FieldSelect
                      options={modelDetails}
                      label="Choose Model"
                      placeholder="Select a model"
                      value={currentModel && currentModel.name}
                      onChange={(selectedModel: string) =>
                        history.push(internalModelURL({ model: selectedModel }))
                      }
                    />
                    {currentModel && (
                      <div>
                        <SpaceVertical size="xxsmall">
                          <Label>Choose an Explore</Label>
                          <ExploreList>
                            {exploreList.map((item, index) => {
                              return (
                                <ExploreListitem key={`explore-${index}`}>
                                  <ExploreButton
                                    onClick={(e: any) => {
                                      history.push(
                                        internalExploreURL({
                                          model: currentModel.name,
                                          explore: item.value
                                        })
                                      )
                                    }}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </ExploreButton>
                                </ExploreListitem>
                              )
                            })}
                          </ExploreList>
                        </SpaceVertical>
                      </div>
                    )}
                  </SpaceVertical>
                </SettingsPanel>
              )}
            </>
          )}

          <Stage>
            <DiagramHeader
              py="xsmall"
              px="large"
              className={currentExplore ? 'has-explore' : 'no-explore'}
            >
              <Space between>
                {flowView === 'List' ? (
                  <Space gap="large">
                  </Space>
                ) : (
                  <Space gap="xsmall">
                    <Heading>{currentExplore && currentExplore.label}</Heading>
                  </Space>
                )}

                <Space gap="xxsmall" justifyContent="flex-end">
                  <Menu>
                    <MenuDisclosure>
                      <ButtonTransparent iconAfter="CaretDown" color="neutral">
                        View Options
                      </ButtonTransparent>
                    </MenuDisclosure>
                    <MenuList>
                      <MenuItem>
                        <FieldCheckbox label="Hide hidden fields" />
                      </MenuItem>
                      <MenuItem>
                        <FieldCheckbox label="Show only joined fields" />
                      </MenuItem>
                    </MenuList>
                  </Menu>

                  <Menu>
                    <MenuDisclosure>
                      <ButtonTransparent iconAfter="CaretDown" color="neutral">
                        {zoomLevel}%
                      </ButtonTransparent>
                    </MenuDisclosure>
                    <MenuList>
                      <MenuItem detail="⌘+">Zoom In</MenuItem>
                      <MenuItem detail="⌘-">Zoom Out</MenuItem>
                      <MenuItem detail="⇧1">Zoom to fit</MenuItem>
                      <MenuItem>Zoom to 50%</MenuItem>
                      <MenuItem detail="⇧0">Zoom to 100%</MenuItem>
                      <MenuItem>Zoom to 200%</MenuItem>
                    </MenuList>
                  </Menu>

                  <IconButton label="" icon="CircleInfoOutline" size="large" />
                  <IconButton label="" icon="Refresh" size="large" />
                </Space>
              </Space>
            </DiagramHeader>

            {/* {flowView === 'List' && !isLoading && !selectedExplore && (
              <ListViewFlow
                models={modelOptions}
                explores={explores}
                selectedExplore={selectedExplore}
                selectedModel={selectedModel}
                setModel={handleModel}
                setExplore={selectExplore}
              />
            )} */}

            {!currentExplore && (
              <>
                <PageLoading>
                  <Spinner/>{' '}
                  <Heading mt="large">
                    Generating Diagram
                  </Heading>
                </PageLoading>
              </>
            )}

            {currentModel && currentExplore && (
              <>
                <JsonViewer data={currentExplore}/>
              </>
            )}
            
          
            
          
   
          </Stage>
        </Layout>
    </ComponentsProvider>
  )
}
