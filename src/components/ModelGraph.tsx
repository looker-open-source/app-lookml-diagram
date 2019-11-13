import React, { useContext, useState, useCallback, useMemo } from "react"
import { DetailedModel } from "../utils/fetchers"
import PlainPageLoading from "../components-generalized/PlainPageLoading"
import { palette } from "looker-lens"
import { SettingsContext } from "./Settings"
import _flatten from "lodash/flatten"
import _values from "lodash/values"
import _escape from "lodash/escape"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"
import { injectGlobal } from "styled-components"
import {
  ILookmlModelExplore,
  ILookmlModelExploreJoins
} from "@looker/sdk/dist/sdk/models"

/* eslint-disable @typescript-eslint/no-var-requires */
const { ForceGraph2D, ForceGraph3D } = require("react-force-graph")

interface GraphNode {
  id: string
  color?: string
  val?: number
  fieldCount?: number
  name: string
  exploreName?: string
}
interface GraphLink {
  source: string
  target: string
  name: string
  join: ILookmlModelExploreJoins
}
interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

injectGlobal`
  .graph-tooltip {
    font-family: inherit !important;
    padding: 5px !important;
  }
  .graph-tooltip .type {
    font-weight: 800 !important;
    text-transform: uppercase !important;
    font-size: 12px !important;
  }
  .graph-tooltip code {
    font-size: 12px;
  }
  .graph-tooltip .label {
  }
`

function graphDataForExplore(model: DetailedModel): GraphData {
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []

  model.explores.forEach(explore => {
    nodes.push({
      id: explore.name!,
      exploreName: explore.name!,
      color: palette.primary500,
      fieldCount: _flatten(_values(explore.fields)).filter(f => !f.hidden)
        .length,
      name: `
        <div class="type">Explore</div>
        <div class="label">${_escape(explore.label)}</div>
        `
    })
  })

  model.explores.forEach(explore => {
    explore.joins!.forEach(join => {
      // These nodes represent views that are not explores
      if (!nodes.some(n => n.id === join.name!)) {
        const fields = _flatten(_values(explore.fields)).filter(
          f => !f.hidden && f.scope === join.name!
        )
        nodes.push({
          id: join.name!,
          color: palette.blue300,
          fieldCount: fields.length,
          name: `
        <div class="type">Joined View</div>
        <div class="label">${_escape(join.name)}</div>
        `
        })
      }
    })
  })

  const [min, max] = extent(nodes, n => n.fieldCount)
  const nodeScale = scaleLinear()
    .domain([min || 0, max || 1])
    .range([1, 10])
  nodes.forEach(node => {
    node.val = nodeScale(node.fieldCount || 0)
  })

  model.explores.forEach(explore => {
    explore.joins!.forEach(join => {
      links.push({
        source: explore.name!,
        target: join.name!,
        join,
        name: `
        <div class="type">Join</div>
        <div class="label"><code>${_escape(join.sql_on)}</code></div>
        `
      })
    })
  })

  return { nodes, links }
}

interface ModelGraphProps {
  width: number
  height: number
  model?: DetailedModel
  setSelectedExplore: (value: ILookmlModelExplore) => void
  setSelectedJoin: (value: ILookmlModelExploreJoins) => void
}

export const ModelGraph: React.FC<ModelGraphProps> = ({
  width,
  height,
  model,
  setSelectedExplore,
  setSelectedJoin
}) => {
  const settings = useContext(SettingsContext)

  const is2D = settings.hiddenColumns.indexOf("relationships-3d") !== -1
  const [highlightNodes, setHighlightNodes] = useState<GraphNode[]>([])
  const [highlightLink, setHighlightLink] = useState<GraphLink | undefined>()
  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      setSelectedJoin(undefined)
      setSelectedExplore(model.explores.find(e => e.name === node.exploreName))
    },
    [setSelectedExplore, model]
  )
  const handleLinkClick = useCallback(
    (link: GraphLink) => {
      setSelectedJoin(link.join)
      setSelectedExplore(undefined)
    },
    [setSelectedExplore, model]
  )
  const handleBackgroundClick = useCallback(
    node => {
      setSelectedExplore(undefined)
    },
    [setSelectedExplore]
  )
  const handleNodeHover = useCallback(
    node => {
      setHighlightNodes(node ? [node] : [])
    },
    [setHighlightNodes]
  )
  const handleLinkHover = useCallback(
    link => {
      setHighlightLink(link)
      setHighlightNodes(link ? [link.source, link.target] : [])
    },
    [setHighlightLink, setHighlightNodes]
  )
  const nodeRelSize = 4
  const paintRing = useCallback((node, ctx) => {
    // add ring just for highlighted nodes
    const r = Math.sqrt(node.val || 1) * nodeRelSize
    ctx.beginPath()
    ctx.arc(node.x, node.y, r + 2, 0, 2 * Math.PI, false)
    ctx.fillStyle = palette.yellow300
    ctx.fill()
  }, [])

  const graphData = useMemo(
    () => (model ? graphDataForExplore(model) : undefined),
    [model]
  )

  if (!model) {
    return <PlainPageLoading />
  }

  const sharedParams = {
    width,
    height,
    graphData: graphData,
    nodeRelSize: nodeRelSize,
    onNodeHover: handleNodeHover,
    onLinkHover: handleLinkHover,
    onNodeClick: handleNodeClick,
    onLinkClick: handleLinkClick,
    onBackgroundClick: handleBackgroundClick,
    linkColor: (link: GraphLink) =>
      link === highlightLink ? palette.yellow300 : palette.charcoal300,
    linkDirectionalParticleColor: (link: GraphLink) =>
      link === highlightLink ? palette.yellow400 : 1.5,
    linkWidth: (link: GraphLink) => (link === highlightLink ? 6 : 1.5),
    linkDirectionalParticles: 4,
    linkDirectionalParticleWidth: (link: GraphLink) =>
      link === highlightLink ? 4 : 0
  }

  return is2D ? (
    <ForceGraph2D
      {...sharedParams}
      nodeCanvasObject={paintRing}
      nodeCanvasObjectMode={(node: GraphNode) =>
        highlightNodes.indexOf(node) !== -1 ? "before" : undefined
      }
    />
  ) : (
    <ForceGraph3D
      {...sharedParams}
      linkDirectionalParticles={0}
      backgroundColor={palette.charcoal700}
    />
  )
}
