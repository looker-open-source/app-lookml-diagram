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
  Section,
  Box,
  Paragraph,
  Spinner,
  Heading,
  Card,
  Status,
  theme
} from "@looker/components"
import styled from "styled-components"
import { DIAGRAM_HEADER_HEIGHT } from '../../../utils/constants'
import { ILookModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/4.0/models"
import { DiagrammedModel, DiagramMetadata } from "../../../utils/diagrammer"
import { DiagramError } from "../../../utils/fetchers"
import Diagram from "./Diagram"
import { DiagramToolbar } from "./DiagramToolbar"
import { SelectionInfoPacket, VisibleViewLookup } from "../../interfaces"

export const DiagramCanvasWrapper = styled(Section as any)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
`
export const FullPage = styled(Box as any)`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 93vh;
  flex-direction: column;
`

export const IntroText = styled(Paragraph as any)`
  text-align: center;
  margin-top: 5em;
  max-width: 40%;
  color: ${theme.colors.text1};
`

export const PageLoading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`
export const Minimap = styled(Card as any)`
  min-width: 300px;
  width: 300px;
  height: auto;
  right: 20px;
  top: 20px;
  position: absolute;
`

export const DiagramCanvas: React.FC<{
  unfilteredModels: ILookModel[],
  modelError: DiagramError,
  pathModelName: string,
  pathExploreName: string,
  currentDimensions: DiagrammedModel
  zoomFactor: number
  reload: boolean
  defaultMinimap: boolean
  minimapUntoggled: boolean
  minimapEnabled: boolean
  setZoomFactor: (k: number)=>void
  setViewPosition: (posPacket: any)=>void
  setReload: (r: boolean)=>void
  setMinimapUntoggled: (ut: boolean)=>void
  setMinimapEnabled: (e: boolean)=>void
  dimensions: DiagramMetadata
  explore: ILookmlModelExplore
  selectionInfo: SelectionInfoPacket
  setSelectionInfo: (packet: SelectionInfoPacket) => void
  hiddenToggle: boolean
  displayFieldType: string
  viewVisible: VisibleViewLookup
  viewPosition: any
  minimapX: number
  minimapY: number
  minimapScale: number
}> = ({ 
  unfilteredModels,
  modelError,
  pathModelName,
  pathExploreName,
  currentDimensions,
  zoomFactor,
  reload,
  defaultMinimap,
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
  minimapX,
  minimapY,
  minimapScale,
 }) => {
  let svgElement = document.querySelector(`svg#display-diagram-svg`)

  return (
    <DiagramCanvasWrapper>
    {!unfilteredModels && (
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
        defaultMinimap={defaultMinimap}
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
      />
      {(minimapEnabled || (minimapUntoggled && defaultMinimap)) && <Minimap raised>
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
          zoomFactor={minimapScale}
          setZoomFactor={()=>{}}
          viewPosition={{
            x: minimapX,
            y: minimapY,
            displayX: (viewPosition.x) / zoomFactor,
            displayY: (viewPosition.y) / zoomFactor,
            clientWidth: svgElement && svgElement.clientWidth / zoomFactor,
            clientHeight: svgElement && (svgElement.clientHeight - DIAGRAM_HEADER_HEIGHT) / zoomFactor
          }}
          setViewPosition={()=>{}}
        />
      </Minimap>}
    </>
    )}
    </DiagramCanvasWrapper>
  )
}
