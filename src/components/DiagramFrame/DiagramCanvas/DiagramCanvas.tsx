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

import React from 'react'
import { Heading, ProgressCircular, Status } from '@looker/components'
import { DIAGRAM_HEADER_HEIGHT } from '../../../utils/constants'
import Diagram from './Diagram'
import { DiagramToolbar } from './DiagramToolbar'
import type { DiagramCanvasProps } from './types'
import {
  DiagramCanvasWrapper,
  Minimap,
  IntroText,
  ErrorText,
} from './components/canvas_components'
import { EmptyStateArt } from './components/EmptyStateArt'

const noop = () => {
  // noop
}

const renderError = (fetchError: string) => {
  let errorText
  if (fetchError === 'general') {
    errorText =
      'A future version of the LookML Diagram extension may be able to support this model.'
  } else if (fetchError === 'notFound') {
    errorText =
      "Make sure the selected model or Explore exists, you have access, and that it's fully validated on the current branch."
  } else {
    errorText = 'An unknown problem happened.'
  }
  return (
    <DiagramCanvasWrapper>
      <Status intent="critical" size="large" />
      <Heading mt="large" fontSize="large">
        {"Can't generate LookML Diagram"}
      </Heading>
      <ErrorText>{errorText}</ErrorText>
    </DiagramCanvasWrapper>
  )
}

const renderInitializingExtension = () => (
  <DiagramCanvasWrapper>
    <ProgressCircular /> <Heading mt="large">Initializing Extension</Heading>
  </DiagramCanvasWrapper>
)

const renderChoose = () => (
  <DiagramCanvasWrapper>
    <EmptyStateArt />
    <Heading fontSize="large">Begin visualizing your LookML model</Heading>
    <IntroText>
      Choose a model, followed by an Explore, to better understand your LookML
      relationships.
    </IntroText>
  </DiagramCanvasWrapper>
)

const renderGenerating = () => (
  <DiagramCanvasWrapper>
    <ProgressCircular /> <Heading mt="large">Generating Diagram</Heading>
  </DiagramCanvasWrapper>
)

/**
 * This function has the responsibility of taking in various
 */
export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
  unfilteredModels,
  modelDetail,
  pathModelName,
  pathExploreName,
  zoomFactor,
  reload,
  minimapUntoggled,
  minimapEnabled,
  setZoomFactor,
  setViewPosition,
  setReload,
  setMinimapUntoggled,
  setMinimapEnabled,
  currentDimensions,
  explore,
  selectionInfo,
  setSelectionInfo,
  hiddenToggle,
  displayFieldType,
  viewVisible,
  viewPosition,
}) => {
  const svgElement = document.querySelector(`svg#display-diagram-svg`)
  const dimensions = currentDimensions?.diagramDict

  // Git error should disable the Git branch selector in DiagramSettings.
  // Only `notFound` or `general` fetch errors should prevent Diagram display.
  if (modelDetail?.fetchError && modelDetail?.fetchError !== 'git') {
    return renderError(modelDetail.fetchError)
  }

  if (!unfilteredModels) {
    return renderInitializingExtension()
  }

  if (!pathExploreName && !currentDimensions) {
    return renderChoose()
  }

  if (pathModelName && pathExploreName && !currentDimensions) {
    return renderGenerating()
  }

  return (
    <DiagramCanvasWrapper>
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
        type={'display'}
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
      {(minimapEnabled ||
        (minimapUntoggled && currentDimensions.minimapDefault)) && (
        <Minimap raised>
          <Diagram
            type={'minimap'}
            dimensions={dimensions}
            explore={explore}
            reload={reload}
            selectionInfo={selectionInfo}
            setSelectionInfo={setSelectionInfo}
            hiddenToggle={hiddenToggle}
            displayFieldType={displayFieldType}
            viewVisible={viewVisible}
            zoomFactor={currentDimensions.minimapScale}
            setZoomFactor={noop}
            viewPosition={{
              x: currentDimensions.minimapX,
              y: currentDimensions.minimapY,
              displayX: viewPosition.x / zoomFactor,
              displayY: viewPosition.y / zoomFactor,
              clientWidth: svgElement && svgElement.clientWidth / zoomFactor,
              clientHeight:
                svgElement &&
                (svgElement.clientHeight - DIAGRAM_HEADER_HEIGHT) / zoomFactor,
            }}
            setViewPosition={noop}
          />
        </Minimap>
      )}
    </DiagramCanvasWrapper>
  )
}
