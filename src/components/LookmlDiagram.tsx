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
  Button,
  SpaceVertical,
  FieldSelect,
  Space,
  IconButton,
  ComponentsProvider,
  Page,
  Label,
  ButtonTransparent,
  Icon,
  Box,
  Paragraph,
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
import { SelectionInfoPacket } from "./interfaces"
import { useAllModels, getExtLog } from "../utils/fetchers"
import JsonViewer from "./JsonViewer"
import "./styles.css"
import { useHistory } from "react-router"
import { internalModelURL, internalExploreURL } from "../utils/routes"
import { useCurrentModel, useSelectExplore } from "../utils/routes"
import MetadataPanel from "./MetadataPanel"
import Diagram from "./Diagram"

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


const FullPage = styled(Box as any)`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 93vh;
  flex-direction: column;
`

const IntroText = styled(Paragraph as any)`
  text-align: center;
  margin-top: 5em;
  max-width: 40%;
  color: ${theme.colors.text1};
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
    background-color: ${(props) => props.theme.colors.keySubtle};
    
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
  position: relative;
  z-index: 1;


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
  z-index: 1;
`

const SettingsPanel = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  overflow-y: auto;
  z-index: 1;
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

export const LookmlDiagram: React.FC<{metaBuffer: any[]}> = ({metaBuffer}) => {
  const history = useHistory()
  const { extensionLog, extensionLogger, extensionPersistDiagram } = getExtLog()
  const unfilteredModels = useAllModels()
  const currentModel = useCurrentModel()
  const { details, exploreName, metadata, dimensions } = useSelectExplore(extensionLog.diagramPersist || {})
  const [showSettings, setShowSettings] = React.useState(true)
  const [reload, setReload] = React.useState(false)
  const [showGit, setShowGit] = React.useState(false)
  const [showExploreInfo, setShowExploreInfo] = React.useState(false)
  const [selectedExplore, setSelectedExplore] = React.useState(false)
  const [selectionInfo, setSelectionInfo] = React.useState<SelectionInfoPacket>({})

  metadata.explore && metaBuffer.push(metadata)

  function isExample(modelName: string) {
    return true
    // let allowed = ["pollooker", "2020-election-betting", "covid", "braintree"]
    // return allowed.includes(modelName)
  }

  let modelDetails = unfilteredModels && unfilteredModels.filter(d=>{ 
    return d.explores.length >= 1 && isExample(d.name)
  }).map(d=>{
    let numExplores = d.explores.length
    return {
      value: d.name,
      label: d.label
    }
  })

  let modelData = unfilteredModels && unfilteredModels.filter(d=>{
    let modelMatch = currentModel && currentModel.name
    return d.name === modelMatch
  })

  let currentExplore = details && details.explores.filter(d=>{
    return d.name === exploreName
  })[0]

  let currentDimensions = dimensions && dimensions.filter((d: any)=>{
    return d.exploreName === exploreName
  })[0]

  let exploreList = currentModel && currentModel.explores.map((d)=>{
    return {
      value: d.name,
      label: d.label
    }
  })

  function showDiagram() {
    setShowSettings(false)
    setShowGit(false)
    return true
  }

  function saveLog() {
    extensionLogger(metaBuffer)
    metaBuffer.length = 0;
    console.log("total log entries:", extensionLog.diagramLog.length, extensionLog)
  }
  function toggleReload() {
    if (currentExplore && currentModel) {
      setReload(!reload)
      let exploreName = currentExplore.name
      let initialPersist = extensionLog.diagramPersist || {}
      let explorePersist = initialPersist[exploreName] || {}
      explorePersist[exploreName] = {}
      extensionPersistDiagram({...extensionLog.diagramPersist, ...explorePersist})
    }
  }
  function toggleExploreInfo() {
    if (currentExplore && currentModel) {
      Object.keys(selectionInfo).length === 0 || selectionInfo.lookmlElement !== "explore"
      ? setSelectionInfo({
        lookmlElement: "explore"
      })
      : setSelectionInfo({})
    }
  }

  function buttonShade(exploreNameSel: string) {
    if (currentExplore && currentExplore.name === exploreNameSel) {
      return theme.colors.keySubtle
    }
    return undefined
  }

  return (
    <ComponentsProvider>
      <Layout hasAside height="100%">
        <Rail width="50px">
          <SpaceVertical alignItems="center" gap="xsmall">
            <IconButton
              icon="Dashboard"
              label="Diagram"
              tooltipPlacement="right"
              size="large"
              toggle={selectedExplore && !showSettings ? true : undefined}
              onClick={showDiagram}
              style={{color: !showGit && !showSettings && theme.colors.key, 
                backgroundColor: !showGit && !showSettings && theme.colors.keySubtle,
                borderTopRightRadius: "25px", borderBottomRightRadius: "25px"}}
            />
            <IconButton
              icon="GearOutline"
              label="Settings"
              tooltipPlacement="right"
              size="large"
              onClick={() => showDiagram() && setShowSettings(!showSettings)}
              toggle={showSettings}
              style={{color: showSettings && theme.colors.key, 
                backgroundColor: showSettings && theme.colors.keySubtle,
                borderTopRightRadius: "25px", borderBottomRightRadius: "25px"}}
            />
            <IconButton
              icon="GitBranch"
              label="Git"
              tooltipPlacement="right"
              size="large"
              onClick={() => showDiagram() && setShowGit(!showGit)}
              toggle={showGit}
              style={{color: showGit && theme.colors.key, 
                backgroundColor: showGit && theme.colors.keySubtle,
                borderTopRightRadius: "25px", borderBottomRightRadius: "25px"}}
            />
            <IconButton
              icon="Api"
              label={`Save Log (${metaBuffer.length})`}
              tooltipPlacement="right"
              size="large"
              onClick={()=>{saveLog()}}
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
                          <ExploreListitem key={`explore-${index}`} style={{backgroundColor: buttonShade(item.value)}}>
                            <ExploreButton
                              onClick={(e: any) => {
                                selectionInfo.lookmlElement === "explore" || setSelectionInfo({})
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
        {showGit && (
          <SettingsPanel width="275px" px="medium" py="large">
            <SpaceVertical>
              <Heading fontSize="large">Git Actions</Heading>
              <FieldSelect
                options={[{value:"master",label:"master"}]}
                label="Current Branch"
                // placeholder="Select a model"
                value={"master"}
              />
              <Button
              onClick={(e: any) => {
                let exploreName = currentExplore.name
                let initialPersist = extensionLog.diagramPersist || {}
                let diagramData = dimensions.filter((d:any,i:number)=>{
                  return d.exploreName === exploreName
                })[0]
                let explorePersist = initialPersist[exploreName] || {}
                explorePersist[exploreName] = {}
                let diagramViews = Object.keys(diagramData.diagramDict)
                diagramViews.map((d:any,i:number)=>{
                  const nonViews = ["_joinData"]
                  if (nonViews.includes(d)) { return }
                  let elementSel = document.getElementsByClassName("table-"+d)[0].getBoundingClientRect()
                  console.log(elementSel)
                  explorePersist[exploreName][d] = {x: elementSel.left, y: elementSel.top}
                })
                extensionPersistDiagram({...extensionLog.diagramPersist, ...explorePersist})
              }}>Save Layout</Button>
            </SpaceVertical>
          </SettingsPanel>
        )}
        <Stage>
          <DiagramHeader
            py="xsmall"
            px="large"
            className={currentExplore ? 'has-explore' : 'no-explore'}
          >
            <Space between>
              <Space gap="xsmall">
                <Heading as="h1">{currentExplore && currentExplore.label}</Heading>
              </Space>
              <Space gap="xxsmall" justifyContent="flex-end">
                <IconButton 
                  label="" 
                  icon="CircleInfoOutline" 
                  onClick={toggleExploreInfo}
                  style={{color: selectionInfo.lookmlElement === "explore" && theme.colors.key, 
                    backgroundColor: selectionInfo.lookmlElement === "explore" && theme.colors.keySubtle,
                    borderRadius: "25px"}}
                  size="large" 
                />
                <IconButton label="" icon="Refresh" size="large" onClick={toggleReload} />
              </Space>
            </Space>
          </DiagramHeader>
          <Layout hasAside height="100%" id="DiagramStage">
          <Stage>
          {!currentExplore && !exploreName && (
              <FullPage>
                <div style={{ width: "30%" }}>
                  <img
                    src={
                      "https://marketplace-api.looker.com/app-assets/data_dictionary_2x.png"
                    }
                    alt="Empty Image"
                  />
                </div>
                <IntroText>
                  Select a model and click on one of the Explores to the left to begin visualizing your LookML model. You’ll see views, joins, SQL definitions, and more
                  for each object.
                </IntroText>
              </FullPage>
          )}
          {currentModel && !currentExplore && exploreName && (
            <PageLoading>
              <Spinner/>{' '}
              <Heading mt="large">
                Generating Diagram
              </Heading>
            </PageLoading>
          )}
          {!currentModel && !currentExplore && (
            <PageLoading>
              <Spinner/>{' '}
              <Heading mt="large">
                Loading Extension
              </Heading>
            </PageLoading>
          )}
          {currentModel && currentExplore && (
            // <JsonViewer data={currentExplore}/>
            <Diagram dimensions={currentDimensions} explore={currentExplore} reload={reload} setSelectionInfo={setSelectionInfo}/>
          )}
          </Stage>
          {currentExplore && Object.keys(selectionInfo).length > 0 && (
            <MetadataPanel
              explore={currentExplore}
              selectionInfo={selectionInfo}
            />
          )}
          </Layout>
        </Stage>
        </Layout>
    </ComponentsProvider>
  )
}
