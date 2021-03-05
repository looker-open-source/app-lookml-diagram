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
  Heading,
  Header,
  Space,
  IconButton
} from "@looker/components"
import styled from "styled-components"
import { OVERRIDE_KEY_SUBTLE, DIAGRAM_HEADER_HEIGHT, OVERRIDE_KEY } from '../utils/constants'

export const DiagramHeaderWrapper = styled(Header as any)`
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
  transition: transform 500ms ease-out;
  position: relative;
  z-index: 1;


  &.no-explore {
    transform: translateY(-${DIAGRAM_HEADER_HEIGHT}px);
  }

  &.has-explore {
    transform: translateY(0);
  }
`


export const DiagramHeader: React.FC<{
  currentExplore: any,
  selectionInfo: any,
  toggleExploreInfo: ()=>void,
}> = ({ 
  currentExplore,
  selectionInfo,
  toggleExploreInfo,
 }) => {

  return (
    <DiagramHeaderWrapper
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
            style={{color: selectionInfo.lookmlElement === "explore" && OVERRIDE_KEY, 
              backgroundColor: selectionInfo.lookmlElement === "explore" && OVERRIDE_KEY_SUBTLE,
              borderRadius: "25px"}}
            size="large" 
          />
          <IconButton label="Reload Diagram" icon="Refresh" size="large" onClick={() => location.reload()} />
        </Space>
      </Space>
    </DiagramHeaderWrapper>
  )
}
