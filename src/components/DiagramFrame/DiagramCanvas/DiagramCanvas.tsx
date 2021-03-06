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

import React from "react"
import {
  Spinner,
  Heading,
  Status,
} from "@looker/components"
import { DIAGRAM_HEADER_HEIGHT } from '../../../utils/constants'
import Diagram from "./Diagram"
import { DiagramToolbar } from "./DiagramToolbar"
import {DiagramCanvasProps, DiagramCanvasWrapper, Minimap, PageLoading, FullPage, IntroText} from "./types"

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({ 
  unfilteredModels,
  modelError,
  pathModelName,
  pathExploreName,
  currentDimensions,
  zoomFactor,
  reload,
  minimapUntoggled,
  minimapEnabled,
  setZoomFactor,
  setViewPosition,
  setReload,
  setMinimapUntoggled,
  setMinimapEnabled,
  dimensions,
  explore,
  selectionInfo,
  setSelectionInfo,
  hiddenToggle,
  displayFieldType,
  viewVisible,
  viewPosition,
  selectedBranch
 }) => {
  let svgElement = document.querySelector(`svg#display-diagram-svg`)

  return (
    <DiagramCanvasWrapper>
    {!unfilteredModels && !modelError && (
      <PageLoading>
        <Spinner/>{' '}
        <Heading mt="large">
          Loading Extension
        </Heading>
      </PageLoading>
    )}
    {modelError && modelError.kind === "general" && (
      <PageLoading>
        <Status intent="warn" />
        <Heading mt="large">
          Uh oh! Could not generate a diagram for this model.
        </Heading>
      </PageLoading>
    )}
    {modelError && modelError.kind === "notFound" && (
      <PageLoading>
        <Status intent="critical" />
        <Heading mt="large">
          Uh oh! Could not locate this model.
        </Heading>
      </PageLoading>
    )}
    {unfilteredModels && !pathExploreName && !currentDimensions && (
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
          Select a model and click on one of the Explores to the left to begin visualizing your LookML model. You'll see views, joins, SQL definitions, and more
          for each object.
        </IntroText>
      </FullPage>
    )}
    {!modelError && pathModelName && pathExploreName && !currentDimensions && (
      <PageLoading>
        <Spinner/>{' '}
        <Heading mt="large">
          Generating Diagram
        </Heading>
      </PageLoading>
    )}
    {!modelError && pathModelName && pathExploreName && currentDimensions && (
    <>
      <DiagramToolbar
        zoomFactor={zoomFactor}
        reload={reload}
        defaultMinimap={currentDimensions.minimapDefault}
        minimapUntoggled={minimapUntoggled}
        minimapEnabled={minimapEnabled}
        setZoomFactor={setZoomFactor}
        setViewPosition={setViewPosition}
        setReload={setReload}
        setMinimapUntoggled={setMinimapUntoggled}
        setMinimapEnabled={setMinimapEnabled}
      />
      <Diagram
        type={"display"}
        dimensions={dimensions} 
        explore={explore} 
        reload={reload} 
        selectionInfo={selectionInfo} 
        setSelectionInfo={setSelectionInfo}
        hiddenToggle={hiddenToggle}
        displayFieldType={displayFieldType}
        viewVisible={viewVisible}
        zoomFactor={zoomFactor}
        setZoomFactor={setZoomFactor}
        viewPosition={viewPosition}
        setViewPosition={setViewPosition}
        selectedBranch={selectedBranch}
      />
      {(minimapEnabled || (minimapUntoggled && currentDimensions.minimapDefault)) && <Minimap raised>
        <Diagram 
          type={"minimap"}
          dimensions={dimensions} 
          explore={explore} 
          reload={reload} 
          selectionInfo={selectionInfo} 
          setSelectionInfo={setSelectionInfo}
          hiddenToggle={hiddenToggle}
          displayFieldType={displayFieldType}
          viewVisible={viewVisible}
          zoomFactor={currentDimensions.minimapScale}
          setZoomFactor={()=>{}}
          viewPosition={{
            x: currentDimensions.minimapX,
            y: currentDimensions.minimapY,
            displayX: (viewPosition.x) / zoomFactor,
            displayY: (viewPosition.y) / zoomFactor,
            clientWidth: svgElement && svgElement.clientWidth / zoomFactor,
            clientHeight: svgElement && (svgElement.clientHeight - DIAGRAM_HEADER_HEIGHT) / zoomFactor
          }}
          setViewPosition={()=>{}}
          selectedBranch={selectedBranch}
        />
      </Minimap>}
    </>
    )}
    </DiagramCanvasWrapper>
  )
}
