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

import type { DiagramField } from '../utils/LookmlDiagrammer'

export function isTableRowDimension(row: DiagramField) {
  if (row.category === 'dimension') {
    return true
  }
  return false
}

export function isTableRowMeasure(row: DiagramField) {
  if (row.category === 'measure') {
    return true
  }
  return false
}

export function isTableRowBaseView(row: DiagramField) {
  if (row.category === 'view') {
    return !!row.base
  }
  return false
}

export function isTableRowView(row: DiagramField) {
  if (row.category === 'view') {
    return true
  }
  return false
}

export function getPkPath(d: DiagramField) {
  if (!d.primary_key) {
    return ''
  }
  return 'M7 14a2 2 0 01-2-2 2 2 0 012-2 2 2 0 012 2 2 2 0 01-2 2m5.65-4A5.99 5.99 0 007 6a6 6 0 00-6 6 6 6 0 006 6 5.99 5.99 0 005.65-4H17v4h4v-4h2v-4H12.65z'
}

export const getDatatypePath = (d: DiagramField) => {
  if (!d.type) {
    return ''
  }
  if (d.type === 'number') {
    return 'M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z'
  } else if (d.type === 'location' || d.type === 'zipcode') {
    return 'M5 9c0-3.87 3.13-7 7-7s7 3.13 7 7c0 5.25-7 13-7 13S5 14.25 5 9zm7-5C9.24 4 7 6.24 7 9c0 2.85 2.92 7.21 5 9.88 2.12-2.69 5-7 5-9.88 0-2.76-2.24-5-5-5zm2.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  } else if (d.type === 'string') {
    return 'M10.612 4.248h2.75L19.324 20h-2.662l-1.452-4.048H8.786L7.334 20H4.672l5.94-15.752zm3.806 9.46l-1.76-4.818-.594-1.804h-.132l-.594 1.804-1.76 4.818h4.84z'
  } else if (d.type && d.type.includes('date')) {
    return 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z'
  } else if (d.type === 'tier') {
    return 'M21 5H3v2h18V5zm0 4H7v2h14V9zm-10 4h10v2H11v-2zm10 4h-6v2h6v-2z'
  } else if (d.type === 'yesno') {
    return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'
  } else if (d.type.includes('duration_')) {
    return 'M6.01 8L10 12l-4 4v6h12l-.01-5.99L18 16l-4-4 4-4V2H6l.01 6zm9.98 8.82L16 20H8v-3.17l3.41-3.41.59-.59.59.59 3.4 3.4zM16 4v3.17l-3.41 3.41-.59.59-.58-.58-3.41-3.42L8 4h8z'
  }
  return 'M20 10V8h-4V4h-2v4h-4V4H8v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4zm-6 4h-4v-4h4v4z'
}

export function isRounded(index: number, tableLength: number) {
  if (index === 0 || tableLength - 1 === index) {
    return true
  }
  return false
}
