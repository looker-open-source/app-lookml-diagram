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
  FadeIn,
  Divider,
  Label,
  Paragraph,
} from "@looker/components"
import { ExternalLink } from "../../ExternalLink"
import {view_explore} from "../../../test_data/order_items_explore"
import {view_dimensions} from "../../../test_data/order_items_dimensions"
import {join_dimensions} from "../../../test_data/polling_dimensions"
import {join_explore} from "../../../test_data/polling_explore"
import {Diagram} from "../DiagramCanvas/Diagram"
import {Italics} from "../FrameHelpers"
import {SettingsPanel} from "./frame_components"

export const HelpPanel: React.FC = () => {
  return (
    <SettingsPanel width="275px" px="medium" py="large">
      <FadeIn duration="intricate">
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
              x: 55.98,
              y: -86,
              displayX: 0,
              displayY: 0,
              clientWidth: 375,
              clientHeight: 155
            }}
            setViewPosition={()=>{}}
          />
          <Paragraph fontSize="small">
          The base view is indicated by a dark blue header. In each view table, dimension rows are white; measure rows are light orange.
          </Paragraph>
          <Paragraph fontSize="small">
          To the left of each field is an icon representing its type. If the field is a primary key, a key icon appears to the right of the field name.
          </Paragraph>
          <Paragraph fontSize="small">
          Click on a table row to see its metadata.
          </Paragraph>
          <Divider appearance="light"/>
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
              x: 10.12,
              y: -15.54,
              displayX: 0,
              displayY: 0,
              clientWidth: 375,
              clientHeight: 190
            }}
            setViewPosition={()=>{}}
          />
          <Paragraph fontSize="small">
          Joins are represented by a directed line that connects two views. Joined views are indicated by a light blue header. 
          </Paragraph>
          <Paragraph fontSize="small">
          The shape of the line, where it attaches to the view or field, conveys the cardinality of the relationship between the two objects; a forked line indicates a “many” cardinality, and a single line indicates a “one” cardinality. You would read the relationship as <Italics>from</Italics> the base view <Italics>to</Italics> the joined view.
          </Paragraph>
          <Paragraph fontSize="small">
          Hover over a join to see its join relationship type. Click on a join line to see its metadata.
          </Paragraph>
          <ExternalLink fontSize="small" target="_blank" href="https://docs.looker.com/data-modeling/extension-framework/lookml-diagram">Full documentation.</ExternalLink>
        </SpaceVertical>
      </FadeIn>
    </SettingsPanel>
  )
}
