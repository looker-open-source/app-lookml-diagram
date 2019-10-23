import * as React from "react"
import { ILookmlModelExplore, ILookmlModel } from "@looker/sdk"
import { ForceGraph2D } from "react-force-graph"
import {
  ExtensionContext,
  ExtensionContextData
} from "./framework/ExtensionWrapper"

interface DiagramProps {
  explore: ILookmlModelExplore
}

interface GraphNode {
  id: string
}
interface GraphLink {
  source: string
  target: string
}
interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

function graphDataForExplore(
  context: ExtensionContextData,
  explore: ILookmlModelExplore
): GraphData {
  const nodes = [{ id: explore.name }]
  const links = []

  explore.joins.forEach(join => {
    links.push({ source: explore.name, target: join.name })
    nodes.push({ id: join.name })
  })

  return { nodes, links }
}

export const ExploreDiagram: React.FC<DiagramProps> = props => {
  return (
    <ExtensionContext.Consumer>
      {context => (
        <ForceGraph2D
          graphData={graphDataForExplore(context, props.explore)}
          nodeLabel="id"
        />
      )}
    </ExtensionContext.Consumer>
  )
}
