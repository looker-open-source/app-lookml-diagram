import React, { useEffect } from 'react';
import {
  Box,
  Badge,
  ButtonTransparent,
  CodeBlock,
  Code,
  Chip,
  Flex,
  FlexItem,
  Heading,
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
  theme
} from "@looker/components"
import styled from "styled-components";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { ExternalLink } from "./ExternalLink"
import JoinIcon from "./JoinIcon"
import MetadataPanelTable from "./MetadataPanelTable"
import { METADATA_PANEL_PIXEL } from "../utils/constants"
import { LookmlObjectMetadata } from "./interfaces"
import { ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';
import { getFields } from '../utils/diagrammer'
import { exploreFieldURL } from '../utils/urls'
import { useExplore } from '../utils/fetchers'

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

// const PillText = styled(FlexItem as any)`
//   font-family: monospace;
// `

const PillText:React.FC = ({children}) => {
  return <Code color="text3" fontSize="xsmall" lineHeight="medium">{children}</Code>
}

function getJoinCodeBlock(join: ILookmlModelExploreJoins) {
  let startLine = `join: ${join.name.toLowerCase()} {\n`
  let typeLine = join.type && `  type: ${join.type}\n`
  let relationLine = join.relationship && `  relationship: ${join.relationship}\n`
  let sqlLine = join.sql_on && `  sql_on: ${join.sql_on} ;;\n`
  let fkLine = join.foreign_key && `  foreign_key: ${join.foreign_key} \n`
  let endLine = `}`
  return [startLine, typeLine, relationLine, sqlLine, fkLine, endLine].filter(Boolean).join("")
}

let dateOrDuration = (type: string) => (type.includes("date_") || type.includes("duration_"))

let getSqlType = (type: string) => {
  if (type.includes("date_")) {
    return "time"
  } else if (type.includes("duration_")) {
    return "duration"
  }
  return type
}

function getFieldCodeBlock(field: ILookmlModelExploreField, tf: any) {
  let blobStart = dateOrDuration(field.type) ? "dimension_group" : field.category
  let startLine = `${blobStart}: ${getFieldName(field.name, field.type)} {\n`
  let keyLine = field.primary_key && `  primary_key: yes\n`
  let typeLine = field.type && `  type: ${getSqlType(field.type)}\n`
  let vfLine = field.value_format && `  value_format: ${field.value_format} ;;\n`
  let tfLine = dateOrDuration(field.type) && `  timeframes: [\n    ${tf.join(",\n    ")}\n  ]\n`
  let sqlLine = field.sql && `  sql: ${field.sql} ;;\n`
  let mapLayerLine = field.map_layer && field.map_layer.name && `  map_layer_name: ${field.map_layer.name}\n`
  let endLine = `}`
  return [startLine, keyLine, typeLine, vfLine, tfLine, sqlLine, mapLayerLine, endLine].filter(Boolean).join("")
}

function getFieldType(type: string) {
  if (type.includes("_DATE")) {
    return "DATE"
  } else if (type.includes("DURATION_")) {
    return "DURATION"
  }
  return type
}

function getFieldName(name: string, type: string) {
  name = name.split(".")[1].toLowerCase()
  if (type.includes("duration_")) {
    return name.split("_")[1]
  } else if (name.includes("_date") && type.includes("_date")) {
    return name.split("_date")[0]
  }
  return name
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
    let nameRegex = new RegExp(selectionInfo.name.replace(".",".*"))
    let fields = getFields(explore.fields).filter((field: any) => {
      return (field.name === selectionInfo.name || field.name.includes(selectionInfo.name) || nameRegex.test(field.name)) && field.dimension_group === selectionInfo.grouped
    })
    let timeframes = fields.map((f: any) => {
      return f.type.includes("date_") && f.type.replace("date_", "") || f.type.includes("duration_") && f.type.replace("duration_", "")
    })
    field = fields[0]
    // @ts-ignore
    let lookmlLink = field.lookml_link
    let tf = !timeframes.includes(false) ? timeframes : []
    metadata = {
      name: getFieldName(field.name, field.type),
      fieldName: field.name.split(".")[0],
      lookmlLink: lookmlLink,
      fieldType: getFieldType(field.type.toUpperCase()),
      description: field.description,
      label: field.label,
      timeframes: !timeframes.includes(false) ? timeframes : [],
      // labelShort: field.label_short,
      fieldGroupLabel: field.field_group_label,
      valueFormat: field.value_format,
      userAttributeFilterTypes: field.user_attribute_filter_types,
      fieldSql: field.sql,
      primaryKey: field.primary_key,
      fieldCode: getFieldCodeBlock(field, tf),
      fieldCategory: field.category.toUpperCase(),
    }
  } else if (selectionInfo.lookmlElement === "view") {
    let viewResponse = useExplore(explore.model_name, selectionInfo.name)
    // @ts-ignore
    let lookmlLink = explore.lookml_link
    metadata = {
      name: selectionInfo.name,
      lookmlLink: lookmlLink,
      sqlTableName: viewResponse.currentExplore && viewResponse.currentExplore.name === selectionInfo.name ? viewResponse.currentExplore.sql_table_name : "unknown"
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
            <JoinIcon type={metadata.joinIconType}/>
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
          </Badge>}
      </Space>

      {/* DESCRIPTION */}
      {metadata.description && (
        <Paragraph>{metadata.description}</Paragraph>
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
