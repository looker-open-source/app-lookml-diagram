import { sdk } from "./sdk"
import {
  ILookmlModel,
  ILookmlModelExplore,
  ILookmlModelExploreField
} from "@looker/sdk/dist/sdk/models"

export async function getFieldUsage(
  model: ILookmlModel,
  explore: ILookmlModelExplore,
  field: ILookmlModelExploreField
) {
  return sdk.ok(
    sdk.run_inline_query({
      body: {
        model: "i__looker",
        view: "history",
        filters: {
          "query.model": JSON.stringify(model.name),
          "query.view": JSON.stringify(explore.name),
          "query.formatted_fields": `%${JSON.stringify(field.name)}%`
        },
        fields: ["query.formatted_fields", "query.count"]
      }
    })
  )
}

// https://localhost:9999/explore/i__looker/history?fields=query.model,query.view,query.formatted_fields,query.count&sorts=query.count+desc&limit=500&query_timezone=America%2FLos_Angeles&vis=%7B%7D&filter_config=%7B%7D&dynamic_fields=%5B%5D&origin=share-expanded
