import React, { useEffect } from 'react';
import {
  Box,
  ButtonTransparent,
  CodeBlock,
  Code,
  Chip,
  Flex,
  FlexItem,
  Text,
  SpaceVertical,
  Paragraph,
  Aside,
  Footer,
  Icon,
  Space,
  theme
} from "@looker/components"
import styled from "styled-components";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { ExternalLink } from "./ExternalLink"
import { METADATA_PANEL_PIXEL } from "../utils/constants"
import { LookmlObjectMetadata } from "./interfaces"
import { ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { getFields } from '../utils/diagrammer'

const MetadataRow = styled(Flex as any)`
  border-top: solid 1px ${(props) => props.theme.colors.ui2};
  width: 100%;
`
const KeyText = styled(Text as any)`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
`
const CodeText = styled(Text as any)`
  font-family: monospace;
  font-weight: 400;
`
const ValueText = styled(Text as any)`
  font-weight: 400;
`

const MetadataPanelTable: React.FC<{
  metadata: LookmlObjectMetadata,
}> = ({
  metadata,
}) => {
	return (
  <Flex flexDirection="column">
    {metadata.label && <Flex pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.label}</ValueText>
      </FlexItem>
    </Flex>}
    {metadata.viewLabel && <MetadataRow pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>View Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.viewLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.groupLabel && <MetadataRow pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>Group Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.groupLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.fieldGroupLabel && <MetadataRow pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>Field Group Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.fieldGroupLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.labelShort && <MetadataRow pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>Label Short</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.labelShort}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.valueFormat && <MetadataRow pt="small" pb="small">
      <FlexItem flexBasis="35%">
        <KeyText>Value Format</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <Code>{metadata.valueFormat}</Code>
      </FlexItem>
    </MetadataRow>}
    {metadata.fieldName && <MetadataRow pt="small" pb="small" style={{borderBottom: `solid 1px ${theme.colors.ui2}`}}>
      <FlexItem flexBasis="35%">
        <KeyText>Field Name</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <CodeText>{metadata.fieldName}</CodeText>
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
  )
}

export default MetadataPanelTable
