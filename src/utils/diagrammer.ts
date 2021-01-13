import { DetailedModel } from "./fetchers";
import { ILookmlModelExploreFieldset, ILookmlModelExploreField, ILookmlModelExploreJoins } from "@looker/sdk/lib/sdk/4.0/models"
import { exploreFieldURL } from "./urls";
import { ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models";
import { TABLE_VERTICAL_PADDING, TABLE_DEGREE_STEP, TABLE_PADDING, TABLE_ROW_HEIGHT, DIAGRAM_FIELD_STROKE_WIDTH } from "./constants";

export function getFields(exploreFields: ILookmlModelExploreFieldset) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  return fields
}

export function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export function getViews(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[]) {
  let fields = getFields(exploreFields)
  let views = fields.map((field: ILookmlModelExploreField)=>{return field.view}).filter(onlyUnique)
  joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    join.dependent_fields.map((field: string, depFieldIndex: number) => {
      let joinFieldArr = field.split(".")
      let tableRef = views.includes(joinFieldArr[0])
      if (!tableRef) {
        views.push(joinFieldArr[0])
      }
    })
  })
  return views
}

// TODO: refactor and decompose for readility, testability
export function getDiagramDict(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[], diagramPersist: any, explore: ILookmlModelExplore, hiddenToggle: boolean, displayFieldType: string) {
  let fields = getFields(exploreFields)
  let views = getViews(exploreFields, joins)
  let baseViewName: string
  // TODO: type diagramDict
  let diagramDict: any = {}

  let joinSql = joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    return join.sql_on
  })

  // Add table data to DiagramDict for each view
  views.map((viewName: string, viewIndex: number) => {
    let filteredFields = fields.filter((field: ILookmlModelExploreField) => {
      if (hiddenToggle && field.hidden) {
        return false
      }
      if (displayFieldType === "joined") {
        return field.view === viewName && joinSql.map((d: any, i: number) => {
          return d && d.includes("${"+field.name+"}")
        }).includes(true)
      } else if (displayFieldType === "all") {
        return field.view === viewName
      }
    })
    let dimLen = filteredFields.filter((e, j) => {
      return e.view === viewName && e.category === "dimension"
    }).length

    baseViewName = explore.name === viewName && viewName

    diagramDict[viewName] = [
      {category:"view", view: viewName, name: viewName, base: explore.name === viewName, diagramX: 0, diagramY: 0, fieldTypeIndex: 0},
      ...filteredFields.map((datum: any, i: number) => {
        let tableDatum = datum
        tableDatum.diagramX = 0,
        tableDatum.diagramY = 0,
        tableDatum.fieldTypeIndex = datum.category === "dimension" ? i : i - dimLen
        return tableDatum
      }),
    ]
  })
  // Add join data to DiagramDict
  diagramDict._joinData = joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    let joinPath: any[] = []
    if (join.dependent_fields.length > 0) {
      join.dependent_fields.forEach((field: string, depFieldIndex: number) => {
        let joinFieldArr = field.split(".")
        let tableRef = diagramDict[joinFieldArr[0]]
        let fieldIndex = tableRef && tableRef.findIndex((x: ILookmlModelExploreField) => x.name === field)
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
  diagramDict._joinData.sort(function (a: any, b: any) {
    return a.viewName > b.viewName || a.fieldIndex > b.fieldIndex;
  }).map((join: any) => {
    let joinTables = join.map((joinField: any)=>{return joinField.viewName}).filter(onlyUnique)
    joinTables.forEach((tableName: string) => {
      joinCount[tableName] ? joinCount[tableName] = joinCount[tableName] + 1 : joinCount[tableName] = 1
    })
  })

  // console.log(diagramDict._joinData)

  // General order tables would be arranged in, if no joins and no base view
  let buildOrder = views.sort((a: string, b: string)=>{
    return joinCount[a] > joinCount[b] ? -1 : 1;
  })

  // For each table, get list of tables joined by way of it
  let scaffold: any = {}
  buildOrder.map((viewName: string)=>{
    let joined: any[] = []
    diagramDict._joinData.map((join: any)=>{
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
      diagramDict._joinData.forEach((j: any) => {
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

      let aIndex = aObj.fieldIndex + aBaseObj.fieldIndex

      let bIndex = bObj.fieldIndex + bBaseObj.fieldIndex

      if (aIndex < bIndex) {
        return -1
      } else if (aIndex === bIndex && diagramDict[a].length < diagramDict[b].length) {
        return -1
      }
      return 1
    })
    scaffold[viewName] = joined
  })

  function getTableX(index: number, degree: number) {
    return TABLE_PADDING * degree
  }

  let built: string[] = []
  let shift: any = {}
  let yOrder: any = {}

  function arrangeTables(table: string, degree: number) {
    let calcX = getTableX(built.length, degree)

    shift[degree] = shift[degree] 
    ? shift[degree] + TABLE_VERTICAL_PADDING + diagramDict[table].length
    : 0 + (Math.abs(degree) * TABLE_DEGREE_STEP) + diagramDict[table].length + TABLE_VERTICAL_PADDING

    yOrder[degree] = yOrder[degree] 
    ? yOrder[degree] + 1
    : 1

    let calcY = ((shift[degree] - diagramDict[table].length) * (TABLE_ROW_HEIGHT+DIAGRAM_FIELD_STROKE_WIDTH))

    diagramDict[table] = diagramDict[table].map((field: any, i: number) => {
      return {
        ...field,
        diagramX: calcX,
        diagramY: calcY,
        diagramDegree: degree,
        verticalIndex: yOrder[degree],
      }
    })

    built.push(table)
    scaffold[table].forEach((t: string, i: number) => {
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
        arrangeTables(t, nextDegree)
      }
    })
  }
  
  let seed = diagramDict[explore.name] ? explore.name : buildOrder[0]
  arrangeTables(seed, 0)

  // arrange any "stranded" views -- views not joined to the base view
  while (buildOrder.length !== built.length) {
    let build = buildOrder.filter((tableName: string) => {
      return !built.includes(tableName)
    })
    arrangeTables(build[0], 0)
  }

  diagramDict._yOrderLookup = yOrder

  return diagramDict
}

export function getDiagramDimensions(details: DetailedModel, diagramPersist: any, hiddenToggle: boolean, displayFieldType: string) {
  let modifiedDetails: any[] = []
  details && details.explores.map((d,i) => {
    // TODO: type modifiedDetail
    let modifiedDetail = {
      exploreName: d.name,
      modelName: d.model_name,
      diagramDict: getDiagramDict(d.fields, d.joins, diagramPersist[d.name] || {}, d, hiddenToggle, displayFieldType),
    }
    modifiedDetails.push(modifiedDetail)
  })
  return modifiedDetails
}
