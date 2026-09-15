// © 2019 Google LLC.  All rights reserved.
//
// This software is subject to the Google Cloud Terms of Service, as
// modified by the "General Software Terms" of the Google Cloud Service Specific Terms, available at: https://cloud.google.com/terms/service-terms.

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
  modelName: string | undefined | null
  exploreName: string | undefined | null
  minimapX?: number
  minimapY?: number
  minimapScale?: number
  minimapDefault?: boolean
}
