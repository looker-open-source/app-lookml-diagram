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

import React, { useRef, useEffect } from 'react'
import { QueryOrder } from '../QueryExplorer'
const Plot = require('@observablehq/plot')

// example data
 const dailyAverage = [{"Ecmap State":"Vermont","General Polls Start Date":"2020-06-08","General Polls Biden Average":73.925,"General Polls Trump Average":20.68},
 {"Ecmap State":"Massachusetts","General Polls Start Date":"2020-07-01","General Polls Biden Average":71.185,"General Polls Trump Average":26.555},
 {"Ecmap State":"Massachusetts","General Polls Start Date":"2020-06-08","General Polls Biden Average":70.52,"General Polls Trump Average":27.6},
 {"Ecmap State":"Vermont","General Polls Start Date":"2020-10-20","General Polls Biden Average":70.5,"General Polls Trump Average":27},
 {"Ecmap State":"Vermont","General Polls Start Date":"2020-10-18","General Polls Biden Average":70,"General Polls Trump Average":27.5}]
 
 // experiment in reducing tick labels on x axis
 const ticks = dailyAverage
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
    const options = {
        tickRotate: 90,
        y: {
          grid: true
        },
        x: {
            ticks: []
            // ticks: dailyAverage.map((d) => d['General Polls Start Date']).filter((d, i) => i % 99 === 0),
        },
        marks: [
            Plot.dot(dailyAverage.slice(0, 9), {x: "Ecmap State", y: "General Polls Biden Average", fill: '#00B8F5', curve: 'step'}),
            Plot.dot(dailyAverage.slice(0, 9), {x: "Ecmap State", y: "General Polls Trump Average", fill: '#FF6B6B', curve: 'step'}),
            Plot.ruleY([0])
        ],
        marginTop: 50,
        marginBottom: 50,
        marginLeft:100,
        color: {
            type: "diverging",
            scheme: "BuRd"
          },
      }

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const plot = Plot.plot(options);
        if (ref.current) {
          if (ref.current.children[0]) {
            ref.current.children[0].remove();
          }
          ref.current.appendChild(plot);
        }
      }, [ref, options])

    return <div ref={ref} />
}

