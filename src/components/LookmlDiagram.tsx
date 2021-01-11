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
  Divider,
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
  Grid,
  ButtonTransparent,
  Icon,
  Box,
  Popover,
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
  RadioGroup,
  ButtonToggle,
  Tooltip,
  ButtonItem,
  theme,
  FieldRadioGroup,
  FieldToggleSwitch
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
import { VIEW_OPTIONS_HIDDEN_DEFAULT, VIEW_OPTIONS_FIELDS_DEFAULT, NONVIEWS } from '../utils/constants'

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

export const ViewList = styled.ul`
  margin: 0;
`
export const ViewListItem = styled.li`
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

export const ViewButton = styled.button`
  all: inherit;
  font-size: ${(props) => props.theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;

  :hover {
    background-color: ${(props) => props.theme.colors.keySubtle};
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
  const [hiddenToggle, setHiddenToggle] = React.useState(VIEW_OPTIONS_HIDDEN_DEFAULT)
  const [displayFieldType, setDisplayFieldType] = React.useState(VIEW_OPTIONS_FIELDS_DEFAULT)
  const { details, exploreName, metadata, dimensions } = useSelectExplore(extensionLog.diagramPersist || {}, hiddenToggle, displayFieldType)
  const [showSettings, setShowSettings] = React.useState(true)
  const [reload, setReload] = React.useState(false)
  const [showGit, setShowGit] = React.useState(false)
  const [showExploreInfo, setShowExploreInfo] = React.useState(false)
  const [selectedExplore, setSelectedExplore] = React.useState(false)
  const [selectionInfo, setSelectionInfo] = React.useState<SelectionInfoPacket>({})
  const [viewOptionsOpen, setViewOptionsOpen] = React.useState(false)
  const [viewVisible, setViewVisible] = React.useState<any>({})

  metadata.explore && metaBuffer.push(metadata)

  const handleHiddenToggle = (event: any) => setHiddenToggle(event.target.checked)

  function isExample(modelName: string) {
    return true
    // let allowed = ["pollooker", "2020-election-betting", "covid", "braintree"]
    // return allowed.includes(modelName)
  }

  let modelDetails = unfilteredModels && unfilteredModels.filter(d=>{ 
    return d.explores.length >= 1 && isExample(d.name)
  }).map(d=>{
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

  let defaultViews: any = {}
  Object.keys(viewVisible).length === 0 && currentExplore && currentDimensions && Object.keys(currentDimensions.diagramDict)
  .map((lookmlViewName: string)=>{
    if (NONVIEWS.includes(lookmlViewName)) { return }
    defaultViews[lookmlViewName] = true
  })
  Object.keys(viewVisible).length === 0 && currentExplore && currentDimensions && setViewVisible(defaultViews)

  function showDiagram() {
    setViewOptionsOpen(false)
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
    setHiddenToggle(VIEW_OPTIONS_HIDDEN_DEFAULT)
    setDisplayFieldType(VIEW_OPTIONS_FIELDS_DEFAULT)
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
    if (exploreName === exploreNameSel) {
      return theme.colors.keySubtle
    }
    return undefined
  }

  function viewDisabled(disabled: boolean) {
    if (!disabled) {
      return theme.colors.text1
    }
    return undefined
  }

  return (
    <ComponentsProvider>
      <Layout hasAside height="100%">
        <Rail width="50px">
          <SpaceVertical style={{alignItems: "center"}} alignItems="center" gap="xsmall">
            <IconButton
              icon="Dashboard"
              label="Diagram"
              tooltipPlacement="right"
              size="large"
              toggle={selectedExplore && !showSettings ? true : undefined}
              onClick={showDiagram}
              style={{color: !viewOptionsOpen && !showGit && !showSettings && theme.colors.key, 
                backgroundColor: !viewOptionsOpen && !showGit && !showSettings && theme.colors.keySubtle,
                borderRadius: "10px"}}
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
                borderRadius: "10px"}}
            />
            <IconButton
              icon="Tune"
              label="View Options"
              tooltipPlacement="right"
              size="large"
              onClick={() => showDiagram() && setViewOptionsOpen(!viewOptionsOpen)}
              toggle={viewOptionsOpen}
              style={{color: viewOptionsOpen && theme.colors.key, 
                backgroundColor: viewOptionsOpen && theme.colors.keySubtle,
                borderRadius: "10px"}}
            />
            {/* <IconButton
              icon="GitBranch"
              label="Git"
              tooltipPlacement="right"
              size="large"
              onClick={() => showDiagram() && setShowGit(!showGit)}
              toggle={showGit}
              style={{color: showGit && theme.colors.key, 
                backgroundColor: showGit && theme.colors.keySubtle,
                borderRadius: "10px"}}
            /> */}
            {/* <IconButton
              icon="Api"
              label={`Save Log (${metaBuffer.length})`}
              tooltipPlacement="right"
              size="large"
              onClick={()=>{saveLog()}}
            /> */}
          </SpaceVertical>
        </Rail>
        {showSettings && (
          <SettingsPanel width="275px" px="medium" py="large">
            <SpaceVertical>
              <Heading fontSize="large">Diagram Settings</Heading>
              <FieldSelect
                options={modelDetails}
                label="Choose a Model"
                placeholder="Select a model"
                value={currentModel && currentModel.name}
                onChange={(selectedModel: string) =>
                  history.push(internalModelURL({ model: selectedModel }))
                }
              />
              {currentModel && (
                <div>
                  <SpaceVertical size="xxsmall">
                    <Label>Select an Explore</Label>
                    <ExploreList>
                      {exploreList.map((item, index) => {
                        return (
                          <ExploreListitem key={`explore-${index}`} style={{backgroundColor: buttonShade(item.value)}}>
                            <ExploreButton
                              onClick={(e: any) => {
                                selectionInfo.lookmlElement === "explore" || setSelectionInfo({})
                                setViewVisible({})
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
            </SpaceVertical>
          </SettingsPanel>
        )}
        {viewOptionsOpen && (
          <SettingsPanel width="275px" px="medium" py="large">
            <SpaceVertical>
              <Heading fontSize="large">View Options</Heading>
              <Flex width="250px" flexDirection="column">
                <FlexItem pb="small">
                  <Label>Fields to Display</Label>
                  <RadioGroup 
                    pt="small" 
                    name="fieldScopeSelection" 
                    value={displayFieldType}
                    onChange={setDisplayFieldType}
                    options={[{label: "All fields", value: "all"}, {label: "Fields with joins", value: "joined"}]} />
                </FlexItem>
                <Divider />
                <FlexItem py="small">
                  <Flex>
                    <FlexItem>
                      <FieldToggleSwitch onChange={handleHiddenToggle} on={hiddenToggle} label="Hide hidden fields    " />
                    </FlexItem>
                    <FlexItem ml="xxxlarge">
                      <Tooltip content="Enabled by default, this toggle hides fields from the diagram that contain 'hidden: yes'."><Icon size="xsmall" color="subdued" name="CircleInfoOutline"/></Tooltip>
                    </FlexItem>
                  </Flex>
                </FlexItem>
                <Divider />
                <FlexItem pt="xsmall">
                  <Flex flexDirection="column">
                    <FlexItem>
                      <Flex alignItems="baseline">
                        <FlexItem flexBasis="25%">
                          <Label>Views</Label>
                        </FlexItem>
                        <FlexItem  pl="xxxlarge" flexBasis="75%">
                          <Flex>
                            <FlexItem>
                              <ButtonTransparent 
                                size="small"
                                onClick={(e: any) => {
                                  let newViews: any = {}
                                  Object.keys(viewVisible).map((d: any) => {
                                    newViews[d] = false
                                  })
                                  setViewVisible(newViews)
                                }}
                              >Hide all</ButtonTransparent>
                            </FlexItem>
                            <FlexItem>
                              <ButtonTransparent size="small"
                                onClick={(e: any) => {
                                  let newViews: any = {}
                                  Object.keys(viewVisible).map((d: any) => {
                                    newViews[d] = true
                                  })
                                  setViewVisible(newViews)
                                }}
                              >Show all</ButtonTransparent>
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                    <FlexItem>
                      <ViewList>
                        {viewVisible && Object.keys(viewVisible).map((item: string, index) => {
                          return (
                            <ViewListItem key={`view-${index}`} style={{color: viewDisabled(viewVisible[item])}}>
                              <ViewButton
                                    onClick={(e: any) => {
                                      let newViews: any = {}
                                      Object.assign(newViews, viewVisible)
                                      newViews[item] = !viewVisible[item]
                                      setViewVisible(newViews)
                                    }}
                                    value={item}
                                  >
                              <Flex alignItems="center" justifyContent="space-between">
                                <FlexItem>
                                    {item}
                                </FlexItem>
                                <FlexItem>
                                  <Icon 
                                    size="xxsmall"
                                    name={viewVisible[item] ? "VisibilityOutline" : "VisibilityOff"}
                                    color={viewVisible[item] ? theme.colors.text : theme.colors.text1} />
                                </FlexItem>
                              </Flex>
                              </ViewButton>
                            </ViewListItem>
                          )
                        })}
                      </ViewList>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
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
              <Space gap="xsmall" justifyContent="flex-end">
                <IconButton 
                  label="Explore Info" 
                  icon="CircleInfoOutline" 
                  onClick={toggleExploreInfo}
                  style={{color: selectionInfo.lookmlElement === "explore" && theme.colors.key, 
                    backgroundColor: selectionInfo.lookmlElement === "explore" && theme.colors.keySubtle,
                    borderRadius: "25px"}}
                  size="large" 
                />
                <IconButton label="Reload Diagram" icon="Refresh" size="large" onClick={() => location.reload()} />
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
            <Diagram 
              dimensions={currentDimensions} 
              explore={currentExplore} 
              reload={reload} 
              selectionInfo={selectionInfo} 
              setSelectionInfo={setSelectionInfo}
              hiddenToggle={hiddenToggle}
              displayFieldType={displayFieldType}
              viewVisible={viewVisible}
            />
          )}
          </Stage>
          {currentExplore && Object.keys(selectionInfo).length > 0 && (
            <MetadataPanel
              explore={currentExplore}
              selectionInfo={selectionInfo}
              model={currentModel}
            />
          )}
          </Layout>
        </Stage>
        </Layout>
    </ComponentsProvider>
  )
}
