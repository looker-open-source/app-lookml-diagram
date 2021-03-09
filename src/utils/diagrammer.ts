import { DetailedModel, DiagramError } from "./fetchers";
import { ILookmlModelExploreFieldset, ILookmlModelExploreField, ILookmlModelExploreJoins } from "@looker/sdk/lib/sdk/4.0/models"
import { exploreFieldURL } from "./urls";
import { ILookmlModel, ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models";
import { TABLE_VERTICAL_PADDING, TABLE_WIDTH, TABLE_DEGREE_STEP, TABLE_PADDING, TABLE_ROW_HEIGHT, DIAGRAM_FIELD_STROKE_WIDTH } from "./constants";

export interface DiagramField extends ILookmlModelExploreField {
  diagramX: number
  diagramY: number
  fieldTypeIndex: number
  diagramDegree?: number
  verticalIndex?: number
  base: boolean
  dimension_group?: string
}

export interface DiagramJoin {
  viewName: string 
  fieldIndex: number
  selector: string
  type: string
  joinName: string
  joinObj: ILookmlModelExploreJoins
}

type DiagramTables = {
  [key: string]: DiagramField[]
}

export interface DiagramMetadata {
  joinData: DiagramJoin[][]
  yOrderLookup: any
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

export function getFields(exploreFields: ILookmlModelExploreFieldset) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  return fields
}

export function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export function onlyStrings(value: any, index: any, self: any) {
  return typeof(value) === "string";
}

export function getViews(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[], exploreName?: string) {
  let fields = getFields(exploreFields)
  let views = fields.map((field: ILookmlModelExploreField)=>{return field.view})
  joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    join.dependent_fields.map((field: string, depFieldIndex: number) => {
      let joinFieldArr = field.split(".")
      let tableRef = views.includes(joinFieldArr[0])
      if (!tableRef) {
        views.push(joinFieldArr[0])
      }
    })
  })
  !views.includes(exploreName) && views.push(exploreName)
  return views.filter(onlyUnique).filter(onlyStrings)
}

export function getDiagramDict(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[], explore: ILookmlModelExplore, hiddenToggle: boolean, displayFieldType: string) {
  let fields = getFields(exploreFields)
  let views = getViews(exploreFields, joins, explore.name)

  let diagramDict: DiagramMetadata = {
    joinData: [],
    yOrderLookup: {},
    tableData: {}
  }

  let joinSql = joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    return join.sql_on
  })

  // Add table data to DiagramDict for each view
  views.map((viewName: string, viewIndex: number) => {
    let filteredFields = fields.filter((field: ILookmlModelExploreField) => {
      // filter out hidden fields according to setting
      if (hiddenToggle && field.hidden) {
        return false
      }
      // filter joined fields according to setting
      if (displayFieldType === "joined") {
        return field.view === viewName && joinSql.map((d: any, i: number) => {
          return d && d.includes("${"+field.name+"}")
        }).includes(true)
      } else if (displayFieldType === "all") {
        return field.view === viewName
      }
    })
    let grouplessFilteredFields: DiagramField[] = []
    // flatten the filtered table to exclude dimension grouped fields
    filteredFields.forEach((f: any) => {
      if (!f.dimension_group) {
        grouplessFilteredFields.push(f)
      } else {
        let flatYet = grouplessFilteredFields.filter((ff: any) => {
          return ff.name === f.dimension_group && ff.dimension_group === f.dimension_group
        })
        if (flatYet.length === 0) {
          grouplessFilteredFields.push({...f, name: f.dimension_group})
        }
      }
    })
    
    let dimLen = grouplessFilteredFields.filter((e, j) => {
      return e.view === viewName && e.category === "dimension"
    }).length

    // add initial table data to the diagram dict
    diagramDict.tableData[viewName] = []
    diagramDict.tableData[viewName].push(
      {category:"view", view: viewName, name: viewName, base: (explore.name === viewName || explore.view_name === viewName), diagramX: 0, diagramY: 0, fieldTypeIndex: 0},
      ...grouplessFilteredFields.map((datum: any, i: number) => {
        datum.diagramX = 0,
        datum.diagramY = 0,
        datum.fieldTypeIndex = datum.category === "dimension" ? i : i - dimLen
        return datum
      }),
    )
  })
  // Add join data to DiagramDict
  diagramDict.joinData = joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    let joinPath: DiagramJoin[] = []
    if (join.foreign_key) {
      let baseTableRef = join.foreign_key.includes(".") ? join.foreign_key.split(".")[0] : explore.name
      let baseTableLookup = join.foreign_key.includes(".") ? join.foreign_key : (explore.name + "." + join.foreign_key)
      let tableRef = diagramDict.tableData[baseTableRef]
      let fieldIndex = tableRef && tableRef.findIndex((x: any) => {
        return x.name === baseTableLookup
      })
      if (fieldIndex === -1) {
        // If the field doesn't exist in the diagram view fieldset, 
        // point to the diagram view header.
        fieldIndex = 0
      }
      let pkRef = diagramDict.tableData[join.name]
      let pkFieldIndex = pkRef && pkRef.findIndex((x: any) => {
        return x.primary_key === true
      })
      if (pkFieldIndex === -1) {
        // If the field doesn't exist in the diagram view fieldset, 
        // point to the diagram view header.
        pkFieldIndex = 0
      }
      joinPath.push({
        viewName: join.name, 
        fieldIndex: pkFieldIndex,
        selector: pkRef[pkFieldIndex].name.replace(".","-"),
        type: "core",
        joinName: join.name,
        joinObj: join,
      })
      joinPath.push({
        viewName: baseTableRef, 
        fieldIndex: fieldIndex,
        selector: tableRef[fieldIndex].name.replace(".","-"),
        type: "core",
        joinName: join.name,
        joinObj: join,
      })
    }
    else if (join.dependent_fields.length > 0) {
      join.dependent_fields.forEach((field: string, depFieldIndex: number) => {
        let joinFieldArr = field.split(".")
        let tableRef = diagramDict.tableData[joinFieldArr[0]]
        let fieldIndex = tableRef && tableRef.findIndex((x: any) => {
          return x.name === field || (x.name.includes(".") && field === x.name) || (x.name.includes(".") && x.dimension_group && field.includes(x.dimension_group))
        })
        if (fieldIndex === -1) {
          // If the field doesn't exist in the diagram view fieldset, 
          // point to the diagram view header.
          fieldIndex = 0
        }
        join.sql_on && join.sql_on.includes("${"+field+"}") && joinPath.push({
          viewName: joinFieldArr[0], 
          fieldIndex: fieldIndex,
          selector: field.replace(".","-"),
          type: "core",
          joinName: join.name,
          joinObj: join,
        })

        !join.sql_on && joinPath.push({
          viewName: joinFieldArr[0], 
          fieldIndex: fieldIndex,
          selector: field.replace(".","-"),
          type: "core",
          joinName: join.name,
          joinObj: join,
        })
        !join.sql_on && joinPath.push({
          viewName: join.name, 
          fieldIndex: 0,
          selector: join.name.replace(".","-"),
          type: "core",
          joinName: join.name,
          joinObj: join,
        })
        
      })
    } else {
      joinPath.push({
        viewName: join.name, 
        fieldIndex: 0,
        selector: join.name.replace(".","-"),
        type: "core",
        joinName: join.name,
        joinObj: join,
      })
      joinPath.push({
        viewName: explore.name, 
        fieldIndex: 0,
        selector: join.name.replace(".","-"),
        type: "core",
        joinName: join.name,
        joinObj: join,
      })
    }
    return joinPath
  })
  let joinCount: any = {}
  diagramDict.joinData.map((join: any) => {
    let joinTables = join.map((joinField: any)=>{return joinField.viewName}).filter(onlyUnique)
    joinTables.forEach((tableName: string) => {
      joinCount[tableName] ? joinCount[tableName] = joinCount[tableName] + 1 : joinCount[tableName] = 1
    })
  })

  // General order tables would be arranged in, if no joins and no base view
  let buildOrder = views.sort((a: string, b: string)=>{
    return joinCount[a] > joinCount[b] ? -1 : 1;
  })

  // For each table, get list of tables joined by way of it
  let scaffold: any = {}
  buildOrder.map((viewName: string)=>{
    let joined: any[] = []
    diagramDict.joinData.map((join: any)=>{
      let shouldBuild = join.map((joinElement: any) => {
        if (joinElement.viewName === viewName) {return true}
        return false
      })
      if (shouldBuild.includes(true)) {
        joined.push(...join.map((joinField: any)=>{return joinField.viewName}).filter(onlyUnique).filter((joinView:string)=>{return joinView !== viewName}))
      }
    })
    joined.sort((a: string, b: string) => {
      let aObj: any = {}
      let aBaseObj: any = {}
      let bObj: any = {}
      let bBaseObj: any = {}
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

      let aIndex = aBaseObj.fieldIndex

      let bIndex = bBaseObj.fieldIndex

      let aName = diagramDict.tableData[a] ? a : explore.name
      let bName = diagramDict.tableData[b] ? b : explore.name

      if (aIndex < bIndex) {
        return -1
      } else if (aIndex === bIndex && diagramDict.tableData[aName].length < diagramDict.tableData[bName].length) {
        return -1
      }
      return 1
    })
    scaffold[viewName] = joined
  })

  // A function for X position based on degree
  function getTableX(degree: number) {
    return TABLE_PADDING * degree
  }

  let built: string[] = []
  let shift: any = {}
  let yOrder: any = {}

  // A recursive function for arranging the diagram tables
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

export function getDiagramDimensions(details: DetailedModel, hiddenToggle: boolean, displayFieldType: string) {
  let modifiedDetails: DiagrammedModel[] = []
  details && details.explores.map((d: ILookmlModelExplore) => {
    let modifiedDetail: DiagrammedModel = {
      exploreName: d.name,
      modelName: d.model_name,
      diagramDict: getDiagramDict(d.fields, d.joins, d, hiddenToggle, displayFieldType),
    }
    let minimapDimensions = getMinimapDimensions(modifiedDetail.diagramDict)
    modifiedDetail.minimapX = minimapDimensions.x
    modifiedDetail.minimapY = minimapDimensions.y
    modifiedDetail.minimapScale = minimapDimensions.scale
    modifiedDetail.minimapDefault = minimapDimensions.default
    modifiedDetails.push(modifiedDetail)
  })
  return modifiedDetails
}

export function getMinimapDimensions(currentDimensions: DiagramMetadata) {
  let median: number
  let minDegree: number
  let maxDegree: number

  let maxLength = 0

  if (currentDimensions) {
    // figure out the horizontal breadth of diagram
    let currentDegrees = currentDimensions && Object.keys(currentDimensions.yOrderLookup).map((d: string)=>{return +d}).sort((a: number, b: number) => a - b)
    minDegree = currentDimensions && Math.min(...currentDegrees)
    maxDegree = currentDimensions && Math.max(...currentDegrees)
  
    let len = currentDegrees && currentDegrees.length
  
    let mid = currentDegrees && Math.ceil(len / 2);
    
    // figure out which degree is the middle
    median = ((len % 2) == 0) ? (currentDegrees[mid] + currentDegrees[mid - 1]) / 2 : currentDegrees[mid - 1];

    Object.keys(currentDimensions.yOrderLookup).forEach((d: string) => {
      let degreeTablesLength = currentDimensions.yOrderLookup[d].map((tableName: string) => {
        let undefModel = typeof(currentDimensions.tableData[tableName]) === "undefined"
        return undefModel || currentDimensions.tableData[tableName].length + TABLE_VERTICAL_PADDING
      }).reduce((a: number, b: number) => a + b, 0)
      if (degreeTablesLength > maxLength) {
        maxLength = degreeTablesLength
      }
    })
  }
  let verticalCheck = 150 / (maxLength * (TABLE_ROW_HEIGHT + DIAGRAM_FIELD_STROKE_WIDTH))
  let horizontalCheck = 300 / ((1 + Math.max(Math.abs(minDegree), Math.abs(maxDegree))) * (TABLE_PADDING+TABLE_WIDTH))
  let minimapScale = Math.min(verticalCheck, horizontalCheck)

  // shift to put the median degree in the middle
  let medianCorrection = median > 0 
  ? -1 * median * TABLE_PADDING
  : Math.abs(median) * TABLE_PADDING

  let minimapX = 150 - (TABLE_WIDTH / 2 * minimapScale) + (medianCorrection * minimapScale)
  let minimapY = (Math.max(Math.abs(minDegree), Math.abs(maxDegree)) + 1) * (TABLE_DEGREE_STEP * -1)

  // show minimap by default if degree > 2 or more than 40 rows
  let defaultMinimap = Math.max(Math.abs(minDegree), Math.abs(maxDegree)) > 2 || maxLength > 40 ? true : false

  return {
    scale: minimapScale, x: minimapX, y: minimapY, default: defaultMinimap
  }
}
