/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import styled from 'styled-components'
import { theme } from '@looker/components'
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
  DIAGRAM_MEASURE_ICON_COLOR,
  DIAGRAM_JOINED_VIEW_HOVER_COLOR,
  DIAGRAM_BASE_VIEW_HOVER_COLOR,
} from '../../../../utils/constants'

export const DiagramSpace = styled.svg`
  background-color: ${(props: any) =>
    props.type === 'help-view' || props.type === 'help-join'
      ? theme.colors.background
      : DIAGRAM_BACKGROUND_COLOR};
  .display-area {
    cursor: move;
  }
  width: 100%;
  height: 100%;
  user-select: none;

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

  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > rect,
  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > path.table-row {
    stroke: ${DIAGRAM_HOVER_COLOR};
    fill: ${DIAGRAM_HOVER_COLOR};
  }

  g.table-row.table-row-base-view:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > rect,
  g.table-row.table-row-base-view:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > path.table-row {
    fill: ${DIAGRAM_BASE_VIEW_HOVER_COLOR};
    stroke: ${DIAGRAM_BASE_VIEW_HOVER_COLOR};
  }

  g.table-row.table-row-view:not(.table-row-base-view):not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > path.table-row {
    fill: ${DIAGRAM_JOINED_VIEW_HOVER_COLOR};
    stroke: ${DIAGRAM_JOINED_VIEW_HOVER_COLOR};
  }

  g.table-row.table-row-measure:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > rect,
  g.table-row.table-row-measure:not(.table-row-selected):not(.minimap-table-row):not(.help-table-row):hover
    > path.table-row {
    fill: ${DIAGRAM_MEASURE_HOVER_COLOR};
    stroke: ${DIAGRAM_MEASURE_HOVER_COLOR};
  }

  g.table-row:not(.table-row-selected):not(.minimap-table-row):not(.table-row-base-view):not(.help-table-row):hover
    > text {
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

  text.join-path-icon-label {
    fill: ${theme.colors.text5};
    font-size: medium;
    font-weight: ${theme.fontWeights.medium};
  }

  rect.join-path-icon-background {
    fill: ${DIAGRAM_FIELD_COLOR};
  }

  g[class^='join-'] > g.join-path-icon {
    opacity: 0;
  }

  g.join-path-selected > g.join-path-icon {
    opacity: 1;
  }
`
