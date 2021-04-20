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
  Space,
  IconButton,
} from "@looker/components"
import { OVERRIDE_KEY_SUBTLE, OVERRIDE_KEY } from '../../utils/constants'
import {DiagramHeaderProps} from "./types"
import {DiagramHeaderWrapper} from "./FrameHelpers"

export const DiagramHeader: React.FC<DiagramHeaderProps> = ({ 
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
          <Heading as="h1" px='1rg'>{currentExplore && currentExplore.label}</Heading>
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
