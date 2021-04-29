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
import {DiagramMetadata, DiagramJoin, DiagrammedModel, DiagramField} from './types'
import {
  getFields, 
  getViews, 
  getFilteredViewFields, 
  getGrouplessViewFields, 
  getViewFieldIndex, 
  getViewPkIndex, 
  getViewDependentFieldIndex,
  countJoins,
} from './utils'
import {
  getPkJoinPathObj,
  getBaseJoinPathObj,
  getSqlJoinPathObj,
  getJoinPathObj,
  getExploreJoinPathObj,
} from './join-utils'
import {generateMinimapDiagram} from './minimapper'
import {LookmlDiagrammer} from './LookmlDiagrammer'

/**
 * generates all metadata needed for DiagramFrame to present all explores in a given model
 * @param details - looker model response obj
 * @param hiddenToggle - field visibility toggle in 'View Options'
 * @param displayFieldType - field type selection in 'View Options'
 */
export function generateModelDiagrams(details: DetailedModel, hiddenToggle: boolean, displayFieldType: string) {
  let modifiedDetails: DiagrammedModel[] = []
  details?.explores?.map((d: ILookmlModelExplore) => {
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
  let baseViewName = ""

  // diagrammable metadata for a given explore
  // the structure is well suited for d3 and SVG
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
    const filteredFields = getFilteredViewFields(fields, viewName, joinSql, hiddenToggle, displayFieldType)
    const grouplessFilteredFields = getGrouplessViewFields(filteredFields)
    
    let dimLen = grouplessFilteredFields.filter((e, j) => {
      return e.view === viewName && e.category === "dimension"
    }).length

    const firstSetName = explore.sets[0].name
    if (baseViewName === "" && (explore.name === viewName || firstSetName === viewName || firstSetName.split(".")[0] === viewName)) {
      baseViewName = viewName
    }

    // add initial table data to the diagram dict
    diagramDict.tableData[viewName] = [{
      category: "view", 
      view: viewName, 
      name: viewName, 
      base: viewName === baseViewName, 
      diagramX: 0, 
      diagramY: 0, 
      fieldTypeIndex: 0
    },
    ...grouplessFilteredFields.map((datum: DiagramField, i: number) => {
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
      let baseTableId = join.foreign_key.includes(".") 
        ? join.foreign_key.split(".")[0] 
        : explore.name
      let baseTableRef = diagramDict.tableData[baseTableId]
      let baseTableLookupValue = join.foreign_key.includes(".")
        ? join.foreign_key 
        : (explore.name + "." + join.foreign_key)
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
          join.sql_on.includes("${"+field+"}") 
            && joinPath.push(getSqlJoinPathObj(joinFieldArr, fieldIndex, field, join))
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

  // General order tables would be arranged in, if no base view
  const joinCount = countJoins(diagramDict)
  let buildOrder = views.sort((a: string, b: string)=>{
    return joinCount[a] > joinCount[b] ? -1 : 1;
  })

  const diagrammer = new LookmlDiagrammer(diagramDict, buildOrder, explore)
  
  const startTableName = baseViewName !== "" ? baseViewName : buildOrder[0]

  Object.assign(diagramDict, diagrammer.getDiagram(startTableName))

  return diagramDict
}
