import * as React from "react"
import { FlexItem, Flex, Heading } from "looker-lens"
import styled from "styled-components"

export const Page = styled(Flex)`
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

export const PageHeader = styled(FlexItem)`
  background: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 16px;
  display: flex;
`

export const PageHeaderTitle = styled(Heading)`
  flex: 1 1 auto;
`
export const PageHeaderControls = styled.div`
  flex: 0 0 auto;
  display: flex;
`

export const PageMasterDetail = styled(Flex)`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
`

export const PageMaster = styled(FlexItem)`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
`

export const PageDetail = styled(FlexItem)`
  flex: 0 0 300px;
  border-left: 1px solid #e8e8e8;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
`
