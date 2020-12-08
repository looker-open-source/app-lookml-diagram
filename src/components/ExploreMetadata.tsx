import React, { useEffect } from 'react';
import {
  Box,
  ButtonTransparent,
  Flex,
  FlexItem,
  Text,
  SpaceVertical,
  Paragraph,
  Aside,
  Footer,
  theme
} from "@looker/components"
import styled from "styled-components";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { ExternalLink } from "./ExternalLink"
import { EXPLORE_PANEL_PIXEL } from "../utils/constants"

const ExploreInfoPanel = styled(Aside as any)`
  border-left: solid 1px ${(props) => props.theme.colors.ui2};
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: -10px 0px 20px 0px ${(props) => props.theme.colors.ui2};
  z-index: 0;
`
const MetadataRow = styled(Flex as any)`
  border-top: solid 1px ${(props) => props.theme.colors.ui2};
  width: 100%;
`
const KeyText = styled(Text as any)`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
`
const ValueText = styled(Text as any)`
  font-weight: 400;
`
const FooterExplore = styled(Footer as any)`
  width: ${EXPLORE_PANEL_PIXEL}px;
  right: -1px;
  position: absolute;
  bottom: 0px;
  box-shadow: 0px 1px 15px ${(props) => props.theme.colors.ui2};
  background-color: ${(props) => props.theme.colors.background};
`

const ExploreMetadata: React.FC<{
  explore: ILookmlModelExplore
}> = ({
  explore
}) => {
	return (
  <ExploreInfoPanel width={`${EXPLORE_PANEL_PIXEL}px`} px="medium" py="large">
    <SpaceVertical>
      <Text fontSize="xxlarge" style={{fontWeight: 600}}>{explore.name}</Text>
      {explore.description && (
        <Paragraph>{explore.description}</Paragraph>
      )}
      <Flex pt="small" flexDirection="column">
        <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Group Label</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{explore.group_label}</ValueText>
          </FlexItem>
        </MetadataRow>
        <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Label</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{explore.label}</ValueText>
          </FlexItem>
        </MetadataRow>
        <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Access Filters</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
          {explore.access_filters.length > 0 ? explore.access_filters.map((d,i) => {
            let spaceBelow = explore.access_filters.length > i+1
            return (
            <>
              <FlexItem>
                <KeyText variant="secondary">field: </KeyText>
                <ValueText>{d.field}</ValueText>
              </FlexItem>
              <FlexItem  pb={spaceBelow && "small"}>
                <KeyText variant="secondary">user_attribute: </KeyText>
                <ValueText>{d.user_attribute}</ValueText>
              </FlexItem>
            </>)
          }) : <ValueText variant="subdued">None</ValueText>}
          </FlexItem>
        </MetadataRow>
        <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Project Name</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{explore.project_name}</ValueText>
          </FlexItem>
        </MetadataRow>
        <MetadataRow pt="small" pb="small" style={{borderBottom: `solid 1px ${theme.colors.ui2}`}}>
          <FlexItem flexBasis="35%">
            <KeyText>Connection Name</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{explore.connection_name}</ValueText>
          </FlexItem>
        </MetadataRow>
      </Flex>
    </SpaceVertical>
    <FooterExplore
        borderTop={`1px solid ${theme.colors.ui2}`}
        pt="small"
        pb="small"
    >
      <Flex alignItems="left">
        {/* 
        @ts-ignore */}
        <ExternalLink target="_blank" href={explore.lookml_link}>
          <ButtonTransparent
            mr="small"
            ml="small"
            iconBefore="LogoRings"
          >
            Go to LookML
          </ButtonTransparent>
        </ExternalLink>
      </Flex>
    </FooterExplore>
  </ExploreInfoPanel>
  )
}

export default ExploreMetadata
