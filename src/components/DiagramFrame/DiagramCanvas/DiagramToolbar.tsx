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
import { Divider, Flex, FlexItem, IconButton, theme } from '@looker/components'
import { Add, Remove, Map, CenterFocusWeak } from '@styled-icons/material'

import {
  OVERRIDE_KEY_SUBTLE,
  ZOOM_MAX,
  OVERRIDE_KEY,
  ZOOM_STEP,
  ZOOM_MIN,
  X_INIT,
  Y_INIT,
  ZOOM_INIT,
} from '../../../utils/constants'
import type { DiagramToolbarProps } from './types'
import { Toolbar } from './components/canvas_components'
import { formatZoom } from './utils'

export const DiagramToolbar: React.FC<DiagramToolbarProps> = ({
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
}) => {
  const minimapIconStyles =
    minimapEnabled || (minimapUntoggled && defaultMinimap)
      ? { color: OVERRIDE_KEY, backgroundColor: OVERRIDE_KEY_SUBTLE }
      : {}

  const recenterViewport = () => {
    setViewPosition({ x: X_INIT, y: Y_INIT })
    setZoomFactor(ZOOM_INIT)
    setReload(!reload)
  }

  const toggleMinimap = () => {
    if (defaultMinimap && minimapUntoggled) {
      setMinimapEnabled(false)
      setMinimapUntoggled(false)
    } else {
      setMinimapEnabled(!minimapEnabled)
      setMinimapUntoggled(false)
    }
  }

  const removeZoom = () =>
    setZoomFactor(Math.max(zoomFactor, ZOOM_MIN) - ZOOM_STEP)

  const addZoom = () =>
    setZoomFactor(Math.min(zoomFactor, ZOOM_MAX) + ZOOM_STEP)

  return (
    <Toolbar raised>
      <Flex flexDirection="column" alignItems="center">
        <FlexItem
          py="xsmall"
          fontSize="xsmall"
          style={{ color: theme.colors.text2 }}
        >
          {formatZoom(zoomFactor)}
        </FlexItem>
        <Divider appearance="light" />
        <FlexItem pt="xsmall" pb="xxsmall">
          <IconButton
            icon={<Add />}
            label="Zoom In"
            tooltipPlacement="right"
            onClick={addZoom}
          />
        </FlexItem>
        <FlexItem pb="xsmall" pt="xxsmall">
          <IconButton
            icon={<Remove />}
            label="Zoom Out"
            tooltipPlacement="right"
            onClick={removeZoom}
          />
        </FlexItem>
        <Divider appearance="light" />
        <FlexItem py="xsmall">
          <IconButton
            icon={<CenterFocusWeak />}
            label="Return to Start"
            tooltipPlacement="right"
            onClick={recenterViewport}
          />
        </FlexItem>
        <Divider appearance="light" />
        <FlexItem my="xsmall">
          <IconButton
            icon={<Map />}
            label="Toggle Minimap"
            tooltipPlacement="right"
            onClick={toggleMinimap}
            style={minimapIconStyles}
          />
        </FlexItem>
      </Flex>
    </Toolbar>
  )
}
