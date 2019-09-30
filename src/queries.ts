import { sdk } from "./sdk"
import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField
} from "@looker/sdk/dist/sdk/models"

interface FieldInfo {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}

export interface QueryChartTypeTopValues extends FieldInfo {
  type: "Values"
}

export type QueryChartType = QueryChartTypeTopValues

export interface SimpleDatum {
  v: string
  l?: string
}

export interface SimpleResult {
  align: ("left" | "right")[]
  data: SimpleDatum[][]
}

export interface ChartQueryResult {
  queryResponse: SimpleResult
  moreLink?: string
}

const cache = {}
async function localCache<T>(key: string, getter: () => Promise<T>) {
  if (!cache[key]) {
    cache[key] = await getter()
  }
  return cache[key]
}

export async function runChartQuery(
  type: QueryChartType
): Promise<ChartQueryResult> {
  if (type.type == "Values") {
    const result = await localCache(JSON.stringify(type.type), () =>
      getTopValues(type)
    )
    return {
      queryResponse: result
    }
  }
}

function formatData(d: any): SimpleDatum {
  const link = d.links && d.links[0] && d.links[0].url
  if (d.rendered) {
    return { v: d.rendered, l: link }
  } else if (typeof d.value === "string") {
    return { v: d.value }
  } else {
    return { v: `${d.value}`, l: link }
  }
}

export function countFieldForField({
  explore,
  field
}: {
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): ILookmlModelExploreField | undefined {
  return explore.fields.measures.filter(
    f => f.label_short === "Count" && f.view_label == field.view_label
  )[0]
}

export function canGetTopValues({
  model,
  explore,
  field
}: {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}) {
  return (
    field.category === "dimension" && !!countFieldForField({ explore, field })
  )
}

export async function getTopValues({
  model,
  explore,
  field
}: {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): Promise<SimpleResult> {
  const countField = countFieldForField({ explore, field })!
  const qr: any = await sdk.ok(
    sdk.run_inline_query({
      result_format: "json_detail",
      limit: 10,
      body: {
        model: model.name,
        view: explore.name,
        fields: [field.name, countField.name],
        sorts: [`${countField.name} desc`]
      }
    })
  )
  return {
    align: ["left", "right"],
    data: qr.data.map(row => [
      formatData(row[field.name]),
      formatData(row[countField.name])
    ])
  }
}

// export async function getFieldUsage(
//   model: ILookmlModel,
//   explore: ILookmlModelExplore,
//   field: ILookmlModelExploreField
// ): SimpleResult {
//   const qr: any = sdk.ok(
//     sdk.run_inline_query({
//       body: {
//         model: "i__looker",
//         view: "history",
//         filters: {
//           "query.model": JSON.stringify(model.name),
//           "query.view": JSON.stringify(explore.name),
//           "query.formatted_fields": `%${JSON.stringify(field.name)}%`
//         },
//         fields: ["query.formatted_fields", "query.count"]
//       }
//     })
//   )
//   return qr.data.map(row => [row[]])
// }

// https://localhost:9999/explore/i__looker/history?fields=query.model,query.view,query.formatted_fields,query.count&sorts=query.count+desc&limit=500&query_timezone=America%2FLos_Angeles&vis=%7B%7D&filter_config=%7B%7D&dynamic_fields=%5B%5D&origin=share-expanded
