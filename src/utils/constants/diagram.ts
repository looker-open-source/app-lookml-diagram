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

// Diagram zoom
export const ZOOM_INIT = 0.5
export const ZOOM_STEP = 0.1
export const ZOOM_MAX = 2
export const ZOOM_MIN = 0.2
export const X_INIT = 600
export const Y_INIT = 100

// Diagram tables, joins
/**
 * the width of each diagram table
 */
export const TABLE_WIDTH = 255
/**
 * the height of each table row
 */
export const TABLE_ROW_HEIGHT = 30
/**
 * the padding between tables
 */
export const TABLE_PADDING = TABLE_WIDTH * 2.2
/**
 * the number of pixels from a diagram table the join path
 * should be offset by to accomodate the join cardinality connector
 */
export const JOIN_CONNECTOR_WIDTH = 40
/**
 * the vertical padding between tables of the same degree
 */
export const TABLE_VERTICAL_PADDING = 5
/**
 * the vertical step each degree will take from the base table
 */
export const TABLE_DEGREE_STEP = -3

export const DIAGRAM_IGNORED_MODELS = ['system__activity']

export const MINIMAP_WIDTH = 200
