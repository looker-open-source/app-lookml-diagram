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
import renderer from 'react-test-renderer';
import { mockCurrentModel, mockModels } from "../MockData/MockData";
import { ThemeProvider } from "styled-components"
import * as mockComponents from '@looker/components'

import { Sidebar } from '../../components/Sidebar'

jest.mock('react-router', () => {
  return {
    useHistory: jest.fn(() => {
      push: () => {}
    })
  }
})

jest.mock("../../components/ExploreList", () => ({
  ExploreList: () => "ExploreList"
}))

// @ts-ignore
mockComponents.FieldSelect = jest.fn(() => 'FieldSelect')

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={mockComponents.theme}>
        <Sidebar
          currentModel={mockCurrentModel}
          models={mockModels}
          search={''}
          setSearch={() => {}}
        />)
      </ThemeProvider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
})
