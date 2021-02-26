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

import React, { memo } from "react"
import {
  SpaceVertical,
  IconButton,
  Aside,
  Section,
  Layout,
} from "@looker/components"
import styled from "styled-components"
import { SelectionInfoPacket, VisibleViewLookup } from "../interfaces"
import { getActiveGitBranch, getAvailGitBranches, DiagramError } from "../../utils/fetchers"
import { DiagrammedModel } from "../../utils/diagrammer"
import "./styles.css"
import {MetadataPanel} from "./MetadataPanel/MetadataPanel"
import { DiagramSettings } from "./DiagramSettings"
import { HelpPanel } from "./HelpPanel"
import { ViewOptions } from "./ViewOptions"
import { DiagramHeader } from "./DiagramHeader"
import { DiagramCanvas } from "./DiagramCanvas/DiagramCanvas"
import { 
  ZOOM_INIT,
  X_INIT,
  Y_INIT,
  OVERRIDE_KEY,
  OVERRIDE_KEY_SUBTLE
} from '../../utils/constants'
import { ILookmlModel, ILookmlModelExplore, IGitBranch } from "@looker/sdk/lib/sdk/4.0/models"


export const Stage = styled(Section as any)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
`
export const Rail = styled(Aside as any)`
  border-right: solid 1px ${(props) => props.theme.colors.ui2};
  align-items: center;
`

export const DiagramFrame: React.FC<{
  unfilteredModels: ILookmlModel[]
  currentModel: ILookmlModel
  pathModelName: string
  pathExploreName: string
  modelDetail: any
  dimensions: DiagrammedModel[]
  modelError: DiagramError
  setModelError: (e: DiagramError)=>void
  minimapScale: number
  minimapX: number
  minimapY: number
  defaultMinimap: boolean,
  hiddenToggle: boolean,
  setHiddenToggle: (t: boolean)=>void
  displayFieldType: string,
  setDisplayFieldType: (s: string)=>void,
  selectedBranch: string,
  setSelectedBranch: (b: string)=>void,
 }> = ({
  unfilteredModels,
  currentModel,
  pathModelName,
  pathExploreName,
  modelDetail,
  dimensions,
  modelError,
  setModelError,
  minimapScale,
  minimapX,
  minimapY,
  defaultMinimap,
  hiddenToggle,
  setHiddenToggle,
  displayFieldType,
  setDisplayFieldType,
  selectedBranch,
  setSelectedBranch,
  }) => {
  const [viewVisible, setViewVisible] = React.useState<VisibleViewLookup>({})
  const [showSettings, setShowSettings] = React.useState(true)
  const [showHelp, setShowHelp] = React.useState(false)
  const [showViewOptions, setShowViewOptions] = React.useState(false)
  const [showNoAside, setShowNoAside] = React.useState(false)
  const [reload, setReload] = React.useState(false)
  const [selectionInfo, setSelectionInfo] = React.useState<SelectionInfoPacket>({})
  const [zoomFactor, setZoomFactor] = React.useState(ZOOM_INIT)
  const [viewPosition, setViewPosition] = React.useState({x: X_INIT, y: Y_INIT})
  const [minimapEnabled, setMinimapEnabled] = React.useState(false)
  const [minimapUntoggled, setMinimapUntoggled] = React.useState(true)

  const handleHiddenToggle = (event: any) => setHiddenToggle(event.target.checked)

  function showDiagram() {
    setShowHelp(false)
    setShowViewOptions(false)
    setShowSettings(false)
    setShowNoAside(true)
    return true
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

  let modelDetails = unfilteredModels ? unfilteredModels.filter((d: ILookmlModel)=>{ 
    return d.explores.length >= 1
  }).map((d: ILookmlModel)=>{
    return {
      value: d.name,
      label: d.label
    }
  }).sort((a: any, b: any) => a.value < b.value ? -1 : 1) : []

  let currentExplore = modelDetail && modelDetail.explores.filter((d: ILookmlModelExplore)=>{
    return d.name === pathExploreName
  })[0]

  let projectId = currentExplore && currentExplore.project_name

  const gitBranch = getActiveGitBranch(projectId)
  const gitBranches = getAvailGitBranches(projectId)

  let branchOpts = gitBranches && gitBranches.map((branch: IGitBranch) => {
    let opt = {}
    if (gitBranch.name === branch.name) {
      opt = {
        value: branch.name, 
        label: branch.name, 
        icon: "GitBranch"
      }
    } else {
      opt = {
        value: branch.name, 
        label: branch.name, 
      }
    }
    return opt
  })

  let currentDimensions = dimensions && dimensions.filter((d: DiagrammedModel)=>{
    return d.exploreName === pathExploreName
  })[0]

  let currentDiagramMetadata = currentDimensions && currentDimensions.diagramDict

  let exploreList = currentModel && currentModel.explores.map((d: ILookmlModelExplore)=>{
    return {
      value: d.name,
      label: d.label
    }
  }).sort((a: ILookmlModelExplore, b: ILookmlModelExplore) => a.label < b.label ? -1 : 1)

  let defaultViews: VisibleViewLookup = {}
  Object.keys(viewVisible).length === 0 && currentExplore && currentDiagramMetadata && Object.keys(currentDiagramMetadata.tableData)
  .map((lookmlViewName: string)=>{
    defaultViews[lookmlViewName] = true
  })
  Object.keys(viewVisible).length === 0 && currentExplore && currentDiagramMetadata && setViewVisible(defaultViews)

  return (
    <Layout hasAside height="100%">
      <Rail width="50px">
        <SpaceVertical style={{alignItems: "center"}} alignItems="center" gap="xsmall">
          <IconButton
            icon="Dashboard"
            label="Diagram"
            tooltipPlacement="right"
            size="large"
            toggle={showNoAside && !showViewOptions && !showSettings && !showHelp ? true : undefined}
            onClick={showDiagram}
            style={{color: showNoAside && !showViewOptions && !showSettings && !showHelp && OVERRIDE_KEY, 
              backgroundColor: showNoAside && !showViewOptions && !showSettings && !showHelp && OVERRIDE_KEY_SUBTLE,
              borderRadius: "10px"}}
          />
          <IconButton
            icon="GearOutline"
            label="Settings"
            tooltipPlacement="right"
            size="large"
            onClick={() => showDiagram() && setShowSettings(!showSettings)}
            toggle={showSettings}
            style={{color: showSettings && OVERRIDE_KEY, 
              backgroundColor: showSettings && OVERRIDE_KEY_SUBTLE,
              borderRadius: "10px"}}
          />
          <IconButton
            icon="Tune"
            label="View Options"
            tooltipPlacement="right"
            size="large"
            onClick={() => showDiagram() && setShowViewOptions(!showViewOptions)}
            toggle={showViewOptions}
            style={{color: showViewOptions && OVERRIDE_KEY, 
              backgroundColor: showViewOptions && OVERRIDE_KEY_SUBTLE,
              borderRadius: "10px"}}
          />
          <IconButton
            icon="Help"
            label="Diagram Help"
            tooltipPlacement="right"
            id="diagram-help-btn"
            size="large"
            onClick={() => showDiagram() && setShowHelp(!showHelp)}
            toggle={showHelp}
            style={{color: showHelp && OVERRIDE_KEY, 
              backgroundColor: showHelp && OVERRIDE_KEY_SUBTLE,
              borderRadius: "10px", position: "absolute", bottom: "0px"}}
          />
        </SpaceVertical>
      </Rail>
      {showSettings && (
        <DiagramSettings
          modelDetails={modelDetails}
          currentModel={currentModel}
          setModelError={setModelError}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          branchOpts={branchOpts}
          gitBranch={gitBranch}
          gitBranches={gitBranches}
          exploreList={exploreList}
          selectionInfo={selectionInfo}
          projectId={projectId}
          currentExplore={currentExplore}
          diagramExplore={pathExploreName}
          setSelectionInfo={setSelectionInfo}
          setViewVisible={setViewVisible}
          setZoomFactor={setZoomFactor}
          setViewPosition={setViewPosition}
          setMinimapUntoggled={setMinimapUntoggled}
          setMinimapEnabled={setMinimapEnabled}
        />
      )}
      {showViewOptions && (
        <ViewOptions
          displayFieldType={displayFieldType}
          hiddenToggle={hiddenToggle}
          viewVisible={viewVisible}
          setViewVisible={setViewVisible}
          handleHiddenToggle={handleHiddenToggle}
          setDisplayFieldType={setDisplayFieldType}
        />
      )}
      {showHelp && (
        <HelpPanel
        />
      )}
      <Stage>
        <DiagramHeader
          currentExplore={currentExplore}
          selectionInfo={selectionInfo}
          toggleExploreInfo={toggleExploreInfo}
        />
        <Layout hasAside height="100%" id="DiagramStage">
        <DiagramCanvas
          unfilteredModels={unfilteredModels}
          modelError={modelError}
          pathModelName={pathModelName}
          pathExploreName={pathExploreName}
          currentDimensions={currentDimensions}
          zoomFactor={zoomFactor}
          reload={reload}
          defaultMinimap={defaultMinimap}
          minimapUntoggled={minimapUntoggled}
          minimapEnabled={minimapEnabled}
          setZoomFactor={setZoomFactor}
          setViewPosition={setViewPosition}
          setReload={setReload}
          setMinimapUntoggled={setMinimapUntoggled}
          setMinimapEnabled={setMinimapEnabled}
          dimensions={currentDiagramMetadata}
          explore={currentExplore}
          selectionInfo={selectionInfo}
          setSelectionInfo={setSelectionInfo}
          hiddenToggle={hiddenToggle}
          displayFieldType={displayFieldType}
          viewVisible={viewVisible}
          viewPosition={viewPosition}
          minimapX={minimapX}
          minimapY={minimapY}
          minimapScale={minimapScale}
        />
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
  )
}
