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
  ILookmlModelExploreField,
  ILookmlModelExploreJoins,
} from '@looker/sdk/lib/4.0/models'

export interface DiagramField
  extends Omit<ILookmlModelExploreField, 'category'> {
  diagramX: number
  diagramY: number
  fieldTypeIndex: number
  diagramDegree?: number
  verticalIndex?: number
  base: boolean
  dimension_group?: string
  category: string
}

export interface DiagramJoin {
  viewName?: string
  fieldIndex?: number
  selector?: string
  type?: string
  joinName?: string
  joinObj?: ILookmlModelExploreJoins
  joinX?: number
  joinY?: number
}

type DiagramTables = {
  [key: string]: DiagramField[]
}

export type JoinPopularity = {
  [key: string]: number
}

export type DiagramDegreeShiftLookup = {
  [key: string]: number
}

export type DiagramDegreeOrderLookup = {
  [key: string]: string[]
}

export interface DiagramMetadata {
  joinData: DiagramJoin[][]
  yOrderLookup: DiagramDegreeOrderLookup
  tableData: DiagramTables
}

export interface DiagrammedModel {
  diagramDict: DiagramMetadata
  modelName: string
  exploreName: string
  minimapX?: number
  minimapY?: number
  minimapScale?: number
  minimapDefault?: boolean
}
