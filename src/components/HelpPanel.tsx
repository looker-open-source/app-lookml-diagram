/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

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

import React from "react"
import {
  SpaceVertical,
  Heading,
  Divider,
  Label,
  Paragraph,
} from "@looker/components"
import styled from "styled-components"
import { SettingsPanel } from "./SettingsPanel"
import { ExternalLink } from "./ExternalLink"
import {view_explore} from "../test_data/order_items_explore"
import {view_dimensions} from "../test_data/order_items_dimensions"
import {join_dimensions} from "../test_data/polling_dimensions"
import {join_explore} from "../test_data/polling_explore"
import {Diagram} from "./Diagram"

const Italics = styled.span`
  font-style: italic;
`

export const HelpPanel: React.FC<{
}> = ({ 
 }) => {
  return (
    <SettingsPanel width={`275px`} px="medium" py="large">
      <SpaceVertical>
        <Heading fontSize="large">Diagram Help</Heading>
        <Label>Views</Label>
        <Diagram 
          type={"help-view"}
          dimensions={view_dimensions.diagramDict} 
          explore={view_explore} 
          reload={false} 
          selectionInfo={{}} 
          setSelectionInfo={undefined}
          hiddenToggle={true}
          displayFieldType={"all"}
          viewVisible={{order_items: true}}
          zoomFactor={0.479}
          setZoomFactor={()=>{}}
          viewPosition={{
            x: 58.98,
            y: -84.96,
            displayX: 0,
            displayY: 0,
            clientWidth: 275,
            clientHeight: 150
          }}
          setViewPosition={()=>{}}
        />
        <Paragraph fontSize="small">
        Base views are represented with a dark-blue header.
        The background of dimension table rows is white, and light orange for measures.
        </Paragraph>
        <Paragraph fontSize="small">
        Each field has an icon representing its type, and primary keys are represented with an additional key icon.
        </Paragraph>
        <Paragraph fontSize="small">
        Click on a table row for its metadata.
        </Paragraph>
        <Divider/>
        <Label>Joins</Label>
        <Diagram 
          type={"help-join"}
          dimensions={join_dimensions.diagramDict} 
          explore={join_explore} 
          reload={false} 
          selectionInfo={{
            lookmlElement: "join",
            name: "forecast"
          }} 
          setSelectionInfo={undefined}
          hiddenToggle={true}
          displayFieldType={"all"}
          viewVisible={{polling: true, forecast: true}}
          zoomFactor={0.249}
          setZoomFactor={()=>{}}
          viewPosition={{
            x: 16.12,
            y: -15.54,
            displayX: 0,
            displayY: 0,
            clientWidth: 275,
            clientHeight: 190
          }}
          setViewPosition={()=>{}}
        />
        <Paragraph fontSize="small">
        Joins are represented by a directed line. Joined views are represented by a light-blue header. 
        </Paragraph>
        <Paragraph fontSize="small">
        The shape of the line, where it attaches to the view or field, conveys the cardinality of the relationship between the two objects; a forked line indicates a “many” cardinality, and a single line indicates a “one” cardinality. You would read the relationship as <Italics>from</Italics> the base view <Italics>to</Italics> the joined view.
        </Paragraph>
        <Paragraph fontSize="small">
        Click on a join for its metadata.
        </Paragraph>
        <ExternalLink fontSize="small" target="_blank" href="https://docs.looker.com/data-modeling/extension-framework/lookml-diagram">Full documentation.</ExternalLink>
      </SpaceVertical>
    </SettingsPanel>
  )
}
