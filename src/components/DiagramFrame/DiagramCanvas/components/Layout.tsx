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

import styled from "styled-components"
import {
  Card,
  Paragraph,
  Box,
  Section,
  theme,
} from "@looker/components"
import { MINIMAP_WIDTH } from "../../../../utils/constants"

export const Toolbar = styled(Card as any)`
min-width: 40px;
width: 40px;
height: auto;
left: 20px;
bottom: 80px;
position: absolute;
border-color: transparent;
:hover {
  border-color: transparent;
}
`

export const DiagramCanvasWrapper = styled(Section as any)`
background: ${(props) => props.theme.colors.ui1};
overflow: hidden;
position: relative;
`
export const FullPage = styled(Box as any)`
position: relative;
display: flex;
align-items: stretch;
justify-content: center;
align-items: center;
width: 100%;
min-height: 93vh;
flex-direction: column;
`

export const IntroText = styled(Paragraph as any)`
text-align: center;
margin-top: 5em;
max-width: 30%;
color: ${theme.colors.text1};
`
export const ErrorText = styled(Paragraph as any)`
text-align: center;
margin-top: 1em;
max-width: 40%;
color: ${theme.colors.text1};
`

export const PageLoading = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
height: 100%;
`
export const Minimap = styled(Card as any)`
min-width: ${MINIMAP_WIDTH}px;
width: ${MINIMAP_WIDTH}px;
height: auto;
right: 20px;
top: 20px;
position: absolute;
border-width: 3px;
border-color: white;
:hover {
  border-color: white;
}
`
