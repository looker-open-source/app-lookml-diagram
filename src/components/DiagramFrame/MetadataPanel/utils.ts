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
import type {
  ILookmlModelExplore,
  ILookmlModelExploreField,
  ILookmlModelExploreJoins,
} from '@looker/sdk/lib/4.0/models'
import type { SelectionInfoPacket } from '../../interfaces'

export const UNKNOWN_VIEW_SQLTABLENAME =
  'This value is known only for views that are also defined as an Explore.'

export function getJoinCodeBlock(join: ILookmlModelExploreJoins) {
  const startLine = `join: ${join.name?.toLowerCase()} {\n`
  const typeLine = join.type && `  type: ${join.type}\n`
  const relationLine =
    join.relationship && `  relationship: ${join.relationship}\n`
  const sqlOnLine = join.sql_on && `  sql_on: ${join.sql_on} ;;\n`
  const fkLine = join.foreign_key && `  foreign_key: ${join.foreign_key} \n`
  const endLine = `}`
  return [startLine, typeLine, relationLine, sqlOnLine, fkLine, endLine]
    .filter(Boolean)
    .join('')
}

export const dateOrDuration = (type: string) =>
  type.includes('date_') || type.includes('duration_')

export const getSqlType = (type: string) => {
  if (type.includes('date_')) {
    return 'time'
  } else if (type.includes('duration_')) {
    return 'duration'
  }
  return type
}

export function getFieldName(
  name: string,
  type: string,
  dimensionGroup: string
) {
  if ((type.includes('duration') || type.includes('date')) && dimensionGroup) {
    return dimensionGroup.split('.')[1].toLowerCase()
  }
  return name.split('.')[1].toLowerCase()
}

export function getFieldCodeBlock(
  field: ILookmlModelExploreField,
  tf: any,
  selectionInfo: SelectionInfoPacket
) {
  const blobStart = dateOrDuration(field.type)
    ? 'dimension_group'
    : field.category
  const startLine = `${blobStart}: ${getFieldName(
    field.name,
    field.type,
    selectionInfo.grouped
  )} {\n`
  const keyLine = field.primary_key && `  primary_key: yes\n`
  const typeLine = field.type && `  type: ${getSqlType(field.type)}\n`
  const vfLine = field.value_format && `  value_format: ${field.value_format}\n`
  const tfLine =
    dateOrDuration(field.type) &&
    `  timeframes: [\n    ${tf.join(',\n    ')}\n  ]\n`
  const sqlLine = field.sql && `  sql: ${field.sql} ;;\n`
  const mapLayerLine =
    field.map_layer &&
    field.map_layer.name &&
    `  map_layer_name: ${field.map_layer.name}\n`
  const endLine = `}`
  return [
    startLine,
    keyLine,
    typeLine,
    vfLine,
    tfLine,
    sqlLine,
    mapLayerLine,
    endLine,
  ]
    .filter(Boolean)
    .join('')
}

export function getFieldType(type: string) {
  if (type.includes('DATE_')) {
    return 'DATE'
  } else if (type.includes('DURATION_')) {
    return 'DURATION'
  }
  return type
}

export function getJoinMetadata(
  joinObj: ILookmlModelExploreJoins,
  lookmlLink: string
) {
  const joinTypeRaw = joinObj.type ? joinObj.type : 'left_outer'
  return {
    name: joinObj.name,
    lookmlLink: lookmlLink,
    joinCode: getJoinCodeBlock(joinObj),
    joinIconType: joinTypeRaw.replace('_', '-'),
    joinType: joinTypeRaw,
    joinRelationship: joinObj.relationship && joinObj.relationship,
  }
}

export function getFieldMetadata(
  fields: ILookmlModelExploreField[],
  selectionInfo: SelectionInfoPacket
) {
  const field = fields[0]
  // 'lookml_link' only exists on api response if user has "see_lookml"
  // permission. This is a requirement for using the extension.
  const lookmlLink = field?.lookml_link
  const timeframes = fields.map((f: any) => {
    return (
      (f.type.includes('date_') && f.type.replace('date_', '')) ||
      (f.type.includes('duration_') && f.type.replace('duration_', ''))
    )
  })
  const tf = !timeframes.includes(false) ? timeframes : []
  return {
    name: getFieldName(field.name, field.type, selectionInfo.grouped),
    fieldName: field.name.split('.')[0],
    lookmlLink: lookmlLink,
    fieldType: getFieldType(field.type),
    description: field.description,
    label: field.label,
    timeframes: !timeframes.includes(false) ? timeframes : [],
    fieldGroupLabel: field.field_group_label,
    valueFormat: field.value_format,
    userAttributeFilterTypes: field.user_attribute_filter_types,
    fieldSql: field.sql,
    primaryKey: field.primary_key,
    fieldCode: getFieldCodeBlock(field, tf, selectionInfo),
    fieldCategory: field.category,
  }
}

export function getViewMetadata(
  viewResponse: ILookmlModelExplore,
  isLoading: boolean,
  lookmlLink: string,
  selectionInfo: SelectionInfoPacket
) {
  let sqlTableName: string
  if (!viewResponse && !isLoading) {
    sqlTableName = UNKNOWN_VIEW_SQLTABLENAME
  }
  if (viewResponse?.name === selectionInfo.name) {
    sqlTableName = viewResponse.sql_table_name
  }
  return {
    name: selectionInfo.name,
    lookmlLink: lookmlLink,
    lookmlObject: 'view',
    sqlTableName,
  }
}

export function getExploreMetadata(
  explore: ILookmlModelExplore,
  lookmlLink: string
) {
  return {
    name: explore.name,
    description: explore.description,
    lookmlLink: lookmlLink,
    connectionName: explore.connection_name,
    label: explore.label,
    groupLabel: explore.group_label,
    projectName: explore.project_name,
    accessFilters: explore.access_filters,
  }
}

export function isSelectedFieldOrDimGroupMember(
  selectionInfo: SelectionInfoPacket,
  field: ILookmlModelExploreField
) {
  const dimensionGroup = field.dimension_group
  if (field.lookml_link === selectionInfo.link) {
    if (field.name === selectionInfo.name) {
      return true
    } else if (
      dimensionGroup === selectionInfo.grouped &&
      (field.name.includes(selectionInfo.name) ||
        selectionInfo.name === field.sql)
    ) {
      return true
    }
  }
  return false
}
