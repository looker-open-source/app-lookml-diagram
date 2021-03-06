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
import {ComponentsProvider} from "@looker/components"
import { DiagramSettings } from '../../components/DiagramFrame/DiagramSettings'
import { shallow, mount, render } from 'enzyme';
import { 
  mockModels, 
  mockActiveGit, 
  mockAvailGit, 
  mockCurrentModel, 
  mockSelectExplore, 
  view_dimensions,
  view_explore,
  mockPathNames,
  mockMinimapDimensions 
} from "../../test_data";
import renderer from 'react-test-renderer';


jest.mock('react', () => {
  return {
    useContext: jest.fn(() => {
      return "useContext"
    }),
    createContext: jest.fn(() => {
      return "createContext"
    }),
    createElement: jest.fn(() => {
      return "createElement"
    }),
  }
})

jest.mock("../../components/DiagramFrame/DiagramSettings", () => ({
  SettingsPanel: () => "SettingsPanel"
}))


jest.mock('react-router-dom', () => {
  return {
    useRouteMatch: jest.fn(() => {
      return "useRouteMatch"
    }),
  }
})

jest.mock('react-router', () => {
  return {
    useHistory: jest.fn(() => {
      return "useHistory"
    }),
  }
})

jest.mock(undefined, () => {
  return {
    ReactCurrentOwner: jest.fn(() => {
      return "ReactCurrentOwner"
    }),
  }
})

jest.mock('styled-components', () => {
  return {
    forwardRef: jest.fn(() => {
      return ""
    }),
    styled: jest.fn(() => {
      return ""
    }),
    ul: jest.fn(() => {
      return "ul"
    }),
    li: jest.fn(() => {
      return "li"
    }),
    button: jest.fn(() => {
      return "button"
    }),
  }
})


jest.mock("@looker/components", () => ({
  SpaceVertical: () => "SpaceVertical",
  Heading: () => "Heading",
  FieldSelect: () => "FieldSelect",
  Label: () => "Label",
  Aside: () => "Aside",
  SelectOptionProps: () => "SelectOptionProps",
  Icon: () => "Icon",
  theme: {colors: {key:"rgb(45, 126, 234)"}, space: {large: "2em"}, fontSizes: {large: "2em"}, fontWeights: {normal: "1em"}}
}))

describe('<DiagramSettings />', () => {
  it('should match the basic', () => {
  const tree = render(
      <DiagramSettings
      modelDetails={[{value:"modelname", label: "Model Name"}]}
      currentModel={mockCurrentModel}
      modelName={""}
      setModelError={undefined}
      selectedBranch={"main"}
      setSelectedBranch={undefined}
      branchOpts={[{value:"main", label: "Main"}]}
      gitBranch={{name: "gitBranch"}}
      gitBranches={[{name: "gitBranch"}]}
      exploreList={[view_explore]}
      selectionInfo={{}}
      currentExplore={view_explore}
      diagramExplore={"explorename"}
      setSelectionInfo={undefined}
      setViewVisible={undefined}
      setZoomFactor={undefined}
      setViewPosition={undefined}
      setMinimapUntoggled={undefined}
      setMinimapEnabled={undefined}
  />
  );
  expect(tree).toMatchSnapshot();
  });
});
