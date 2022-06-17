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
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField,
} from '@looker/sdk/lib/3.1/models'
import type { Looker31SDK as LookerSDK } from '@looker/sdk/lib/3.1/methods'
import { exploreURL } from './urls'

export const globalCache: any = {}

export async function loadCached<T>(
  key: string,
  callback: () => Promise<T>
): Promise<T> {
  if (globalCache[key]) {
    return globalCache[key]
  } else {
    const val = await callback()
    /* eslint-disable require-atomic-updates */
    globalCache[key] = val
    return val
  }
}

interface FieldInfo {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}

export interface QueryChartTypeTopValues extends FieldInfo {
  type: 'Values' | 'Distribution'
}

export type QueryChartType = QueryChartTypeTopValues

export interface SimpleDatum {
  v: string
  l?: string
  n?: number
}

export interface SimpleResult {
  align: ('left' | 'right')[]
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
  const number = typeof d.value === 'number' ? d.value : undefined
  return { v: string, l: link, n: number }
}

export function countFieldForField({
  explore,
  field,
}: {
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): ILookmlModelExploreField | undefined {
  return (
    explore.fields.measures.filter(
      (f) => f.type.includes('count') && f.view_label === field.view_label
    )[0] || { name: 'provided_count' }
  )
}

export function canGetTopValues({
  field,
}: {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}) {
  return field.category === 'dimension'
}

export function canGetDistribution({
  explore,
  field,
}: {
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}) {
  return (
    field.is_numeric &&
    field.category === 'dimension' &&
    !!countFieldForField({ explore, field })
  )
}

export async function getTopValues({
  sdk,
  model,
  explore,
  field,
}: {
  sdk: LookerSDK
  model: ILookmlModel
  explore: ILookmlModelExplore
  field: ILookmlModelExploreField
}): Promise<SimpleResult> {
  const countField = countFieldForField({ explore, field })
  const qr: any = await sdk.ok(
    sdk.run_inline_query({
      result_format: 'json_detail',
      limit: 10,
      body: {
        total: true,
        model: model.name,
        view: explore.name,
        fields: [field.name, countField.name],
        dynamic_fields: JSON.stringify([
          {
            measure: 'provided_count',
            type: 'count',
            based_on: field.name,
          },
        ]),
        sorts: [`${countField.name} desc`],
      },
    })
  )
  /* eslint-disable */
  const data = qr?.data?.map((row: any) => [
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
  const countField = countFieldForField({ explore, field })
  let histDynFields = [
    {
      measure: "provided_min",
      type: "min",
      based_on: field.name
    },
    {
      measure: "provided_max",
      type: "max",
      based_on: field.name
    },
    {
      measure: "provided_average",
      type: "average",
      based_on: field.name
    },
    {
      measure: "provided_count",
      type: "count",
      based_on: field.name
    }
  ]
  const qr: any = await sdk.ok(
    sdk.run_inline_query({
      result_format: "json_detail",
      apply_formatting: true,
      limit: 10,
      body: {
        model: model.name,
        view: explore.name,
        fields: ["provided_min", "provided_max", "provided_average", "provided_count"],
        dynamic_fields: JSON.stringify(histDynFields)
      }
    })
  )
  const min = qr.data[0].provided_min
  const max = qr.data[0].provided_max
  const average = qr.data[0].provided_average
  const count = qr.data[0].provided_count

  const binCount = 20
  const range = Math.abs(max.value - min.value)
  const binSize = range / binCount
  const bins: [number, number][] = []
  for (let i = 0; i < binCount; i++) {
    bins.push([min.value + binSize * i, min.value + binSize * (i + 1)])
  }

  let histogram
  if (typeof(min.value) === "number") {
    const ref = "${" + field.name + "}"
    const binClauses = bins
      .map(([min, max], i) => `if(${ref} <= ${max}, ${i}, null)`)
      .join(",\n")
    const binExpression = `coalesce(${binClauses})`
    let binDynFields: any = [
      { dimension: "bin", expression: binExpression },
      {
        measure: "provided_count",
        type: "count",
        based_on: field.name
      }
    ]
    const histogramQR: any = await sdk.ok(
      sdk.run_inline_query({
        result_format: "json_detail",
        apply_formatting: true,
        limit: 10,
        body: {
          model: model.name,
          view: explore.name,
          fields: ["bin", countField.name],
          dynamic_fields: JSON.stringify(binDynFields)
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
      [{ v: "Min" }, { v: (typeof(min.value) === "number" && min.value.toLocaleString()) || "No Data" }],
      [{ v: "Max" }, { v: (typeof(max.value) === "number" && max.value.toLocaleString()) || "No Data" }],
      [
        { v: "Average" },
        { v: (typeof(average.value) === "number" && average.value.toLocaleString()) || "No Data" }
      ],
      [{ v: "Count" }, { v: (typeof(count.value) === "number" && count.value.toLocaleString()) || "No Data" }],
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
