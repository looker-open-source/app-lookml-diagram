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

import { DetailedModel } from "../fetchers";
import { ILookmlModelExploreJoins, ILookmlModelExplore } from "@looker/sdk/lib/sdk/4.0/models"
import { TABLE_VERTICAL_PADDING, TABLE_DEGREE_STEP, TABLE_ROW_HEIGHT, DIAGRAM_FIELD_STROKE_WIDTH } from "../constants";
import {DiagramMetadata, DiagramJoin, DiagrammedModel} from './types'
import {
  getFields, 
  getViews, 
  getJoinedViewsForView, 
  getFilteredViewFields, 
  getGrouplessViewFields, 
  getViewFieldIndex, 
  getViewPkIndex, 
  getViewDependentFieldIndex,
  countJoins,
  getTableX,
} from './utils'
import {
  getPkJoinPathObj,
  getBaseJoinPathObj,
  getSqlJoinPathObj,
  getJoinPathObj,
  getExploreJoinPathObj,
} from './join-utils'
import {generateMinimapDiagram} from './minimapper'

/**
 * generates all metadata needed for DiagramFrame to present all explores in a given model
 * @param details - looker model response obj
 * @param hiddenToggle - field visibility toggle in 'View Options'
 * @param displayFieldType - field type selection in 'View Options'
 */
export function generateModelDiagrams(details: DetailedModel, hiddenToggle: boolean, displayFieldType: string) {
  let modifiedDetails: DiagrammedModel[] = []
  details && details.explores.map((d: ILookmlModelExplore) => {
    let modifiedDetail: DiagrammedModel = {
      exploreName: d.name,
      modelName: d.model_name,
      diagramDict: generateExploreDiagram(d, hiddenToggle, displayFieldType),
    }
    let minimapDimensions = generateMinimapDiagram(modifiedDetail.diagramDict)
    modifiedDetail.minimapX = minimapDimensions.x
    modifiedDetail.minimapY = minimapDimensions.y
    modifiedDetail.minimapScale = minimapDimensions.scale
    modifiedDetail.minimapDefault = minimapDimensions.default
    modifiedDetails.push(modifiedDetail)
  })
  return modifiedDetails
}

/**
 * generates diagrammable metadata for a given lookml explore.
 * @param explore - looker explore obj
 * @param hiddenToggle - field visibility toggle in 'View Options'
 * @param displayFieldType - field type selection in 'View Options'
 */
export function generateExploreDiagram(explore: ILookmlModelExplore, hiddenToggle: boolean, displayFieldType: string) {
  const exploreFields = explore.fields
  const exploreJoins = explore.joins
  const fields = getFields(exploreFields)
  const views = getViews(exploreFields, exploreJoins, explore.name)

  let diagramDict: DiagramMetadata = {
    joinData: [],
    yOrderLookup: {},
    tableData: {}
  }

  const joinSql = exploreJoins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    return join.sql_on
  })

  // Add table data to DiagramDict for each view
  views.forEach((viewName: string, viewIndex: number) => {
    let filteredFields = getFilteredViewFields(fields, viewName, joinSql, hiddenToggle, displayFieldType)
    let grouplessFilteredFields = getGrouplessViewFields(filteredFields)
    
    let dimLen = grouplessFilteredFields.filter((e, j) => {
      return e.view === viewName && e.category === "dimension"
    }).length

    // add initial table data to the diagram dict
    diagramDict.tableData[viewName] = [{
      category: "view", 
      view: viewName, 
      name: viewName, 
      base: (explore.name === viewName || explore.view_name === viewName), 
      diagramX: 0, 
      diagramY: 0, 
      fieldTypeIndex: 0
    },
    ...grouplessFilteredFields.map((datum: any, i: number) => {
      datum.diagramX = 0,
      datum.diagramY = 0,
      datum.fieldTypeIndex = datum.category === "dimension" ? i : i - dimLen
      return datum
    })
    ]
  })
  
  // Add join data to DiagramDict for each join
  diagramDict.joinData = exploreJoins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    let joinPath: DiagramJoin[] = []
    if (join.foreign_key) {
      let baseTableId = join.foreign_key.includes(".") ? join.foreign_key.split(".")[0] : explore.name
      let baseTableRef = diagramDict.tableData[baseTableId]
      let baseTableLookupValue = join.foreign_key.includes(".") ? join.foreign_key : (explore.name + "." + join.foreign_key)
      let fieldIndex = getViewFieldIndex(baseTableRef, baseTableLookupValue)
      let pkTableRef = diagramDict.tableData[join.name]
      let pkFieldIndex = getViewPkIndex(pkTableRef)

      joinPath.push(getPkJoinPathObj(join, pkTableRef, pkFieldIndex))
      joinPath.push(getBaseJoinPathObj(join, baseTableId, baseTableRef, fieldIndex))
    }
    else if (join.dependent_fields.length > 0) {
      join.dependent_fields.forEach((field: string, depFieldIndex: number) => {
        let joinFieldArr = field.split(".")
        let tableRef = diagramDict.tableData[joinFieldArr[0]]
        let fieldIndex = getViewDependentFieldIndex(tableRef, field)
        if (join.sql_on) {
          join.sql_on.includes("${"+field+"}") && joinPath.push(getSqlJoinPathObj(joinFieldArr, fieldIndex, field, join))
        } else {
          joinPath.push(getSqlJoinPathObj(joinFieldArr, fieldIndex, field, join))
          joinPath.push(getJoinPathObj(join))
        }
      })
    } else {
      joinPath.push(getJoinPathObj(join))
      joinPath.push(getExploreJoinPathObj(explore, join))
    }
    return joinPath
  })

  // General order tables would be arranged in, if no joins and no base view
  const joinCount = countJoins(diagramDict)
  let buildOrder = views.sort((a: string, b: string)=>{
    return joinCount[a] > joinCount[b] ? -1 : 1;
  })

  // For each table, get list of tables joined by way of it
  const scaffold = getJoinedViewsForView(buildOrder, diagramDict, explore)

  let built: string[] = []
  let shift: any = {}
  let yOrder: any = {}

  /**
   * A recursive function for arranging diagram tables. Starting at the base table,
   * arrange each of its each joined tables to the left and right, switching sides for each
   * table and leaving a gap between tables of same degree. As a table is arranged, join any of its 
   * tables in the direction it was placed off of the base table. 
   * @param table - view name
   * @param degree - number of joins away from base
   */
  function arrangeTables(table: string, degree: number) {
    let calcX = getTableX(degree)
    let tableLen = diagramDict.tableData[table] ? diagramDict.tableData[table].length : 1

    shift[degree] = typeof(shift[degree]) !== 'undefined'
    ? shift[degree] + TABLE_VERTICAL_PADDING + tableLen
    : 0 + (Math.abs(degree) * TABLE_DEGREE_STEP) + tableLen + TABLE_VERTICAL_PADDING

    yOrder[degree] = yOrder[degree] 
    ? [...yOrder[degree], table]
    : [table]

    let calcY = ((shift[degree] - tableLen) * (TABLE_ROW_HEIGHT+DIAGRAM_FIELD_STROKE_WIDTH))

    diagramDict.tableData[table] = diagramDict.tableData[table] && diagramDict.tableData[table].map((field: any, i: number) => {
      return {
        ...field,
        diagramX: calcX,
        diagramY: calcY,
        diagramDegree: degree,
        verticalIndex: yOrder[degree].length,
      }
    })

    diagramDict.tableData[table] && built.push(table)
    scaffold[table] && scaffold[table].forEach((t: string, i: number) => {
      // Assign the next degree for each table joined to the current
      // If current degree = 0, flip tables L and R
      // If degree -1 or 1, join any tables in the same direction
      if (!built.includes(t)) {
        let nextDegree = 0
        if (degree === 0 && ((i % 2) === 0)) {
          nextDegree = 1
        } else if (degree === 0 && ((i % 2) !== 0)) {
          nextDegree = -1
        } else if (degree > 0) {
          nextDegree = degree + 1
        } else if (degree < 0) {
          nextDegree = degree - 1
        }
        t && arrangeTables(t, nextDegree)
      }
    })
  }
  
  let seed = diagramDict.tableData[explore.name] ? explore.name : buildOrder[0]
  seed && arrangeTables(seed, 0)

  // arrange any "stranded" views -- views not joined to the base view
  while (buildOrder.length !== built.length) {
    let build = buildOrder.filter((tableName: string) => {
      return !built.includes(tableName)
    })
    build[0] && arrangeTables(build[0], 0)
  }

  // Drop any tables that were collected but
  // lack fields and joins 
  Object.keys(diagramDict.tableData).forEach(key => diagramDict.tableData[key] === undefined && delete diagramDict.tableData[key])

  diagramDict.yOrderLookup = yOrder
  return diagramDict
}
