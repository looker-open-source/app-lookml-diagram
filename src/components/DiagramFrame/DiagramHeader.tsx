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
import {
  Heading,
  Space,
  ButtonTransparent,
  IconButton,
  Button,
  Spinner,
  theme
} from '@looker/components'
import { Explore } from '@looker/icons'
import { useQueryClient } from 'react-query'
import { Info } from '@styled-icons/material-outlined/Info'
import { Close } from '@styled-icons/material-outlined/Close'
import styled from 'styled-components'
import { OVERRIDE_KEY_SUBTLE, OVERRIDE_KEY } from '../../utils/constants'
import { DiagramHeaderProps } from './types'
import { DiagramHeaderWrapper } from './FrameHelpers'

export const DiagramHeader: React.FC<DiagramHeaderProps> = ({
  currentExplore,
  selectionInfo,
  toggleExploreInfo,
  showExplorer,
  toggleExplorer,
  loadingQueryData,
  queryFields,
  setQueryFields
}) => {
  const exploreInfoStyles =
    selectionInfo.lookmlElement === 'explore'
      ? { color: OVERRIDE_KEY, backgroundColor: OVERRIDE_KEY_SUBTLE }
      : {}

  const ExplorerButton = showExplorer ? Button : ButtonTransparent

  return (
    <DiagramHeaderWrapper
      py="xsmall"
      px="large"
      className={currentExplore ? 'has-explore' : 'no-explore'}
    >
      <Space between>
        <Space gap="xsmall">
          <Heading as="h1" px="1rg">
            {currentExplore && currentExplore.label}
          </Heading>
          <IconButton
            label="Explore Info"
            icon={<Info />}
            onClick={toggleExploreInfo}
            style={exploreInfoStyles}
            size="large"
          />
        </Space>
        <Space gap="xsmall" justifyContent="flex-end">
          <ExplorerButton
            iconBefore={
              loadingQueryData ? (
                <Spinner
                  mr="xsmall"
                  color={showExplorer ? 'white' : OVERRIDE_KEY}
                  size={25}
                />
              ) : (
                <Explore />
              )
            }
            onClick={toggleExplorer}
          >
            Explore
          </ExplorerButton>
          {Object.keys(queryFields).length > 0 && (
            <IconButton
              label="Clear fields"
              icon={<Close />}
              onClick={() => setQueryFields({})}
            />
          )}
        </Space>
      </Space>
    </DiagramHeaderWrapper>
  )
}
