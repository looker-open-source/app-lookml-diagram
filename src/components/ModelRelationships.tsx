import React, { useContext, useState, useCallback, useMemo } from "react"
import { ExtensionContext } from "../extract-to-framework/ExtensionWrapper"
import { useModelDetail, DetailedModel } from "../utils/fetchers"
import { usePathNames } from "../utils/routes"
import PlainPageLoading from "../components-generalized/PlainPageLoading"
import { palette, Select, styled } from "looker-lens"
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderControls,
  PageMasterDetail,
  PageMaster,
  PageDetail
} from "../components-generalized/Page"
import { ModelRelationshipsCustomizer } from "./ModelRelationshipsCustomizer"
import { SettingsContext } from "./Settings"
import _flatten from "lodash/flatten"
import _values from "lodash/values"
import _escape from "lodash/escape"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"
import { injectGlobal } from "styled-components"

const { ForceGraph2D, ForceGraph3D } = require("react-force-graph")

interface GraphNode {
  id: string
  color?: string
  val?: number
  fieldCount?: number
  name: string
}
interface GraphLink {
  source: string
  target: string
  name: string
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
    if (!nodes.some(n => n.id == explore.name!)) {
      nodes.push({
        id: explore.name!,
        color: palette.primary500,
        fieldCount: _flatten(_values(explore.fields)).length,
        name: `
        <div class="type">Explore</div>
        <div class="label">${_escape(explore.label)}</div>
        `
      })
    }
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
        name: `
        <div class="type">Join</div>
        <div class="label"><code>${_escape(join.sql_on)}</code></div>
        `
      })

      // These nodes represent views that are not explores
      if (!nodes.some(n => n.id == join.name!)) {
        nodes.push({
          id: join.name!,
          color: palette.blue300,
          name: `
        <div class="type">Joined View</div>
        <div class="label">${_escape(join.name)}</div>
        `
        })
      }
    })
  })

  return { nodes, links }
}

const UnpaddedMaster = styled(PageMaster)`
  padding: 0;
`

export const ModelRelationships: React.FC = props => {
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Relationships</PageHeaderTitle>
        <PageHeaderControls>
          <ModelRelationshipsCustomizer />
        </PageHeaderControls>
      </PageHeader>
      <PageMasterDetail>
        <UnpaddedMaster>
          <ModelGraph />
        </UnpaddedMaster>
      </PageMasterDetail>
    </Page>
  )
}

const ModelGraph: React.FC = props => {
  const { modelName } = usePathNames()
  const modelDetail = useModelDetail(modelName)
  const settings = useContext(SettingsContext)

  const is2D = settings.hiddenColumns.indexOf("relationships-3d") !== -1
  const [highlightNodes, setHighlightNodes] = useState<GraphNode[]>([])
  const [highlightLink, setHighlightLink] = useState<GraphLink | undefined>()
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
    () => (modelDetail ? graphDataForExplore(modelDetail) : undefined),
    [modelDetail]
  )

  if (!modelDetail) {
    return <PlainPageLoading />
  }

  const sharedParams = {
    graphData: graphData,
    nodeRelSize: nodeRelSize,
    onNodeHover: handleNodeHover,
    onLinkHover: handleLinkHover,
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
