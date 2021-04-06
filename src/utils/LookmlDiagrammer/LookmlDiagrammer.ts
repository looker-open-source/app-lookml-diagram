import { ILookmlModelExplore } from "@looker/sdk/lib/sdk/4.0/models"
import { TABLE_VERTICAL_PADDING, TABLE_DEGREE_STEP, TABLE_ROW_HEIGHT, DIAGRAM_FIELD_STROKE_WIDTH } from "../constants";
import {DiagramMetadata, DiagramDegreeShiftLookup, DiagramDegreeOrderLookup, DiagramField} from './types'
import {
  getJoinedViewsForViews,
  getTableX,
} from './utils'

export class LookmlDiagrammer {
  // For each table, get list of tables joined by way of it
  scaffold: DiagramDegreeOrderLookup;
  // list of view names that have been arranged
  built: string[];
  // keeps track of the vertical distance which has
  // been filled by previous tables for each degree
  shift: DiagramDegreeShiftLookup;
  // keeps track of the order the tables
  // are arranged in vertically for each degree
  yOrder: DiagramDegreeOrderLookup;

  diagramDict: DiagramMetadata;
  buildOrder: string[];
  explore: ILookmlModelExplore

  /**
   * The LookmlDiagrammer class provides a useful interface for passing in an unarranged 
   * diagrammable metadata and getting back the X and Y for each table as well as other
   * metadata such as the vertical order of tables for each degree. 
   * @param diagramDict - diagrammable metadata
   * @param buildOrder - order of view arrangement
   * @param explore - looker explore obj
   */
  constructor(diagramDict: DiagramMetadata, buildOrder: string[], explore: ILookmlModelExplore) {
    this.diagramDict = diagramDict
    this.scaffold = getJoinedViewsForViews(buildOrder, diagramDict, explore)
    this.built = []
    this.shift = {}
    this.yOrder = {}
    this.explore = explore
    this.buildOrder = buildOrder
  }

  /**
   * A recursive function for arranging diagram tables. Starting at the base table,
   * arrange each of its each joined tables to the left and right, switching sides for each
   * table and leaving a gap between tables of same degree. As a table is arranged, join any of its 
   * tables in the direction it was placed off of the base table. 
   * @param table - view name
   * @param degree - number of joins away from base
   */
  arrangeTables(table: string, degree: number) {
    // calculate table X
    let calcX = getTableX(degree)
    // calculate table Y
    let tableLen = this.diagramDict.tableData[table] ? this.diagramDict.tableData[table].length : 1
    this.shift[degree] = typeof(this.shift[degree]) !== 'undefined'
      ? this.shift[degree] + TABLE_VERTICAL_PADDING + tableLen
      : 0 + (Math.abs(degree) * TABLE_DEGREE_STEP) + tableLen + TABLE_VERTICAL_PADDING

    this.yOrder[degree] = this.yOrder[degree] 
      ? [...this.yOrder[degree], table]
      : [table]

    let calcY = ((this.shift[degree] - tableLen) * (TABLE_ROW_HEIGHT+DIAGRAM_FIELD_STROKE_WIDTH))

    this.diagramDict.tableData[table] = this.diagramDict.tableData[table] 
      && this.diagramDict.tableData[table].map((field: DiagramField, i: number) => {
      return {
        ...field,
        diagramX: calcX,
        diagramY: calcY,
        diagramDegree: degree,
        verticalIndex: this.yOrder[degree].length,
      }
    })

    this.diagramDict.tableData[table] && this.built.push(table)
    this.scaffold[table] && this.scaffold[table].forEach((t: string, i: number) => {
      // Assign the next degree for each table joined to the current
      // If current degree = 0, flip tables L and R
      // If degree -1 or 1, join any tables in the same direction
      if (!this.built.includes(t)) {
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
        t && this.arrangeTables(t, nextDegree)
      }
    })
  }

  /**
   * A function for arranging 'stranded' views, or views not joined to the base view
   */
  arrangeRemaining() {
    while (this.buildOrder.length !== this.built.length) {
      let build = this.buildOrder.filter((tableName: string) => {
        return !this.built.includes(tableName)
      })
      build[0] && this.arrangeTables(build[0], 0)
    }
  }

  /**
   * Orchestrate the diagram generation process. Arranges table data in the diagramDict
   * from a base table. Ensures there are no stranded views left behind
   * @param baseViewName - base table name
   */
  getDiagram(baseViewName: string) {
    this.arrangeTables(baseViewName, 0)
    this.arrangeRemaining()
    // Drop any tables that were collected but lack fields and joins 
    Object.keys(this.diagramDict.tableData).forEach(key => this.diagramDict.tableData[key] === undefined 
      && delete this.diagramDict.tableData[key])
    this.diagramDict.yOrderLookup = this.yOrder
    return this.diagramDict
  }
}
