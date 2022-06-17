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
import { useHistory } from 'react-router'
import type { ExploreDropdown } from '../types'
import type { ExploreListProps } from './types'
import { handleExploreChange, getExploreListItemBackgroundColor } from './utils'
import {
  ExploreListWrapper,
  ExploreListitem,
  ExploreButton,
} from './list_components'

export const ExploreList: React.FC<ExploreListProps> = ({
  currentModel,
  selectionInfo,
  exploreList,
  currentExplore,
  diagramExplore,
  setSelectionInfo,
  setViewVisible,
  setZoomFactor,
  setViewPosition,
  setMinimapUntoggled,
  setMinimapEnabled,
}) => {
  const history = useHistory()
  return (
    <ExploreListWrapper>
      {exploreList &&
        exploreList.map((explore: ExploreDropdown, index: number) => {
          return (
            <ExploreListitem
              key={`explore-${index}`}
              style={{
                backgroundColor: getExploreListItemBackgroundColor(
                  explore.value,
                  currentExplore,
                  diagramExplore
                ),
              }}
            >
              <ExploreButton
                onClick={() =>
                  handleExploreChange(
                    history,
                    currentModel,
                    explore,
                    selectionInfo,
                    setSelectionInfo,
                    setViewVisible,
                    setZoomFactor,
                    setViewPosition,
                    setMinimapUntoggled,
                    setMinimapEnabled
                  )
                }
                value={explore.value}
              >
                {explore.label}
              </ExploreButton>
            </ExploreListitem>
          )
        })}
    </ExploreListWrapper>
  )
}
