import styled from "styled-components"
import { 
  DIAGRAM_BACKGROUND_COLOR, 
  DIAGRAM_HOVER_COLOR, 
  DIAGRAM_HOVER_TEXT_COLOR,
  DIAGRAM_BASE_TEXT_COLOR,
  DIAGRAM_SELECT_COLOR, 
  DIAGRAM_SELECT_TEXT_COLOR,
  DIAGRAM_TEXT_COLOR,
  TABLE_BACKGROUND_COLOR,
  DIAGRAM_FIELD_ICON_COLOR,
  DIAGRAM_PK_ICON_COLOR,
  DIAGRAM_JOIN_COLOR,
  DIAGRAM_VIEW_WEIGHT,
  DIAGRAM_FIELD_WEIGHT,
  DIAGRAM_FIELD_COLOR,
  DIAGRAM_VIEW_COLOR,
  DIAGRAM_BASE_VIEW_COLOR,
  DIAGRAM_DIMENSION_COLOR,
  DIAGRAM_MEASURE_COLOR,
  DIAGRAM_FIELD_STROKE_WIDTH,
  DIAGRAM_TEXT_SIZE,
  DIAGRAM_JOIN_SELECT_COLOR,
  DIAGRAM_MEASURE_HOVER_COLOR,
  DIAGRAM_MEASURE_ICON_COLOR
} from "../../../../utils/constants/"
import {
  theme,
} from "@looker/components"

export const DiagramSpace = styled.svg`
background-color: ${(props: any)=>props.type === "help-view" || props.type === "help-join" ? theme.colors.background : DIAGRAM_BACKGROUND_COLOR};
.display-area {
  cursor: move;
}
width: 100%;
height: 100%;
user-select: none;

.clickable-background {
  fill: transparent;
}

rect.table-background {
  stroke: ${TABLE_BACKGROUND_COLOR};
  stroke-width: 10;
}

// Basic table rows

g.table-row:not(.minimap-table-row) {
  cursor: pointer;
}

.row-divider {
  stroke: ${TABLE_BACKGROUND_COLOR};
}

g.table-row > rect,
g.table-row > path.table-row {
  stroke-width: ${DIAGRAM_FIELD_STROKE_WIDTH}px;
  stroke: ${DIAGRAM_FIELD_COLOR};
  fill: ${DIAGRAM_FIELD_COLOR};
}

g.table-row > path.datatype-icon {
  fill: ${DIAGRAM_FIELD_ICON_COLOR};
}

g.table-row.table-row-measure > path.datatype-icon {
  fill: ${DIAGRAM_MEASURE_ICON_COLOR};
}

g.table-row > path.pk-icon {
  fill: ${DIAGRAM_PK_ICON_COLOR};
}

g.table-row-view > rect,
g.table-row-view > path.table-row {
  stroke: ${DIAGRAM_VIEW_COLOR};
  fill: ${DIAGRAM_VIEW_COLOR};
}

g.table-row-base-view > rect,
g.table-row-base-view > path.table-row {
  stroke: ${DIAGRAM_BASE_VIEW_COLOR};
  fill: ${DIAGRAM_BASE_VIEW_COLOR};
}

g.table-row-dimension > rect,
g.table-row-measure > path.table-row {
  stroke: ${DIAGRAM_DIMENSION_COLOR};
  fill: ${DIAGRAM_DIMENSION_COLOR};
}

g.table-row-measure > rect,
g.table-row-measure > path.table-row {
  stroke: ${DIAGRAM_MEASURE_COLOR};
  fill: ${DIAGRAM_MEASURE_COLOR};
}

g.table-row > text {
  fill: ${DIAGRAM_TEXT_COLOR};
  font-weight: ${DIAGRAM_FIELD_WEIGHT};
  font-size: ${DIAGRAM_TEXT_SIZE};
}

g.table-row-view > text {
  fill: ${DIAGRAM_TEXT_COLOR};
  font-weight: ${DIAGRAM_VIEW_WEIGHT};
}

g.table-row-base-view > text {
  fill: ${DIAGRAM_BASE_TEXT_COLOR};
  font-weight: ${DIAGRAM_VIEW_WEIGHT};
}

// Rows when hover, selected

g.table-row-selected:not(.help-table-row) > rect,
g.table-row-selected:not(.help-table-row) > path.table-row {
  stroke: ${DIAGRAM_SELECT_COLOR};
  fill: ${DIAGRAM_SELECT_COLOR};
}

g.table-row-selected > text,
g.table-row-selected > path.pk-icon,
g.table-row-selected > path.datatype-icon,
g.table-row-selected > path.datatype-icon,
g.table-row-measure.table-row-selected > path.datatype-icon {
  fill: ${DIAGRAM_SELECT_TEXT_COLOR};
}

g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > rect,
g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > path.table-row {
  stroke: ${DIAGRAM_HOVER_COLOR};
  fill: ${DIAGRAM_HOVER_COLOR};
}

g.table-row.table-row-measure:not(.table-row-selected):not(.help-table-row):hover > rect,
g.table-row.table-row-measure:not(.table-row-selected):not(.help-table-row):hover > path.table-row {
  fill: ${DIAGRAM_MEASURE_HOVER_COLOR};
  stroke: ${DIAGRAM_MEASURE_HOVER_COLOR};
}

g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover > text {
  fill: ${DIAGRAM_HOVER_TEXT_COLOR};
}

// JOINS

g > path.join-path {
  fill: none;
  stroke: ${DIAGRAM_JOIN_COLOR};
  stroke-width: 3px;
}

g > path.join-path-hover {
  fill: none;
  stroke: transparent;
  stroke-width: 100px;
}

g > path.join-path-hover:not(.minimap-join-path-hover) {
  cursor: pointer;
}

g > marker > path {
  fill: ${DIAGRAM_JOIN_COLOR};
}

g.join-path-selected > path.join-path {
  stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
  stroke-width: 8px;
}

g.join-path-selected > marker > path {
  fill: ${DIAGRAM_JOIN_SELECT_COLOR};
  stroke: ${DIAGRAM_JOIN_SELECT_COLOR};
  stroke-width: 2px;
}

g.join-path-selected > text.join-path-icon-label {
  fill: ${DIAGRAM_TEXT_COLOR};
  font-size: xx-small;
  font-family: monospace;
  text-anchor: middle;
}

g.join-path-selected > rect.join-path-icon-background {
  fill: ${DIAGRAM_BACKGROUND_COLOR};
}

g.join-path-selected > path.join-path-icon-right,
g.join-path-selected > circle.join-path-icon-right {
  fill: #6EA391;
}

g.join-path-selected > path.join-path-icon-left,
g.join-path-selected > circle.join-path-icon-left {
  fill: #997CAD;
}

g.join-path-selected > path.join-path-icon-connector {
  stroke: #939BA5;
  stroke-width: 1.95833;
}
`
