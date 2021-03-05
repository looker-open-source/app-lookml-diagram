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
  Divider,
  Flex,
  FlexItem,
  Card,
  IconButton,
  theme
} from "@looker/components"
import styled from "styled-components"
import { OVERRIDE_KEY_SUBTLE, ZOOM_MAX, OVERRIDE_KEY, ZOOM_STEP, ZOOM_MIN, X_INIT, Y_INIT, ZOOM_INIT } from '../utils/constants'

const Toolbar = styled(Card as any)`
  min-width: 40px;
  width: 40px;
  height: auto;
  left: 20px;
  bottom: 80px;
  position: absolute;
`


export const DiagramToolbar: React.FC<{
  zoomFactor: number,
  reload: boolean,
  defaultMinimap: boolean,
  minimapUntoggled: boolean,
  minimapEnabled: boolean,
  setZoomFactor: (k: number)=>void,
  setViewPosition: (posPacket: any)=>void,
  setReload: (r: boolean)=>void,
  setMinimapUntoggled: (ut: boolean)=>void,
  setMinimapEnabled: (e: boolean)=>void,
}> = ({ 
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

  return (
    <Toolbar raised>
      <Flex flexDirection="column" alignItems="center">
        <FlexItem  pt="xsmall" fontSize="xsmall" style={{color: theme.colors.text2}}>{(Math.round(zoomFactor * 10) * 10).toString() + "%"}</FlexItem>
        <FlexItem width="40px"><Divider/></FlexItem>
        <FlexItem><IconButton icon="Plus" label="Zoom In" tooltipPlacement="right" 
          onClick={()=>setZoomFactor(Math.min(zoomFactor, ZOOM_MAX)+ZOOM_STEP)} /></FlexItem>
        <FlexItem><IconButton icon="Minus" label="Zoom Out" tooltipPlacement="right" 
          onClick={()=>setZoomFactor(Math.max(zoomFactor, ZOOM_MIN)-ZOOM_STEP)}  /></FlexItem>
        <FlexItem width="40px"><Divider/></FlexItem>
        <FlexItem><IconButton icon="CenterFocus" label="Return to Start" tooltipPlacement="right"
          onClick={()=>{setViewPosition({x: X_INIT, y: Y_INIT});setZoomFactor(ZOOM_INIT);setReload(!reload)}} /></FlexItem>
        <FlexItem width="40px"><Divider/></FlexItem>
        <FlexItem pb="xsmall">
          <IconButton 
            icon="ChartMap" 
            label="Toggle Minimap" 
            tooltipPlacement="right"
            onClick={()=>{
              if (defaultMinimap && minimapUntoggled) {
                setMinimapEnabled(false)
                setMinimapUntoggled(false)
              } else {
                setMinimapEnabled(!minimapEnabled)
                setMinimapUntoggled(false)
              }
            }}
            style={{color: (minimapEnabled || (minimapUntoggled && defaultMinimap)) && OVERRIDE_KEY, 
              backgroundColor: (minimapEnabled || (minimapUntoggled && defaultMinimap)) && OVERRIDE_KEY_SUBTLE,
              borderRadius: "10px"}}
          />
        </FlexItem>
      </Flex>
    </Toolbar>
  )
}
