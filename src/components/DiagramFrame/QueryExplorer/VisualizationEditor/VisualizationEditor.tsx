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
import { Button } from '@looker/components'
import { CodeDisplay } from '../CodeEditor/CodeDisplay'
import { CodeEditor } from '../CodeEditor/CodeEditor'
import JsonViewer from '../CodeEditor/JsonViewer'
import { QueryOrder } from '../QueryExplorer'
const Plot = require('@observablehq/plot')

// example data
 const dailyAverage = [{"Ecmap State":"Vermont","General Polls Start Date":"2020-06-08","General Polls Biden Average":73.925,"General Polls Trump Average":20.68}]
 
 // experiment in reducing tick labels on x axis
 const ticks: any[] = dailyAverage
    .map((da: any) => da["General Polls Start Date"])
    .filter((da, i) => i % 99 === 0)

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
  const stateColor = {
    range: ["red", "blue"],
    interpolate: "hcl"
  }
  const [stringColor, setStringColor] = useState(JSON.stringify(stateColor))
  const s1 = `Plot.dot(dailyAverage, {x: "Ecmap State", y: "General Polls Biden Average", fill: '#00B8F5', curve: 'step'})`
  const [string1, setS1] = useState(s1)
  let stateMarks: any[] = []

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stateMarks = [
      eval(string1),
      // Plot.dot(dailyAverage, {x: "Ecmap State", y: "General Polls Trump Average", fill: '#FF6B6B', curve: 'step'}),
      // Plot.ruleY([0])
    ]
    const options = {
      tickRotate: 90,
      y: {
        grid: true
      },
      x: {
          ticks: ticks
          // ticks: dailyAverage.map((d) => d['General Polls Start Date']).filter((d, i) => i % 99 === 0),
      },
      marks: [
          ...stateMarks
      ],
      marginTop: 50,
      marginBottom: 50,
      marginLeft:100,
      color: JSON.parse(stringColor),
    }
    const plot = Plot.plot(options);
    if (ref.current) {
      if (ref.current.children[0]) {
        ref.current.children[0].remove();
      }
      ref.current.appendChild(plot);
    }
  }, [ref, reload])
  

  return (<>
  <div ref={ref} />
  <CodeEditor code={stringColor} onChange={setStringColor} transparent={true} />
  <CodeEditor code={string1} onChange={setS1} transparent={true} />
  {/* <CodeDisplay code={JSON.stringify(stateMarks)} />
   */}
  <JsonViewer data={stateMarks} />
  {/* <CodeDisplay code={JSON.stringify(options.marks)} /> */}

  <Button onClick={toggleReload}>Visualize</Button>
  </>
  )
}

