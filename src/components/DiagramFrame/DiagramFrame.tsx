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

import React, { useCallback } from 'react'
import { SpaceVertical, IconButton, Layout } from '@looker/components'
import {
  AccountTree,
  Visibility,
  LiveHelp,
} from '@styled-icons/material-outlined'
import type { ILookmlModelExplore } from '@looker/sdk/lib/4.0/models'
import type { SelectionInfoPacket, VisibleViewLookup } from '../interfaces'
import type {
  DiagrammedModel,
  DiagramMetadata,
} from '../../utils/LookmlDiagrammer/'
import {
  ZOOM_INIT,
  X_INIT,
  Y_INIT,
  OVERRIDE_KEY,
  OVERRIDE_KEY_SUBTLE,
} from '../../utils/constants'
import { MetadataPanel } from './MetadataPanel/MetadataPanel'
import type { ExploreDropdown } from './FramePanels'
import { ViewOptions, DiagramSettings, HelpPanel } from './FramePanels'
import { DiagramHeader } from './DiagramHeader'
import { DiagramCanvas } from './DiagramCanvas/DiagramCanvas'
import type { DiagramFrameProps } from './types'
import { Rail, Stage } from './FrameHelpers'
import { prepareModelDropdown, prepareExploreList } from './utils'

export const DiagramFrame: React.FC<DiagramFrameProps> = ({
  unfilteredModels,
  pathModelName,
  pathExploreName,
  modelDetail,
  dimensions,
  hiddenToggle,
  setHiddenToggle,
  displayFieldType,
  setDisplayFieldType,
}) => {
  const [viewVisible, setViewVisible] = React.useState<VisibleViewLookup>({})
  const [showSettings, setShowSettings] = React.useState(true)
  const [showHelp, setShowHelp] = React.useState(false)
  const [showViewOptions, setShowViewOptions] = React.useState(false)
  const [reload, setReload] = React.useState(false)
  const [selectionInfo, setSelectionInfo] = React.useState<SelectionInfoPacket>(
    {}
  )
  const [zoomFactor, setZoomFactor] = React.useState(ZOOM_INIT)
  const [viewPosition, setViewPosition] = React.useState({
    x: X_INIT,
    y: Y_INIT,
  })
  const [minimapEnabled, setMinimapEnabled] = React.useState(false)
  const [minimapUntoggled, setMinimapUntoggled] = React.useState(true)
  const currentModel = modelDetail?.model

  const currentExplore: ILookmlModelExplore = modelDetail?.explores?.filter(
    (d: ILookmlModelExplore) => {
      return d.name === pathExploreName
    }
  )[0]

  const handleHiddenToggle = useCallback(
    (event: any) => setHiddenToggle(event.target.checked),
    [setHiddenToggle]
  )
  function closePanels() {
    setShowHelp(false)
    setShowViewOptions(false)
    setShowSettings(false)
  }
  const toggleSettings = () => {
    closePanels()
    setShowSettings(!showSettings)
  }
  const toggleViewOptions = () => {
    closePanels()
    setShowViewOptions(!showViewOptions)
  }
  const toggleHelp = () => {
    closePanels()
    setShowHelp(!showHelp)
  }

  function toggleExploreInfo() {
    if (currentExplore && modelDetail) {
      const selectInfo =
        selectionInfo.lookmlElement !== 'explore'
          ? { lookmlElement: 'explore' }
          : {}
      setSelectionInfo(selectInfo)
    }
  }

  const iconStyleOverride = {
    color: OVERRIDE_KEY,
    backgroundColor: OVERRIDE_KEY_SUBTLE,
  }

  const settingsIconStyles = showSettings ? iconStyleOverride : {}

  const viewOptionsIconStyles = showViewOptions ? iconStyleOverride : {}

  const helpIconStyles = showHelp ? iconStyleOverride : {}

  const modelDetails = prepareModelDropdown(unfilteredModels)

  const exploreList: ExploreDropdown[] = prepareExploreList(currentModel)

  const currentDimensions: DiagrammedModel = dimensions?.filter(
    (d: DiagrammedModel) => {
      return d.exploreName === pathExploreName
    }
  )[0]

  const currentDiagramMetadata: DiagramMetadata = currentDimensions?.diagramDict

  const defaultViews: VisibleViewLookup = {}
  Object.keys(viewVisible).length === 0 &&
    currentExplore &&
    currentDiagramMetadata &&
    Object.keys(currentDiagramMetadata.tableData).forEach(
      (lookmlViewName: string) => {
        defaultViews[lookmlViewName] = true
      }
    )
  Object.keys(viewVisible).length === 0 &&
    currentExplore &&
    currentDiagramMetadata &&
    setViewVisible(defaultViews)

  return (
    <Layout hasAside height="100vh">
      <Rail width="50px" py="xxsmall" pr="xsmall">
        <SpaceVertical
          style={{ alignItems: 'center' }}
          alignItems="center"
          gap="xsmall"
          ml="xxsmall"
        >
          <IconButton
            icon={<AccountTree />}
            label="Settings"
            tooltipPlacement="right"
            size="large"
            onClick={toggleSettings}
            toggle={showSettings}
            style={settingsIconStyles}
          />
          <IconButton
            icon={<Visibility />}
            label="View Options"
            tooltipPlacement="right"
            size="large"
            onClick={toggleViewOptions}
            toggle={showViewOptions}
            style={viewOptionsIconStyles}
          />
          <IconButton
            icon={<LiveHelp />}
            label="Diagram Help"
            tooltipPlacement="right"
            id="diagram-help-btn"
            size="large"
            onClick={toggleHelp}
            toggle={showHelp}
            style={{
              ...helpIconStyles,
              position: 'absolute',
              bottom: '5px',
            }}
          />
        </SpaceVertical>
      </Rail>
      {showSettings && (
        <DiagramSettings
          modelPathName={pathModelName}
          explorePathName={pathExploreName}
          modelDetails={modelDetails}
          exploreList={exploreList}
          modelDetail={modelDetail}
          selectionInfo={selectionInfo}
          currentExplore={currentExplore}
          diagramExplore={currentDimensions?.exploreName}
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
      {showHelp && <HelpPanel />}
      <Stage>
        <DiagramHeader
          currentExplore={currentExplore}
          selectionInfo={selectionInfo}
          toggleExploreInfo={toggleExploreInfo}
        />
        <Layout hasAside height="100%" id="DiagramStage">
          <DiagramCanvas
            modelDetail={modelDetail}
            unfilteredModels={unfilteredModels}
            pathModelName={pathModelName}
            pathExploreName={pathExploreName}
            currentDimensions={currentDimensions}
            zoomFactor={zoomFactor}
            reload={reload}
            minimapUntoggled={minimapUntoggled}
            minimapEnabled={minimapEnabled}
            setZoomFactor={setZoomFactor}
            setViewPosition={setViewPosition}
            setReload={setReload}
            setMinimapUntoggled={setMinimapUntoggled}
            setMinimapEnabled={setMinimapEnabled}
            explore={currentExplore}
            selectionInfo={selectionInfo}
            setSelectionInfo={setSelectionInfo}
            hiddenToggle={hiddenToggle}
            displayFieldType={displayFieldType}
            viewVisible={viewVisible}
            viewPosition={viewPosition}
          />
          {currentExplore && Object.keys(selectionInfo).length > 0 && (
            <MetadataPanel
              currentExplore={currentExplore}
              selectionInfo={selectionInfo}
              model={modelDetail?.model}
            />
          )}
        </Layout>
      </Stage>
    </Layout>
  )
}
