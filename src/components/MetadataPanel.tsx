import React, { useEffect } from 'react';
import {
  Box,
  ButtonTransparent,
  CodeBlock,
  Chip,
  Flex,
  FlexItem,
  Text,
  SpaceVertical,
  Paragraph,
  Aside,
  Footer,
  Space,
  theme
} from "@looker/components"
import styled from "styled-components";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { ExternalLink } from "./ExternalLink"
import { METADATA_PANEL_PIXEL } from "../utils/constants"
import { LookmlObjectMetadata } from "./interfaces"
import { ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';

const MetadataInfoPanel = styled(Aside as any)`
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
const MetadataFooter = styled(Footer as any)`
  width: ${METADATA_PANEL_PIXEL}px;
  right: -1px;
  position: absolute;
  bottom: 0px;
  box-shadow: 0px 1px 15px ${(props) => props.theme.colors.ui2};
  background-color: ${(props) => props.theme.colors.background};
`

const JoinCodeBlock = styled(CodeBlock as any)`
  background-color: ${(props) => props.theme.colors.neutralSubtle};
  color: ${(props) => props.theme.colors.keyInteractive};
`

const JoinPill = styled(Chip as any)`
  font-family: monospace; 
  border-radius: 20px;
`

function getJoinCodeBlock(join: ILookmlModelExploreJoins) {
  let startLine = `join: ${join.name.toLowerCase()} {\n`
  let typeLine = join.type && `  type: ${join.type}\n`
  let relationLine = join.relationship && `  relationship: ${join.relationship}\n`
  let sqlLine = join.sql_on && `  sql_on: ${join.sql_on} ;;\n`
  let endLine = `}`
  return [startLine, typeLine, relationLine, sqlLine, endLine].filter(Boolean).join("")
}

const MetadataPanel: React.FC<{
  explore: ILookmlModelExplore,
  selectionInfo: any,
}> = ({
  explore,
  selectionInfo
}) => {
  let metadata: LookmlObjectMetadata
  if (selectionInfo.lookmlElement === "explore") {
    // @ts-ignore
    let lookmlLink = explore.lookml_link
    metadata = {
      name: explore.name,
      description: explore.description,
      lookmlLink: lookmlLink,
      connectionName: explore.connection_name,
      label: explore.label,
      groupLabel: explore.group_label,
      projectName: explore.project_name,
      accessFilters: explore.access_filters,
    }
  } else if (selectionInfo.lookmlElement === "join") {
    let joinObj = explore.joins.filter((join: ILookmlModelExploreJoins) => {
      return join.name === selectionInfo.name
    })[0]
    // @ts-ignore
    let lookmlLink = explore.lookml_link
    metadata = {
      name: joinObj.name,
      lookmlLink: lookmlLink,
      joinCode: getJoinCodeBlock(joinObj),
      joinType: joinObj.type && joinObj.type.replace(/_/g, " ").toUpperCase(),
      joinRelationship: joinObj.relationship && joinObj.relationship.replace(/_/g, " ").toUpperCase(),
    }
  }
	return (
  <MetadataInfoPanel width={`${METADATA_PANEL_PIXEL}px`} px="medium" py="large">
    <SpaceVertical>
      <Text fontSize="xxlarge" style={{fontWeight: 600}}>{metadata.name}</Text>
      {metadata.description && (
        <Paragraph>{metadata.description}</Paragraph>
      )}
      <Flex>
        {metadata.joinType && <FlexItem pr="small"><JoinPill disabled>{metadata.joinType}</JoinPill></FlexItem>}
        {metadata.joinRelationship && <FlexItem><JoinPill disabled>{metadata.joinRelationship}</JoinPill></FlexItem>}
      </Flex>
      {metadata.joinCode && (
        <JoinCodeBlock>{metadata.joinCode}</JoinCodeBlock>
      )}
      <Flex pt="small" flexDirection="column">
        {metadata.groupLabel && <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Group Label</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{metadata.groupLabel}</ValueText>
          </FlexItem>
        </MetadataRow>}
        {metadata.label && <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Label</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{metadata.label}</ValueText>
          </FlexItem>
        </MetadataRow>}
        {metadata.accessFilters && <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Access Filters</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
          {metadata.accessFilters.length > 0 ? metadata.accessFilters.map((d,i) => {
            let spaceBelow = metadata.accessFilters.length > i+1
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
        </MetadataRow>}
        {metadata.projectName && <MetadataRow pt="small" pb="small">
          <FlexItem flexBasis="35%">
            <KeyText>Project Name</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{metadata.projectName}</ValueText>
          </FlexItem>
        </MetadataRow>}
        {metadata.connectionName && <MetadataRow pt="small" pb="small" style={{borderBottom: `solid 1px ${theme.colors.ui2}`}}>
          <FlexItem flexBasis="35%">
            <KeyText>Connection Name</KeyText>
          </FlexItem>
          <FlexItem flexBasis="65%">
            <ValueText>{metadata.connectionName}</ValueText>
          </FlexItem>
        </MetadataRow>}
      </Flex>
    </SpaceVertical>
    <MetadataFooter
        borderTop={`1px solid ${theme.colors.ui2}`}
        pt="small"
        pb="small"
    >
      <Flex alignItems="left">
        <ExternalLink target="_blank" href={metadata.lookmlLink}>
          <ButtonTransparent
            mr="small"
            ml="small"
            iconBefore="LogoRings"
          >
            Go to LookML
          </ButtonTransparent>
        </ExternalLink>
      </Flex>
    </MetadataFooter>
  </MetadataInfoPanel>
  )
}

export default MetadataPanel
