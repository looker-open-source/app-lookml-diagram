import React, { useContext, useState, useCallback, useMemo } from "react"
import { useModelDetail, DetailedModel } from "../utils/fetchers"
import { usePathNames } from "../utils/routes"
import PlainPageLoading from "../components-generalized/PlainPageLoading"
import { palette, styled } from "looker-lens"
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderControls,
  PageMasterDetail,
  PageMaster
} from "../components-generalized/Page"
import { ModelRelationshipsCustomizer } from "./ModelRelationshipsCustomizer"
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
import { ExploreDetail } from "./ExploreDetail"
import { JoinDetail } from "./JoinDetail"
import Measure from "react-measure"

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
    if (!nodes.some(n => n.id == explore.name!)) {
      nodes.push({
        id: explore.name!,
        exploreName: explore.name!,
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
        join,
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
  const { modelName } = usePathNames()
  const modelDetail = useModelDetail(modelName)
  const [selectedExplore, setSelectedExplore] = useState<ILookmlModelExplore>()
  const [selectedJoin, setSelectedJoin] = useState<ILookmlModelExploreJoins>()
  const [graphDimensions, setGraphDimensions] = useState<{
    width: number
    height: number
  }>({ width: 500, height: 500 })
  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Relationships</PageHeaderTitle>
        <PageHeaderControls>
          <ModelRelationshipsCustomizer />
        </PageHeaderControls>
      </PageHeader>
      <PageMasterDetail>
        <Measure
          bounds
          onResize={contentRect => {
            console.log("contentRect", contentRect)
            setGraphDimensions(contentRect.bounds)
          }}
        >
          {({ measureRef }) => (
            <UnpaddedMaster innerRef={measureRef}>
              <ModelGraph
                width={graphDimensions.width}
                height={graphDimensions.height}
                model={modelDetail}
                setSelectedExplore={setSelectedExplore}
                setSelectedJoin={setSelectedJoin}
              />
            </UnpaddedMaster>
          )}
        </Measure>

        {selectedExplore && (
          <ExploreDetail
            explore={selectedExplore}
            model={modelDetail.model}
            onClose={() => setSelectedExplore(undefined)}
          />
        )}
        {selectedJoin && (
          <JoinDetail
            join={selectedJoin}
            onClose={() => setSelectedJoin(undefined)}
          />
        )}
      </PageMasterDetail>
    </Page>
  )
}

interface ModelGraphProps {
  width: number
  height: number
  model?: DetailedModel
  setSelectedExplore: (value: ILookmlModelExplore) => void
  setSelectedJoin: (value: ILookmlModelExploreJoins) => void
}

const ModelGraph: React.FC<ModelGraphProps> = ({
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
      setSelectedExplore(model.explores.find(e => e.name == node.exploreName))
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
