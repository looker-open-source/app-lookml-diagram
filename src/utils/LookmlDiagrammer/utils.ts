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
  ILookmlModelExploreFieldset,
  ILookmlModelExploreField,
  ILookmlModelExploreJoins,
  ILookmlModelExplore,
} from '@looker/sdk/lib/4.0/models'
import {
  TABLE_PADDING,
  SHOW_JOINED_FIELDS,
  SHOW_ALL_FIELDS,
} from '../constants'
import type {
  DiagramField,
  DiagramMetadata,
  JoinPopularity,
  DiagramDegreeOrderLookup,
} from './types'

/**
 * takes in an explore fieldset and returns an array of its dims and meas
 * @param exploreFields
 */
export function getFields(exploreFields: ILookmlModelExploreFieldset) {
  const dimensions = exploreFields.dimensions || []
  const measures = exploreFields.measures || []
  return [...dimensions, ...measures]
}

/**
 * checks that the value does not belong more than once in the set
 * @param value
 * @param index
 * @param self
 */
export function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index
}

/**
 * checks that the value is only a string
 * @param value
 */
export function onlyStrings(value: any) {
  return typeof value === 'string' && value.length > 0
}

/**
 * a function which takes in explore parameters and returns a list of unique view names.
 * @param exploreFields - the explore field set
 * @param joins - the explore join set
 * @param exploreName - the name of the current explore
 */
export function getViews(
  exploreFields: ILookmlModelExploreFieldset,
  joins: ILookmlModelExploreJoins[],
  exploreName?: string
) {
  const fields = getFields(exploreFields)
  const views = fields.map((field: ILookmlModelExploreField) => {
    return !(field as any).is_turtle && field.view
  })
  // not all views bring in fields... so we must check join refs too
  joins.forEach((join: ILookmlModelExploreJoins) => {
    const dependentFields = join.dependent_fields || []
    dependentFields.forEach((field: string) => {
      const joinFieldArr = field.split('.')
      const tableRef = views.includes(joinFieldArr[0])
      if (!tableRef) {
        views.push(joinFieldArr[0])
      }
    })
  })
  if (views.length === 0) {
    views.push(exploreName)
  }
  return views.filter(onlyUnique).filter(onlyStrings)
}

/**
 * This function takes in a Lookml explore fieldset and returns the fields that comply with the options found in the View Options panel
 * @param fields - explore field set
 * @param viewName - name of the current view being constructed
 * @param joinSql - all of the explore's join sql for checking if included in joins
 * @param hiddenToggle - view option toggle for hidden fields
 * @param displayFieldType - view option checkbox for displayed fields
 */
export function getFilteredViewFields(
  fields: ILookmlModelExploreField[],
  viewName: string,
  joinSql: string[],
  hiddenToggle: boolean,
  displayFieldType: string
) {
  return fields.filter((field: ILookmlModelExploreField) => {
    if (hiddenToggle && field.hidden) {
      return false
    }
    if (displayFieldType === SHOW_JOINED_FIELDS) {
      return (
        field.view === viewName &&
        joinSql
          .map((d: any) => {
            return d && d.includes('${' + field.name + '}')
          })
          .includes(true)
      )
    } else if (displayFieldType === SHOW_ALL_FIELDS) {
      return field.view === viewName
    }
    return false
  })
}

/**
 * takes in the filtered explore field set and returns a field set with flattened dimension groups
 * @param filteredFields
 */
export function getGrouplessViewFields(
  filteredFields: ILookmlModelExploreField[]
) {
  const grouplessViewFields: DiagramField[] = []
  filteredFields.forEach((f: any) => {
    if (!f.dimension_group) {
      grouplessViewFields.push(f)
    } else {
      const flatYet = grouplessViewFields.filter((ff: any) => {
        return (
          ff.name === f.dimension_group &&
          ff.dimension_group === f.dimension_group
        )
      })
      if (flatYet.length === 0) {
        grouplessViewFields.push({ ...f, name: f.dimension_group })
      }
    }
  })
  return grouplessViewFields
}

/**
 * scans the searchTable for a row with a name of searchTerm, returns the view header index if not
 * @param searchTable
 * @param searchTerm
 */
export function getViewFieldIndex(
  searchTable: DiagramField[],
  searchTerm: string
) {
  let fieldIndex =
    searchTable &&
    searchTable.findIndex((x: any) => {
      return x.name === searchTerm
    })
  // If the field doesn't exist in the diagram view fieldset,
  // point to the diagram view header.
  if (fieldIndex === -1) {
    fieldIndex = 0
  }
  return fieldIndex
}

/**
 * scans the searchTable for a row with a name of searchTerm,
 * or the flattened dimension group field
 * returns the view header index if not
 * @param searchTable
 * @param searchTerm
 */
export function getViewDependentFieldIndex(
  searchTable: DiagramField[],
  searchField: string
) {
  let fieldIndex =
    searchTable &&
    searchTable.findIndex((x: any) => {
      return (
        x.name === searchField ||
        (x.name.includes('.') && searchField === x.name) ||
        (x.name.includes('.') &&
          x.dimension_group &&
          searchField.includes(x.dimension_group))
      )
    })
  if (fieldIndex === -1) {
    // If the field doesn't exist in the diagram view fieldset,
    // point to the diagram view header.
    fieldIndex = 0
  }
  return fieldIndex
}

/**
 * scans the searchTable for the pk row, returns view header index if not
 * @param searchTable
 */
export function getViewPkIndex(searchTable: DiagramField[]) {
  let pkFieldIndex =
    searchTable &&
    searchTable.findIndex((x: any) => {
      return x.primary_key === true
    })
  // If the field doesn't exist in the diagram view fieldset,
  // point to the diagram view header.
  if (pkFieldIndex === -1) {
    pkFieldIndex = 0
  }
  return pkFieldIndex
}

/**
 * For each join count the number of tables joined by it
 * @param diagramDict - diagrammable metadata
 */
export function countJoins(diagramDict: DiagramMetadata) {
  const joinCount: JoinPopularity = {}
  diagramDict.joinData.forEach((join: any) => {
    const joinTables = join
      .map((joinField: any) => {
        return joinField.viewName
      })
      .filter(onlyUnique)
    joinTables.forEach((tableName: string) => {
      joinCount[tableName]
        ? (joinCount[tableName] = joinCount[tableName] + 1)
        : (joinCount[tableName] = 1)
    })
  })
  return joinCount
}

/**
 * For each table in diagramDict, this function returns a list of tables joined by way of it
 * @param buildOrder - initial order of placing tables
 * @param diagramDict - diagrammable metadata
 * @param explore  - looker explore obj
 */
export function getJoinedViewsForViews(
  buildOrder: string[],
  diagramDict: DiagramMetadata,
  explore: ILookmlModelExplore
) {
  const scaffold: DiagramDegreeOrderLookup = {}
  buildOrder.forEach((viewName: string) => {
    const joined: any[] = []
    diagramDict.joinData.forEach((join: any) => {
      const shouldBuild = join.map((joinElement: any) => {
        if (joinElement.viewName === viewName) {
          return true
        }
        return false
      })
      if (shouldBuild.includes(true)) {
        joined.push(
          ...join
            .map((joinField: any) => {
              return joinField.viewName
            })
            .filter(onlyUnique)
            .filter((joinView: string) => {
              return joinView !== viewName
            })
        )
      }
    })
    joined.sort((a: string, b: string) => {
      const aObj: any = {}
      const aBaseObj: any = {}
      const bObj: any = {}
      const bBaseObj: any = {}
      diagramDict.joinData.forEach((j: any) => {
        j.forEach((jf: any) => {
          if (jf.joinName === a && jf.viewName === a) {
            Object.assign(aObj, jf)
          } else if (jf.joinName === a && jf.viewName === viewName) {
            Object.assign(aBaseObj, jf)
          } else if (jf.joinName === b && jf.viewName === b) {
            Object.assign(bObj, jf)
          } else if (jf.joinName === b && jf.viewName === viewName) {
            Object.assign(bBaseObj, jf)
          }
        })
      })

      const aIndex = aBaseObj.fieldIndex

      const bIndex = bBaseObj.fieldIndex

      const aName = diagramDict.tableData[a] ? a : explore.name
      const bName = diagramDict.tableData[b] ? b : explore.name

      if (aIndex < bIndex) {
        return -1
      } else if (
        aIndex === bIndex &&
        diagramDict.tableData[aName].length <
          diagramDict.tableData[bName].length
      ) {
        return -1
      }
      return 1
    })
    scaffold[viewName] = joined
  })
  return scaffold
}

/**
 * A function for X position based on degree
 * @param degree - number of joins from base table
 */
export function getTableX(degree: number) {
  return TABLE_PADDING * degree
}
