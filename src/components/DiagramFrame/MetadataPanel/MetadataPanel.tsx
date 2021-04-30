/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

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

import React from 'react';
import {
  Badge,
  ButtonTransparent,
  Code,
  Flex,
  FlexItem,
  Heading,
  SpaceVertical,
  Paragraph,
  Icon,
  Space,
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  theme
} from "@looker/components"
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk"
import { Explore, LogoRings } from "@looker/icons"
import { VpnKey } from "@styled-icons/material/VpnKey"
import { ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/4.0/models';

import { getFields } from '../../../utils/LookmlDiagrammer/'
import { exploreFieldURL } from '../../../utils/urls'
import { useLookmlModelExplore } from '../../../utils/fetchers'
import { METADATA_PANEL_PIXEL } from "../../../utils/constants"
import { LookmlObjectMetadata, SelectionInfoPacket } from "../../interfaces"
import { ExternalLink } from "../../ExternalLink"
import JoinIcon from "./JoinIcon"
import MetadataPanelTable from "./MetadataPanelTable"
import {MetadataInfoPanel} from "./MetadataInfoPanel"
import {MetadataFooter} from "./MetadataFooter"
import {LookmlCodeBlock} from "./LookmlCodeBlock"
import {getJoinMetadata, getFieldMetadata, getViewMetadata, getExploreMetadata, isSelectedFieldOrDimGroupMember} from "./utils"

export const PillText:React.FC = ({children}) => {
  return <Code color="text3" fontSize="xsmall" lineHeight="medium">{children}</Code>
}

export const MetadataPanel: React.FC<{
  currentExplore: ILookmlModelExplore,
  selectionInfo: SelectionInfoPacket,
  model: ILookmlModel,
}> = ({
  currentExplore,
  selectionInfo,
  model
}) => {
  let metadata: LookmlObjectMetadata
  let field: ILookmlModelExploreField
  // 'lookml_link' only exists on api response if user has "see_lookml"
  // permission. This is a requirement for using the extension. 
  // @ts-ignore
  let exploreLookmlLink = currentExplore.lookml_link
  if (selectionInfo.lookmlElement === "explore") {
    metadata = getExploreMetadata(currentExplore, exploreLookmlLink)
  } else if (selectionInfo.lookmlElement === "join") {
    let joinObj = currentExplore.joins.filter((join: ILookmlModelExploreJoins) => {
      return join.name === selectionInfo.name
    })[0]
    metadata = getJoinMetadata(joinObj, exploreLookmlLink)
  } else if (selectionInfo.lookmlElement === "dimension" || selectionInfo.lookmlElement === "measure") {
    let fields = getFields(currentExplore.fields).filter((field: any) => {
      return isSelectedFieldOrDimGroupMember(selectionInfo, field)
    })
    field = fields[0]
    metadata = getFieldMetadata(fields, selectionInfo)
  } else if (selectionInfo.lookmlElement === "view") {
    const {explore, isLoading} = useLookmlModelExplore(currentExplore.model_name, selectionInfo.name)
    metadata = getViewMetadata(explore, isLoading, exploreLookmlLink, selectionInfo)
  }
	return (
  <MetadataInfoPanel width={`${METADATA_PANEL_PIXEL}px`} px="medium" py="large">
    <SpaceVertical gap="medium">
      {/* NAME */}
      <Heading fontSize="xlarge" style={{fontWeight: 500}}>{metadata.name}</Heading>

      {/* PILLS */}
      {metadata.lookmlObject !== "view" && <Space gap="xsmall">
        {metadata.joinType && 
        <Badge intent="neutral" size="small">
          <Space gap="xxsmall">
            <JoinIcon type={metadata.joinIconType} />
            <PillText>{metadata.joinType}</PillText>
          </Space>
        </Badge>}
        {metadata.joinRelationship && <Badge intent="neutral" size="small"><PillText>{metadata.joinRelationship}</PillText></Badge>}
        {metadata.fieldType && 
          <Badge intent="neutral" size="small">
            <PillText>
              {metadata.fieldType}
            </PillText>
          </Badge>
        }
        {metadata.fieldCategory && 
          <Badge intent="neutral" size="small">
            <PillText>
              {metadata.fieldCategory}
            </PillText>
          </Badge>
        }
        {metadata.primaryKey && 
          <Badge intent="neutral" size="small">
            <Space gap="xxsmall">
              <Icon icon={<VpnKey />} color={theme.colors.text3} size="small" />
              <PillText>primary_key</PillText>
            </Space>
          </Badge>}
      </Space>}

      {/* DESCRIPTION */}
      {metadata.description && (
        <Paragraph>{metadata.description}</Paragraph>
      )}

      {/* JOIN CODE BLOCK */}
      {metadata.joinCode && (
        <LookmlCodeBlock code={metadata.joinCode} />
      )}

      <Box width="100%">
      {metadata.fieldCode ?
        <Tabs>
          <TabList distribute>
            <Tab>Details</Tab>
            <Tab>Code</Tab>
          </TabList>
          <TabPanels pt={0}>
            <TabPanel>
              <MetadataPanelTable metadata={metadata} model={model} explore={currentExplore} field={field} />
            </TabPanel>
            <TabPanel>
            <LookmlCodeBlock code={metadata.fieldCode} />
            </TabPanel>
          </TabPanels>
        </Tabs>
       :
      <MetadataPanelTable metadata={metadata} />
      }
      </Box>

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
            iconBefore={<LogoRings />}
          >
            Go to LookML
          </ButtonTransparent>
        </ExternalLink></FlexItem>
        <FlexItem flexBasis="40%">{field && <ExternalLink
          target="_blank"
          href={exploreFieldURL(currentExplore, field)}
        >
          <ButtonTransparent
            ml="xxxlarge"
            mr="xsmall"
            iconBefore={<Explore />}
          >
            Explore with Field
          </ButtonTransparent>
        </ExternalLink>}</FlexItem>
      </Flex>
    </MetadataFooter>
  </MetadataInfoPanel>
  )
}

