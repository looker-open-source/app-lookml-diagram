import { LookmlObjectMetadata, SelectionInfoPacket } from "../../interfaces"
import { ILookmlModelExplore, ILookmlModelExploreField, ILookmlModelExploreJoins } from '@looker/sdk/lib/sdk/3.1/models';

export function getJoinCodeBlock(join: ILookmlModelExploreJoins) {
  let startLine = `join: ${join.name.toLowerCase()} {\n`
  let typeLine = join.type && `  type: ${join.type}\n`
  let relationLine = join.relationship && `  relationship: ${join.relationship}\n`
  let sqlOnLine = join.sql_on && `  sql_on: ${join.sql_on} ;;\n`
  let fkLine = join.foreign_key && `  foreign_key: ${join.foreign_key} \n`
  let endLine = `}`
  return [startLine, typeLine, relationLine, sqlOnLine, fkLine, endLine].filter(Boolean).join("")
}

export let dateOrDuration = (type: string) => (type.includes("date_") || type.includes("duration_"))

export let getSqlType = (type: string) => {
  if (type.includes("date_")) {
    return "time"
  } else if (type.includes("duration_")) {
    return "duration"
  }
  return type
}

export function getFieldCodeBlock(field: ILookmlModelExploreField, tf: any, selectionInfo: SelectionInfoPacket) {
  let blobStart = dateOrDuration(field.type) ? "dimension_group" : field.category
  let startLine = `${blobStart}: ${getFieldName(field.name, field.type, selectionInfo.grouped)} {\n`
  let keyLine = field.primary_key && `  primary_key: yes\n`
  let typeLine = field.type && `  type: ${getSqlType(field.type)}\n`
  let vfLine = field.value_format && `  value_format: ${field.value_format} ;;\n`
  let tfLine = dateOrDuration(field.type) && `  timeframes: [\n    ${tf.join(",\n    ")}\n  ]\n`
  let sqlLine = field.sql && `  sql: ${field.sql} ;;\n`
  let mapLayerLine = field.map_layer && field.map_layer.name && `  map_layer_name: ${field.map_layer.name}\n`
  let endLine = `}`
  return [startLine, keyLine, typeLine, vfLine, tfLine, sqlLine, mapLayerLine, endLine].filter(Boolean).join("")
}

export function getFieldType(type: string) {
  if (type.includes("DATE_")) {
    return "DATE"
  } else if (type.includes("DURATION_")) {
    return "DURATION"
  }
  return type
}

export function getFieldName(name: string, type: string, dimensionGroup: string) {
  if ((type.includes("duration") || type.includes("date")) && dimensionGroup) {
    return dimensionGroup.split(".")[1].toLowerCase()
  }
  return name.split(".")[1].toLowerCase()
}

export function getJoinMetadata(joinObj: ILookmlModelExploreJoins, lookmlLink: string) {
  let joinTypeRaw = joinObj.type ? joinObj.type : "left_outer"
  return {
    name: joinObj.name,
    lookmlLink: lookmlLink,
    joinCode: getJoinCodeBlock(joinObj),
    joinIconType: joinTypeRaw.replace("_", "-"),
    joinType: joinTypeRaw.replace(/_/g, " ").toUpperCase(),
    joinRelationship: joinObj.relationship && joinObj.relationship.replace(/_/g, " ").toUpperCase(),
  }
}

export function getFieldMetadata(fields: ILookmlModelExploreField[], selectionInfo: SelectionInfoPacket) {
  let field = fields[0]
  // 'lookml_link' only exists on api response if user has "see_lookml"
  // permission. This is a requirement for using the extension. 
  // @ts-ignore
  let lookmlLink = field.lookml_link
  let timeframes = fields.map((f: any) => {
    return f.type.includes("date_") && f.type.replace("date_", "") || f.type.includes("duration_") && f.type.replace("duration_", "")
  })
  let tf = !timeframes.includes(false) ? timeframes : []
  return {
    name: getFieldName(field.name, field.type, selectionInfo.grouped),
    fieldName: field.name.split(".")[0],
    lookmlLink: lookmlLink,
    fieldType: getFieldType(field.type.toUpperCase()),
    description: field.description,
    label: field.label,
    timeframes: !timeframes.includes(false) ? timeframes : [],
    fieldGroupLabel: field.field_group_label,
    valueFormat: field.value_format,
    userAttributeFilterTypes: field.user_attribute_filter_types,
    fieldSql: field.sql,
    primaryKey: field.primary_key,
    fieldCode: getFieldCodeBlock(field, tf, selectionInfo),
    fieldCategory: field.category.toUpperCase(),
  }
}

export function getViewMetadata(viewResponse: any, lookmlLink: string, selectionInfo: SelectionInfoPacket) {
  return {
    name: selectionInfo.name,
    lookmlLink: lookmlLink,
    sqlTableName: viewResponse.currentExplore && viewResponse.currentExplore.name === selectionInfo.name ? viewResponse.currentExplore.sql_table_name : "unknown"
  }
}

export function getExploreMetadata(explore: ILookmlModelExplore, lookmlLink: string) {
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
