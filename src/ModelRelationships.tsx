import * as React from "react"
import { ExtensionContext } from "./framework/ExtensionWrapper"
import { useModelDetail, DetailedModel } from "./fetchers"
import { usePathNames } from "./routes"
import PlainPageLoading from "./PlainPageLoading"
import { palette } from "looker-lens/dist"

const { ForceGraph2D } = require("react-force-graph")

interface GraphNode {
  id: string
  color?: string
}
interface GraphLink {
  source: string
  target: string
}
interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

function graphDataForExplore(model: DetailedModel): GraphData {
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []

  model.explores.forEach(explore => {
    if (!nodes.some(n => n.id == explore.name!)) {
      nodes.push({ id: explore.name!, color: palette.primary500 })
    }
  })

  model.explores.forEach(explore => {
    explore.joins!.forEach(join => {
      links.push({ source: explore.name!, target: join.name! })

      // These nodes represent views that are not explores
      if (!nodes.some(n => n.id == join.name!)) {
        nodes.push({ id: join.name!, color: palette.blue300 })
      }
    })
  })

  return { nodes, links }
}

export const ModelRelationships: React.FC = props => {
  const { modelName } = usePathNames()
  const modelDetail = useModelDetail(modelName)
  if (!modelDetail) {
    return <PlainPageLoading />
  }
  return (
    <ExtensionContext.Consumer>
      {context => (
        <ForceGraph2D
          graphData={graphDataForExplore(modelDetail)}
          nodeLabel="id"
        />
      )}
    </ExtensionContext.Consumer>
  )
}
