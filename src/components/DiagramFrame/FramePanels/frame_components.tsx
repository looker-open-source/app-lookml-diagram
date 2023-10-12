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
import { Aside, Paragraph, Heading, theme } from '@looker/components'
import { OVERRIDE_KEY_SUBTLE } from '../../../utils/constants'

export const SettingsPanel = styled(Aside)`
  border-right: solid 1px ${theme.colors.ui2};
  overflow-y: auto;
  height: 100%;
  overflow-x: scroll;
`

// eslint-disable-next-line no-restricted-properties
SettingsPanel.defaultProps = {
  width: '275px',
  px: 'medium',
  py: 'large',
}

export const ViewList = styled.ul`
  overflow-y: auto;
  margin: 0;
`
export const ViewListItem = styled.li`
  border-bottom: solid 1px ${theme.colors.ui2};
`
export const ViewButton = styled.button`
  all: inherit;
  font-size: ${theme.fontSizes.small};
  cursor: pointer;
  padding: 12px 12px;
  width: 100%;
  border: none;
  :hover {
    background-color: ${OVERRIDE_KEY_SUBTLE};
  }
  & > * {
    pointer-events: none;
  }
`
export const HelpBody: React.FC = ({ children }) => {
  return <Paragraph fontSize="small">{children}</Paragraph>
}

export const PanelHeading: React.FC = ({ children }) => {
  return (
    <Heading fontSize="large" color={theme.colors.text4}>
      {children}
    </Heading>
  )
}
