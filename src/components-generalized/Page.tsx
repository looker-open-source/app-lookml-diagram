import React from "react"
import {
  FlexItem,
  Flex,
  Heading,
  Icon,
  ButtonTransparent
} from "@looker/components"
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

const DetailWrapper = styled(FlexItem)`
  flex: 0 0 300px;
  border-left: 1px solid #e8e8e8;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
`

interface PageDetailProps {
  title: string
  onClose: () => void
}

export const PageDetail: React.FC<PageDetailProps> = (props: any) => {
  return (
    <DetailWrapper>
      <Flex>
        <FlexItem flex="1 1 auto">
          <Heading>{props.title}</Heading>
        </FlexItem>
        <FlexItem flex="0 0 auto">
          <ButtonTransparent p="none" color="neutral" onClick={props.onClose}>
            <Icon name="Close" size="1.25rem" />
          </ButtonTransparent>
        </FlexItem>
      </Flex>
      {props.children}
    </DetailWrapper>
  )
}
