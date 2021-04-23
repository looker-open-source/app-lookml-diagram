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
max-width: 40%;
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
`
