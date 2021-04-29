
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
  Flex,
  FlexItem,
  ProgressCircular,
  Text,
  theme
} from "@looker/components"
import styled from "styled-components";
import { LookmlObjectMetadata } from "../../interfaces"
import { canGetDistribution, canGetTopValues } from "../../../utils/queries"
import { QueryChart } from "./QueryChart"
import { UNKNOWN_VIEW_SQLTABLENAME } from "./utils"

const MetadataRow = styled(Flex as any)`
  border-bottom: solid 1px ${(props) => props.theme.colors.ui2};
  width: 100%;
  padding-top: ${(props) => props.theme.sizes.xxsmall};
  padding-bottom: ${(props) => props.theme.sizes.xxsmall};
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
export const getSqlTableNameElement = (tableName: string) => {
  if (tableName === UNKNOWN_VIEW_SQLTABLENAME) {
    return <ValueText>{tableName}</ValueText> 
  }
  return <CodeText>{tableName}</CodeText> 
}

const MetadataPanelTable: React.FC<{
  metadata: LookmlObjectMetadata,
  model?: any,
  explore?: any,
  field?: any
}> = ({
  metadata,
  model,
  explore,
  field
}) => {
	return (
  <Flex flexDirection="column">
    {metadata.fieldName && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>View Name</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <CodeText>{metadata.fieldName}</CodeText>
      </FlexItem>
    </MetadataRow>}
    {metadata.lookmlObject === "view" && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>SQL Table Name</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        {!metadata.sqlTableName ?
        <ProgressCircular size="small" /> :
        getSqlTableNameElement(metadata.sqlTableName)
        }
      </FlexItem>
    </MetadataRow>}
    {metadata.label && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.label}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.viewLabel && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>View Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.viewLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.groupLabel && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Group Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.groupLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.fieldGroupLabel && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Field Group Label</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.fieldGroupLabel}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.labelShort && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Label Short</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.labelShort}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.accessFilters && metadata.accessFilters.length > 0 && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Access Filters</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
      {metadata.accessFilters.map((d,i) => {
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
      })}
      </FlexItem>
    </MetadataRow>}
    {metadata.projectName && <MetadataRow>
      <FlexItem flexBasis="35%">
        <KeyText>Project Name</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.projectName}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {metadata.connectionName && <MetadataRow style={{borderBottom: `solid 1px ${theme.colors.ui2}`}}>
      <FlexItem flexBasis="35%">
        <KeyText>Connection Name</KeyText>
      </FlexItem>
      <FlexItem flexBasis="65%">
        <ValueText>{metadata.connectionName}</ValueText>
      </FlexItem>
    </MetadataRow>}
    {model && explore && field && <Flex pb="xxxlarge" mb="medium" flexDirection="column">
      <MetadataRow>
        <FlexItem flexBasis="35%">
          <KeyText>Distribution</KeyText>
        </FlexItem>
        <FlexItem flexBasis="65%">
          <QueryChart
          disabledText={
            "Distributions can only be shown for numeric dimensions on a view with a count measure."
          }
          enabled={canGetDistribution({ model, explore, field })}
          type={{
            type: "Distribution",
            model,
            explore,
            field
          }}
          />
        </FlexItem>
      </MetadataRow>
      <MetadataRow>
        <FlexItem flexBasis="35%">
          <KeyText>Values</KeyText>
        </FlexItem>
        <FlexItem flexBasis="65%">
          <QueryChart
          disabledText={
            "Values can only be shown for dimensions on a view with a count measure."
          }
          enabled={canGetTopValues({ model, explore, field })}
          type={{
            type: "Values",
            model,
            explore,
            field
          }}
          />
        </FlexItem>
      </MetadataRow>
    </Flex>}
  </Flex>
  )
}

export default MetadataPanelTable
