import { DetailedModel } from "./fetchers";
import { ILookmlModelExploreFieldset, ILookmlModelExploreField, ILookmlModelExploreJoins } from "@looker/sdk/lib/sdk/4.0/models"
import { exploreFieldURL } from "./urls";
import { ILookmlModelExplore } from "@looker/sdk/lib/sdk/3.1/models";
import { getRowOffset } from "../d3-utils/position";
import { TABLE_WIDTH } from "./constants";

// TODO: refactor getFields, getViews, getDiagramDict to be composable
export function getFields(exploreFields: ILookmlModelExploreFieldset) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  return fields
}

export function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export function getViews(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[]) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
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

export function getDiagramDict(exploreFields: ILookmlModelExploreFieldset, joins: ILookmlModelExploreJoins[], diagramPersist: any, explore: ILookmlModelExplore) {
  let fields = [...exploreFields.dimensions, ...exploreFields.measures]
  let views = getViews(exploreFields, joins)
  // TODO: type diagramDict
  let diagramDict: any = {}

  // Add table data to DiagramDict for each view
  views.map((viewName: string, viewIndex: number) => {
    let dimLen = exploreFields.dimensions.filter((e, j) => {
      return e.view === viewName
    }).length
    let initX = diagramPersist[viewName] ? diagramPersist[viewName].x : 500
    let initY = diagramPersist[viewName] ? diagramPersist[viewName].y : 200
    diagramDict[viewName] = [
      {category:"view", view: viewName, name: viewName, base: explore.name === viewName, diagramX: initX, diagramY: initY, fieldTypeIndex: 0},
      ...fields.filter((field: ILookmlModelExploreField) => {
        return field.view === viewName
      }).map((datum: any, i: number) => {
        let tableDatum = datum
        tableDatum.diagramX = initX,
        tableDatum.diagramY = initY,
        tableDatum.fieldTypeIndex = datum.category === "dimension" ? i : i - dimLen
        return tableDatum
      }),
    ]
  })
  // Add join data to DiagramDict
  diagramDict._joinData = joins.map((join: ILookmlModelExploreJoins, joinIndex: number) => {
    let joinPath: any[] = []
    if (join.dependent_fields.length > 0) {
      join.dependent_fields.sort((a, b) => (a > b) ? 1 : -1).map((field: string, depFieldIndex: number) => {
        let joinFieldArr = field.split(".")
        let tableRef = diagramDict[joinFieldArr[0]]
        let fieldIndex = tableRef && tableRef.findIndex((x: ILookmlModelExploreField) => x.name === field)
        if (fieldIndex === -1) {
          fieldIndex = 0
        }
        joinPath.push({
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
  let buildOrder = views.sort((a: string, b: string)=>{
    return joinCount[a] > joinCount[b] ? -1 : 1;
  })

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
      return diagramDict[a] > diagramDict[b] ? 1 : -1
    })
    scaffold[viewName] = joined
  })

  function getTableX(index: number, degree: number) {
    const width = TABLE_WIDTH * 3
    index = (degree % 2)===0 ? index-degree : index+degree
    if (((index) % 2) === 0) {
      return -1 * width * degree
    }
    return width * degree
  }

  let built: string[] = []
  let shift: any = {}

  function arrangeTables(table: string, degree: number) {
    let joinX = diagramDict[table][0].diagramX
    let joinY = diagramDict[table][0].diagramY
    let calcX = getTableX(built.length, degree) + joinX
    let step = diagramDict[table].length + 5
    shift[calcX] ? shift[calcX] = shift[calcX] + step : shift[calcX] = step
    let calcY = getRowOffset(shift[calcX] - diagramDict[table].length) + joinY + (degree * -200)
    diagramDict[table] = diagramDict[table].map((field: any, i: number) => {
      return {
        ...field,
        diagramX: calcX,
        diagramY: calcY,
      }
    })
    built.push(table)
    scaffold[table].forEach((t: string, i: number) => {
      if (!built.includes(t)) {
        arrangeTables(t, degree+1)
      }
    })
  }

  arrangeTables(buildOrder[0], 0)
  // TODO: check to see if we have to rerun this with any other individual nodes in explore if they exist

  return diagramDict
}

export function getDiagramDimensions(details: DetailedModel, diagramPersist: any) {
  let modifiedDetails: any[] = []
  details && details.explores.map((d,i) => {
    // TODO: type modifiedDetail
    let modifiedDetail = {
      exploreName: d.name,
      modelName: d.model_name,
      diagramDict: getDiagramDict(d.fields, d.joins, diagramPersist[d.name] || {}, d),
    }
    modifiedDetails.push(modifiedDetail)
  })
  return modifiedDetails
}
