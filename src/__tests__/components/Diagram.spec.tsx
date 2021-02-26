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

import React from 'react';
import { 
  view_dimensions,
  view_explore } from "../../test_data";
import { Diagram } from '../../components/Diagram'
import { shallow } from 'enzyme';
import 'jest-styled-components'

describe('<Diagram />', () => {
  const single_table = shallow(
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
  />);
  it('should match the single_table', () => {
    expect(single_table.debug()).toMatchSnapshot();
  });
  const display_table = shallow(
    <Diagram 
      type={"display"}
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
    />);
    it('should match the display_table', () => {
      expect(display_table.debug()).toMatchSnapshot();
    });
});
