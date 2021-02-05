import React, { useEffect } from 'react';
import {
  Badge,
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
  Tabs,
  Tooltip,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  theme,
  Heading
} from "@looker/components"
import styled from "styled-components";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { ExternalLink } from "./ExternalLink"
import MetadataPanelTable from "./MetadataPanelTable"
import { METADATA_PANEL_PIXEL } from "../utils/constants"
import { LookmlObjectMetadata } from "./interfaces"
import { ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { getFields } from '../utils/diagrammer'
import { exploreFieldURL } from '../utils/urls'
import { verticalAlign } from 'styled-system';

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

const LookmlCodeBlock = styled(CodeBlock as any)`
  background-color: ${(props) => props.theme.colors.neutralSubtle};
  color: ${(props) => props.theme.colors.keyInteractive};
`

const JoinPill = styled(Chip as any)`
  font-family: monospace; 
  border-radius: 20px;
`

const PillText:React.FC = ({children}) => {
  return <Code color="text3" fontSize="xsmall" lineHeight="medium">{children}</Code>
}

function getJoinCodeBlock(join: ILookmlModelExploreJoins) {
  let startLine = `join: ${join.name.toLowerCase()} {\n`
  let typeLine = join.type && `  type: ${join.type}\n`
  let relationLine = join.relationship && `  relationship: ${join.relationship}\n`
  let sqlLine = join.sql_on && `  sql_on: ${join.sql_on} ;;\n`
  let endLine = `}`
  return [startLine, typeLine, relationLine, sqlLine, endLine].filter(Boolean).join("")
}

function getFieldCodeBlock(field: ILookmlModelExploreField) {
  let startLine = `${field.category}: ${field.name.split(".")[1].toLowerCase()} {\n`
  let keyLine = field.primary_key && `  primary_key: yes\n`
  let typeLine = field.type && `  type: ${field.type}\n`
  let vfLine = field.value_format && `  value_format: ${field.value_format} ;;\n`
  let sqlLine = field.sql && `  sql: ${field.sql} ;;\n`
  let mapLayerLine = field.map_layer && field.map_layer.name && `  map_layer_name: ${field.map_layer.name}\n`
  let endLine = `}`
  return [startLine, keyLine, typeLine, vfLine, sqlLine, mapLayerLine, endLine].filter(Boolean).join("")
}

const MetadataPanel: React.FC<{
  explore: ILookmlModelExplore,
  selectionInfo: any,
  model: any,
}> = ({
  explore,
  selectionInfo,
  model
}) => {
  let metadata: LookmlObjectMetadata
  let field: ILookmlModelExploreField
  // console.log(explore, model)
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
    let joinTypeRaw = joinObj.type ? joinObj.type : "left_outer"
    metadata = {
      name: joinObj.name,
      lookmlLink: lookmlLink,
      joinCode: getJoinCodeBlock(joinObj),
      joinIconType: joinTypeRaw.replace("_", "-"),
      joinType: joinTypeRaw.replace(/_/g, " ").toUpperCase(),
      joinRelationship: joinObj.relationship && joinObj.relationship.replace(/_/g, " ").toUpperCase(),
    }
  } else if (selectionInfo.lookmlElement === "dimension" || selectionInfo.lookmlElement === "measure") {
    let fields = getFields(explore.fields).filter((field: any) => {
      return field.name === selectionInfo.name || field.dimension_group === selectionInfo.name
    })
    let timeframes = fields.map((f: any) => {
      return f.type.includes("date_") && f.type.replace("date_", "")
    })
    field = fields[0]
    // @ts-ignore
    let lookmlLink = field.lookml_link
    metadata = {
      name: field.name.split(".")[1],
      fieldName: field.name.split(".")[0],
      lookmlLink: lookmlLink,
      fieldType: field.type.toUpperCase(),
      description: field.description,
      label: field.label,
      timeframes: !timeframes.includes(false) ? timeframes : [],
      // labelShort: field.label_short,
      fieldGroupLabel: field.field_group_label,
      valueFormat: field.value_format,
      userAttributeFilterTypes: field.user_attribute_filter_types,
      fieldSql: field.sql,
      primaryKey: field.primary_key,
      fieldCode: getFieldCodeBlock(field),
      fieldCategory: field.category.toUpperCase(),
    }
  } else if (selectionInfo.lookmlElement === "view") {
    // @ts-ignore
    let lookmlLink = explore.lookml_link
    metadata = {
      name: selectionInfo.name,
      lookmlLink: lookmlLink,
    }
  }
	return (
  <MetadataInfoPanel width={`${METADATA_PANEL_PIXEL}px`} px="medium" py="large">
    <SpaceVertical gap="xlarge">
      {/* NAME */}
      <Heading fontSize="xlarge" style={{fontWeight: 600}}>{metadata.name}</Heading>

      {/* PILLS */}
      <Space gap="xsmall">
        {metadata.joinType && 
        <Badge intent="neutral" size="medium">
          <Flex alignItems="center">
          <img
            src={
              `https://marketplace-api.looker.com/staging/app-assets/join-${metadata.joinIconType}.svg`
            }
            aria-hidden="true"
            style={{height: "24px"}}
          />
          <PillText>{metadata.joinType}</PillText>
          </Flex>
        </Badge>}
        {metadata.joinRelationship && <Badge intent="neutral" size="medium"><PillText>{metadata.joinRelationship}</PillText></Badge>}
        {metadata.fieldType && 
          <Badge intent="neutral" size="medium">
            <PillText>
              {metadata.fieldType}
            </PillText>
          </Badge>
        }
        {metadata.fieldCategory && 
          <Badge intent="neutral" size="medium">
            <PillText>
              {metadata.fieldCategory}
            </PillText>
          </Badge>
       }
        {metadata.primaryKey && 
          <Badge intent="neutral" size="medium">
            <Space gap="xsmall">
            <Icon name="Key" size="xsmall" />
            <PillText>Primary Key</PillText>
            </Space>
          </Badge>
        }
      </Space>

      {/* DESCRIPTION */}
      {metadata.description && (
        <Paragraph fontSize="small" color="text4">{metadata.description}</Paragraph>
      )}

      {/* JOIN CODE BLOCK */}
      {metadata.joinCode && (
        <LookmlCodeBlock>{metadata.joinCode}</LookmlCodeBlock>
      )}

      {metadata.fieldCode ?
      <>
      <Tabs>
        <TabList distribute>
          <Tab>Details</Tab>
          <Tab>Code</Tab>
        </TabList>
        <TabPanels pt={0}>
          <TabPanel>
            <MetadataPanelTable metadata={metadata} model={model} explore={explore} field={field} />
          </TabPanel>
          <TabPanel>
            <LookmlCodeBlock>{metadata.fieldCode}</LookmlCodeBlock>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </> :
      <MetadataPanelTable metadata={metadata} /> }

    </SpaceVertical>
    <MetadataFooter
        borderTop={`1px solid ${theme.colors.ui2}`}
        pt="small"
        pb="small"
    >
      <Flex width="100%">
        <FlexItem flexBasis="60%"><ExternalLink target="_blank" href={metadata.lookmlLink}>
          <ButtonTransparent
            mr="xxxlarge"
            ml="small"
            iconBefore="LogoRings"
          >
            Go to LookML
          </ButtonTransparent>
        </ExternalLink></FlexItem>
        <FlexItem flexBasis="40%">{field && <ExternalLink
          target="_blank"
          href={exploreFieldURL(explore, field)}
        >
          <ButtonTransparent
            ml="xxxlarge"
            mr="xsmall"
            iconBefore="Explore"
          >
            Explore with Field
          </ButtonTransparent>
        </ExternalLink>}</FlexItem>
      </Flex>
    </MetadataFooter>
  </MetadataInfoPanel>
  )
}

export default MetadataPanel
