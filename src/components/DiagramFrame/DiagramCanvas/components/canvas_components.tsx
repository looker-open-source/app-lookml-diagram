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
import styled from 'styled-components'
import { Card, Paragraph, Section, theme } from '@looker/components'
import { MINIMAP_WIDTH } from '../../../../utils/constants'

/**
 * Layout component for Toolbar. Floats to bottom left of container
 */
export const Toolbar = styled(Card)`
  left: 20px;
  bottom: 80px;
  position: absolute;
  border-color: transparent;
  :hover {
    border-color: transparent;
  }
`

// eslint-disable-next-line no-restricted-properties
Toolbar.defaultProps = {
  height: 'auto',
  width: '40px',
  minWidth: '40px',
}

/**
 * Top level layout component for the DiagramCanvas
 */
export const DiagramCanvasWrapper = styled(Section)`
  background: ${(props) => props.theme.colors.ui1};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

/**
 * Text component for empty state description
 */
export const IntroText: React.FC = ({ children }) => {
  return (
    <Paragraph
      textAlign="center"
      maxWidth="30%"
      mt="1em"
      color={theme.colors.text1}
    >
      {children}
    </Paragraph>
  )
}

/**
 * Text component for error state text
 */
export const ErrorText: React.FC = ({ children }) => {
  return (
    <Paragraph
      textAlign="center"
      maxWidth="40%"
      mt="1em"
      color={theme.colors.text1}
    >
      {children}
    </Paragraph>
  )
}

export const Minimap = styled(Card)`
  right: 20px;
  top: 20px;
  position: absolute;
  border-color: white;
  border-width: 3px;
  :hover {
    border-color: white;
  }
`

// eslint-disable-next-line no-restricted-properties
Minimap.defaultProps = {
  minWidth: `${MINIMAP_WIDTH}px`,
  width: `${MINIMAP_WIDTH}px`,
  height: 'auto',
}
