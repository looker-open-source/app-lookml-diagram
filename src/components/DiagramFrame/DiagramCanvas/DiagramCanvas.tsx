// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

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

  if (!currentDimensions) {
    if (pathModelName && pathExploreName) {
      return renderGenerating()
    }
    return renderChoose()
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
