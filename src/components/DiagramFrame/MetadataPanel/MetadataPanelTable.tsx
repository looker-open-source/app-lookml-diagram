/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

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
import React from 'react'
import {
  Flex,
  Space,
  FlexItem,
  ProgressCircular,
  theme,
} from '@looker/components'
import type {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField,
} from '@looker/sdk/lib/4.0/models'

import { canGetDistribution, canGetTopValues } from '../../../utils/queries'
import type { LookmlObjectMetadata } from '../../interfaces'
import { QueryChart } from './QueryCharts'
import { UNKNOWN_VIEW_SQLTABLENAME } from './utils'
import { LookmlCodeBlock } from './LookmlCodeBlock'
import {
  ValueText,
  MetadataRow,
  KeyText,
  CodeText,
  SubKeyText,
  KeyColumn,
  ValueColumn,
} from './metadata_components'

const getSqlTableNameElement = (tableName: string) => {
  if (tableName === UNKNOWN_VIEW_SQLTABLENAME) {
    return <ValueText>{tableName}</ValueText>
  }
  return <LookmlCodeBlock code={tableName} />
}

/**
 * Presents metadata panel table items amd inline queries
 * for all key/value pairs on the metadata object
 */
const MetadataPanelTable: React.FC<{
  metadata: LookmlObjectMetadata
  model?: ILookmlModel | undefined
  explore?: ILookmlModelExplore | undefined
  field?: ILookmlModelExploreField | undefined
}> = ({ metadata, model, explore, field }) => {
  return (
    <Flex flexDirection="column">
      {metadata.fieldName && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>View Name</KeyText>
          </KeyColumn>
          <ValueColumn>
            <CodeText>{metadata.fieldName}</CodeText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.lookmlObject === 'view' && (
        <Flex flexDirection="column" pt="xxsmall">
          <FlexItem>
            <KeyText>SQL Table Name</KeyText>
          </FlexItem>
          <FlexItem pt="small" style={{ minHeight: '50px' }}>
            {!metadata.sqlTableName ? (
              <Space
                p="medium"
                style={{ backgroundColor: 'rgb(251, 251, 251)' }}
                around
              >
                <ProgressCircular size="small" />
              </Space>
            ) : (
              getSqlTableNameElement(metadata.sqlTableName)
            )}
          </FlexItem>
        </Flex>
      )}
      {metadata.label && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Label</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.label}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.viewLabel && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>View Label</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.viewLabel}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.groupLabel && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Group Label</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.groupLabel}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.fieldGroupLabel && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Field Group Label</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.fieldGroupLabel}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.labelShort && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Label Short</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.labelShort}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.accessFilters && metadata.accessFilters.length > 0 && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Access Filters</KeyText>
          </KeyColumn>
          <ValueColumn>
            {metadata.accessFilters.map((d, i) => {
              const spaceBelow = metadata.accessFilters.length > i + 1
              return (
                <>
                  <FlexItem>
                    <SubKeyText>field: </SubKeyText>
                    <ValueText>{d.field}</ValueText>
                  </FlexItem>
                  <FlexItem pb={spaceBelow && 'small'}>
                    <SubKeyText>user_attribute: </SubKeyText>
                    <ValueText>{d.user_attribute}</ValueText>
                  </FlexItem>
                </>
              )
            })}
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.projectName && (
        <MetadataRow>
          <KeyColumn>
            <KeyText>Project Name</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.projectName}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {metadata.connectionName && (
        // style connectionName as it's last of Explore metadata
        <MetadataRow style={{ borderBottom: `solid 1px ${theme.colors.ui2}` }}>
          <KeyColumn>
            <KeyText>Connection Name</KeyText>
          </KeyColumn>
          <ValueColumn>
            <ValueText>{metadata.connectionName}</ValueText>
          </ValueColumn>
        </MetadataRow>
      )}
      {model && explore && field && (
        <Flex pb="xxxlarge" mb="medium" flexDirection="column">
          <MetadataRow>
            <KeyColumn>
              <KeyText>Distribution</KeyText>
            </KeyColumn>
            <ValueColumn>
              <QueryChart
                disabledText={
                  'Distributions can only be shown for numeric dimensions on a view with a count measure.'
                }
                enabled={canGetDistribution({ model, explore, field })}
                type={{
                  type: 'Distribution',
                  model,
                  explore,
                  field,
                }}
              />
            </ValueColumn>
          </MetadataRow>
          <MetadataRow>
            <KeyColumn>
              <KeyText>Values</KeyText>
            </KeyColumn>
            <ValueColumn>
              <QueryChart
                disabledText={
                  'Values can only be shown for dimensions on a view with a count measure.'
                }
                enabled={canGetTopValues({ model, explore, field })}
                type={{
                  type: 'Values',
                  model,
                  explore,
                  field,
                }}
              />
            </ValueColumn>
          </MetadataRow>
        </Flex>
      )}
    </Flex>
  )
}

export default MetadataPanelTable
