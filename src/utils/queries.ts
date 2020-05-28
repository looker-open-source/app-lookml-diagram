import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField
} from '@looker/sdk/dist/sdk/3.1/models'
import { exploreURL } from "./urls"
import { Looker31SDK as LookerSDK } from '@looker/sdk/dist/sdk/3.1/methods'
import { loadCached } from "./fetchers"

interface FieldInfo {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}

export interface QueryChartTypeTopValues extends FieldInfo {
  type: "Values" | "Distribution"
}

export type QueryChartType = QueryChartTypeTopValues

export interface SimpleDatum {
  v: string
  l?: string
  n?: number
}

export interface SimpleResult {
  align: ("left" | "right")[]
  data: SimpleDatum[][]
  max: (number | undefined)[]
  aux?: string
  histogram?: Histogram
  moreLink?: string
}

export interface Histogram {
  data: { value: number; min: number; max: number }[]
}

function formatData(d: any): SimpleDatum {
  const link = d.links && d.links[0] && d.links[0].url
  const string = d.rendered || `${d.value}`
  const number = typeof d.value === "number" ? d.value : undefined
  return { v: string, l: link, n: number }
}

export function countFieldForField({
  explore,
  field
}: {
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): ILookmlModelExploreField | undefined {
  return explore.fields.measures.filter(
    f => f.label_short === "Count" && f.view_label === field.view_label
  )[0]
}

export function canGetTopValues({
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

export function canGetDistribution({
  explore,
  field
}: {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}) {
  return (
    field.is_numeric &&
    field.category === "dimension" &&
    !!countFieldForField({ explore, field })
  )
}

export async function getTopValues({
  sdk,
  model,
  explore,
  field
}: {
  sdk: LookerSDK
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
        total: true,
        model: model.name,
        view: explore.name,
        fields: [field.name, countField.name],
        sorts: [`${countField.name} desc`]
      }
    })
  )
  const data = qr.data.map((row: any) => [
    formatData(row[field.name]),
    formatData(row[countField.name])
  ])
  return {
    align: ["left", "right"],
    data,
    max: [undefined, data.length ? +data[0][1].n : undefined],
    moreLink: `${exploreURL(explore)}?fields=${encodeURIComponent(
      field.name
    )},${encodeURIComponent(countField.name)}&sorts=${encodeURIComponent(
      `${countField.name} desc`
    )}`
  }
}

export async function getDistribution({
  sdk,
  model,
  explore,
  field
}: {
  sdk: LookerSDK
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): Promise<SimpleResult> {
  const countField = countFieldForField({ explore, field })!
  const qr: any = await sdk.ok(
    sdk.run_inline_query({
      result_format: "json_detail",
      apply_formatting: true,
      limit: 10,
      body: {
        model: model.name,
        view: explore.name,
        fields: ["min", "max", "average", "count"],
        dynamic_fields: JSON.stringify([
          {
            measure: "min",
            type: "min",
            based_on: field.name
          },
          {
            measure: "max",
            type: "max",
            based_on: field.name
          },
          {
            measure: "average",
            type: "average",
            based_on: field.name
          },
          {
            measure: "count",
            type: "count",
            based_on: field.name
          }
        ])
      }
    })
  )
  const min = qr.data[0].min
  const max = qr.data[0].max
  const average = qr.data[0].average
  const count = qr.data[0].count

  const binCount = 20
  const range = Math.abs(max.value - min.value)
  const binSize = range / binCount
  const bins: [number, number][] = []
  for (let i = 0; i < binCount; i++) {
    bins.push([min.value + binSize * i, min.value + binSize * (i + 1)])
  }

  let histogram
  if (min.value) {
    const ref = "${" + field.name + "}"
    const binClauses = bins
      .map(([min, max], i) => `if(${ref} <= ${max}, ${i}, null)`)
      .join(",\n")
    const binExpression = `coalesce(${binClauses})`

    const histogramQR: any = await sdk.ok(
      sdk.run_inline_query({
        result_format: "json_detail",
        apply_formatting: true,
        limit: 10,
        body: {
          model: model.name,
          view: explore.name,
          fields: ["bin", countField.name],
          dynamic_fields: JSON.stringify([
            { dimension: "bin", expression: binExpression }
          ])
        }
      })
    )

    histogram = {
      data: bins.map(([min, max], i) => {
        const row = histogramQR.data.filter((d: any) => d.bin.value === i)[0]
        return {
          value: row ? row[countField.name].value : 0,
          min,
          max
        }
      })
    }
  }

  return {
    align: ["left", "right"],
    histogram,
    data: [
      [{ v: "Min" }, { v: (min.value && min.value.toLocaleString()) || "–" }],
      [{ v: "Max" }, { v: (max.value && max.value.toLocaleString()) || "–" }],
      [
        { v: "Average" },
        { v: (average.value && average.value.toLocaleString()) || "–" }
      ],
      [{ v: "Count" }, { v: (count.value && count.value.toLocaleString()) || "–" }],
    ],
    max: [undefined, undefined]
  }
}

export async function runChartQuery(
  sdk: LookerSDK,
  type: QueryChartType
): Promise<SimpleResult> {
  if (type.type === "Values") {
    const result = await loadCached(JSON.stringify(type), () =>
      getTopValues({ sdk, ...type })
    )
    return result
  } else if (type.type === "Distribution") {
    const result = await loadCached(JSON.stringify(type), () =>
      getDistribution({ sdk, ...type })
    )
    return result
  }
}
