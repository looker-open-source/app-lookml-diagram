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

import React, { useRef, useEffect, useState } from 'react'
import { Button, Text, Heading, Space } from '@looker/components'
import { CodeEditor } from '../CodeEditor/CodeEditor'
import { QueryOrder } from '../QueryExplorer'
import styled from 'styled-components'
import * as d3 from 'd3'
const Plot = require('@observablehq/plot')

// example data
 const dailyAverage = [{"Ecmap State":"Vermont","General Polls Start Date":"2020-06-08","General Polls Biden Average":73.925,"General Polls Trump Average":20.68}]

interface VisualizationEditorProps {
    queryFields: QueryOrder
    data: any
    loadingQueryData: boolean
}

const quartile1 = (V: any) => d3.quantile(V, 0.25)

const quartile3 = (V: any) => d3.quantile(V, 0.75)

function compose(...marks: any[]) {
  // @ts-ignore
  marks.plot = Plot.Mark.prototype.plot;
  return marks;
}

function outliers(values: any) {
  const r1 = iqr1(values);
  const r2 = iqr2(values);
  return values.map((v: any) => v < r1 || v > r2 ? v : NaN);
}

const iqr1 = (V: any) => {
  const hi = quartile1(V);
  const lo = hi - 1.5 * (quartile3(V) - hi);
  return d3.min(V, (v: any) => lo <= v && v <= hi ? v : NaN);
}

const iqr2 = (V: any) => {
  const lo = quartile3(V);
  const hi = lo + 1.5 * (lo - quartile1(V));
  return d3.max(V, (v: any) => lo <= v && v <= hi ? v : NaN);
}

// @ts-ignore
function boxY(data: any, {x = null,
  y = {transform: (x: any) => x},
  fill = "#ccc",
  stroke = "currentColor",
  ...options
} = {}) {
  const group = x == null ? Plot.groupZ : Plot.groupX;
  return compose(
    Plot.ruleX(data, group({y1: iqr1, y2: iqr2}, {x, y, stroke, ...options})),
    Plot.barY(data, group({y1: quartile1, y2: quartile3}, {x, y, fill, ...options})),
    Plot.tickY(data, group({y: "median"}, {x, y, stroke, strokeWidth: 2, ...options})),
    Plot.dot(data, Plot.map({y: outliers}, {x, y, z: x, stroke, ...options}))
  );
}
// @ts-ignore
function boxX(data, {x = {transform: x => x}, y = null,
  fill = "#ccc",
  stroke = "currentColor",
  ...options
} = {}) {
  const group = y == null ? Plot.groupZ : Plot.groupY;
  return compose(
    Plot.ruleY(data, group({x1: iqr1, x2: iqr2}, {x, y, stroke, ...options})),
    Plot.barX(data, group({x1: quartile1, x2: quartile3}, {x, y, fill, ...options})),
    Plot.tickX(data, group({x: "median"}, {x, y, stroke, strokeWidth: 2, ...options})),
    Plot.dot(data, Plot.map({x: outliers}, {x, y, z: y, stroke, ...options}))
  );
}

 export const VisualizationEditor: React.FC<VisualizationEditorProps> = ({
     queryFields,
     data,
     loadingQueryData
 }) => {
  const [reload, setReload] = useState(false)
  const [vizError, setVizError] = useState(false)
  const toggleReload = () => setReload(!reload)
  const queryFieldsArr = Object.keys(queryFields)

  const [styleString, setStyleString] = useState(prettyPrintStringify({
    color: 'white'
  }))

  const multiPlotMarksString = `Plot.barY(data, {x: "${queryFieldsArr[0] || ''}", y: "${queryFieldsArr[1] || ''}", fill: '#00B8F5'})`
  
  const [marksString, setMarksString] = useState(multiPlotMarksString)

  // container for evaluated marksStrings, used in plotOptions
  let evaluatedMarks: string[] = []

  const [yString, setYString] = useState(prettyPrintStringify({
    grid: true
  }))

  const [xString, setXString] = useState(prettyPrintStringify({
  }))

  const [marginString, setMarginString] = useState(prettyPrintStringify({
    marginTop: 50,
    marginBottom: 50,
    marginLeft:100,
  }))
  

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // marks are re-evaluated whenever we reload
    try {
      evaluatedMarks = eval(`[ ${marksString} ]`)
      setVizError(false)
    } catch (err) {
      console.error(err)
      setVizError(true)
      return
    }

    /** Plot Options */
    const options = {
      style: safeParse(styleString),
      marks: evaluatedMarks,
      y: safeParse(yString),
      x: safeParse(xString),
      ...safeParse(marginString),
    }

    /** Append plot svg to the DOM and keep updated when changed */
    let plot: any
    try {
      plot = Plot.plot(options)
      setVizError(false)
    } catch (err) {
      console.error(err)
      setVizError(true)
      return
    }
    if (ref.current) {
      if (ref.current.children[0]) {
        ref.current.children[0].remove();
      }
      ref.current.appendChild(plot);
    }
  }, [ref, reload])
  
  return (<>
    {/* Visualization */}
    {vizError ? <Heading>Uh oh! Please modify the Plot.</Heading> : <div ref={ref} />}

    {/* Reload button */}
    <Space reverse><Button onClick={toggleReload} m="medium">Visualize</Button></Space>

    {/* Code editor */}
    <StyledText>marks</StyledText>
    <CodeEditor code={marksString} onChange={setMarksString} transparent={true} />
    <StyledText>x</StyledText>
    <CodeEditor code={xString} onChange={setXString} transparent={true} />
    <StyledText>y</StyledText>
    <CodeEditor code={yString} onChange={setYString} transparent={true} />
    <StyledText >styles</StyledText>
    <CodeEditor code={styleString} onChange={setStyleString} transparent={true} />
    <StyledText>margin</StyledText>
    <CodeEditor code={marginString} onChange={setMarginString} transparent={true} />
  </>
  )
}

const StyledText = styled(Text)`
  color: ${props => props.theme.colors.text};
`

const prettyPrintStringify = (o: any) => JSON.stringify(o, null, 2)

const safeParse = (s: string): Object => {
  try {
    return JSON.parse(s)
  } catch (err) {
    console.log(err)
  }
}
