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
import { Button, Text } from '@looker/components'
import { CodeEditor } from '../CodeEditor/CodeEditor'
import { QueryOrder } from '../QueryExplorer'
import styled from 'styled-components'
const Plot = require('@observablehq/plot')

// example data
 const dailyAverage = [{"Ecmap State":"Vermont","General Polls Start Date":"2020-06-08","General Polls Biden Average":73.925,"General Polls Trump Average":20.68}]

interface VisualizationEditorProps {
    queryFields: QueryOrder
    queryData: any
    loadingQueryData: boolean
}

 export const VisualizationEditor: React.FC<VisualizationEditorProps> = ({
     queryFields,
     queryData,
     loadingQueryData
 }) => {
  const [reload, setReload] = useState(false)
  const toggleReload = () => setReload(!reload)

  
  const [styleString, setStyleString] = useState(prettyPrintStringify({
    color: 'white'
  })

  const multiPlotMarksString = `Plot.dot(dailyAverage, {x: "Ecmap State", y: "General Polls Biden Average", fill: '#00B8F5', curve: 'step'}),
  Plot.dot(dailyAverage, {x: "Ecmap State", y: "General Polls Trump Average", fill: '#FF6B6B', curve: 'step'}),
  Plot.ruleY([0])`
  
  const [marksString, setMarksString] = useState(multiPlotMarksString)

  // container for evaluated marksStrings, used in plotOptions
  let evaluatedMarks: string[] = []

  const [yString, setYString] = useState(prettyPrintStringify({
    grid: true
  }))

  // experiment in reducing tick labels on x axis
  // for now, we just won't display labels along the x axis
  const ticks: any[] = []
    // dailyAverage
    //   .map((da: any) => da["General Polls Start Date"])
    //   .filter((da, i) => i % 99 === 0)
  const [xString, setXString] = useState(prettyPrintStringify({
    ticks
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
    } catch (err) {
      console.error(err)
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
    const plot = Plot.plot(options)
    if (ref.current) {
      if (ref.current.children[0]) {
        ref.current.children[0].remove();
      }
      ref.current.appendChild(plot);
    }
  }, [ref, reload])
  
  return (
  <>
    {/* Visualization */}
    <div ref={ref} />

    {/* Code editor */}
    <StyledText >styles</StyledText>
    <CodeEditor code={styleString} onChange={setStyleString} transparent={true} />
    <StyledText>marks</StyledText>
    <CodeEditor code={marksString} onChange={setMarksString} transparent={true} />
    <StyledText>x</StyledText>
    <CodeEditor code={xString} onChange={setXString} transparent={true} />
    <StyledText>y</StyledText>
    <CodeEditor code={yString} onChange={setYString} transparent={true} />
    <StyledText>margin</StyledText>
    <CodeEditor code={marginString} onChange={setMarginString} transparent={true} />

    {/* Reload button */}
    <Button onClick={toggleReload}>Visualize</Button>
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
