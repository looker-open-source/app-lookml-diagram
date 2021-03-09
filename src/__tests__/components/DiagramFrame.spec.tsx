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
  mockModels, 
  mockActiveGit, 
  mockAvailGit, 
  mockCurrentModel, 
  mockSelectExplore, 
  view_dimensions,
  mockPathNames,
  mockMinimapDimensions } from "../../test_data";
import 'jest-styled-components'
import { DiagramFrame } from '../../components/DiagramFrame/DiagramFrame'
import { shallow } from 'enzyme';

jest.mock('../../utils/fetchers', () => {
  return {
    useAllModels: jest.fn(() => {
      return mockModels
    }),
    getActiveGitBranch: jest.fn(() => {
      return mockActiveGit
    }),
    getAvailGitBranches: jest.fn(() => {
      return mockAvailGit
    }),
  }
})

jest.mock('../../utils/routes', () => {
  return {
    useCurrentModel: jest.fn(() => {
      return mockCurrentModel
    }),
    useSelectExplore: jest.fn(() => {
      return mockSelectExplore
    }),
    usePathNames: jest.fn(() => {
      return mockPathNames
    }),
  }
})

jest.mock('../../utils/diagrammer', () => {
  return {
    getMinimapDimensions: jest.fn(() => {
      return mockMinimapDimensions
    }),
  }
})

jest.mock("../../components/DiagramFrame/MetadataPanel/MetadataPanel", () => ({
  MetadataPanel: () => "MetadataPanel"
}))

jest.mock("../../components/DiagramFrame/DiagramSettings", () => ({
  DiagramSettings: () => "DiagramSettings"
}))

jest.mock("../../components/DiagramFrame/HelpPanel", () => ({
  HelpPanel: () => "HelpPanel"
}))

jest.mock("../../components/DiagramFrame/ViewOptions", () => ({
  ViewOptions: () => "ViewOptions"
}))

jest.mock("../../components/DiagramFrame/DiagramCanvas/Diagram", () => ({
  Diagram: () => "Diagram"
}))

jest.mock("../../components/DiagramFrame/DiagramHeader", () => ({
  DiagramHeader: () => "DiagramHeader"
}))

jest.mock("../../components/DiagramFrame/DiagramCanvas/DiagramToolbar", () => ({
  DiagramToolbar: () => "DiagramToolbar"
}))

jest.mock("@looker/components", () => ({
  Card: () => "Card",
  Heading: () => "Heading",
  Spinner: () => "Spinner",
  SpaceVertical: () => "SpaceVertical",
  IconButton: () => "IconButton",
  Box: () => "Box",
  Paragraph: () => "Paragraph",
  Aside: () => "Aside",
  Section: () => "Section",
  Layout: () => "Layout",
  Status: () => "Status",
  theme: {colors: {key:"rgb(45, 126, 234)"}, space: {large: "2em"}, fontSizes: {large: "2em"}, fontWeights: {normal: "1em"}}
}))

describe('<DiagramFrame />', () => {
  const default_loading = shallow(<DiagramFrame
    unfilteredModels={mockModels}
    pathModelName={"test"}
    pathExploreName={"test_explore"}
    modelDetail={mockModels[0]}
    dimensions={[{exploreName: "text_explore", modelName: "test", diagramDict: view_dimensions}]}
    modelError={undefined}
    setModelError={undefined}
    hiddenToggle={true}
    setHiddenToggle={undefined}
    displayFieldType={"all"}
    setDisplayFieldType={undefined}
    selectedBranch={"main"}
    setSelectedBranch={undefined} />);
  it('default loading', () => {
    expect(default_loading.debug()).toMatchSnapshot();
  });

  const show_help = shallow(<DiagramFrame
    unfilteredModels={mockModels}
    pathModelName={"test"}
    pathExploreName={"test_explore"}
    modelDetail={mockModels[0]}
    dimensions={[{exploreName: "text_explore", modelName: "test", diagramDict: view_dimensions}]}
    modelError={undefined}
    setModelError={undefined}
    hiddenToggle={true}
    setHiddenToggle={undefined}
    displayFieldType={"all"}
    setDisplayFieldType={undefined}
    selectedBranch={"main"}
    setSelectedBranch={undefined} />);
  it('should help section', () => {
    show_help
    .find("IconButton#diagram-help-btn")
    .simulate("click");
    expect(show_help.debug()).toMatchSnapshot();
  });

  const show_settings = shallow(<DiagramFrame
    unfilteredModels={mockModels}
    pathModelName={"test"}
    pathExploreName={"test_explore"}
    modelDetail={mockModels[0]}
    dimensions={[{exploreName: "text_explore", modelName: "test", diagramDict: view_dimensions}]}
    modelError={undefined}
    setModelError={undefined}
    hiddenToggle={true}
    setHiddenToggle={undefined}
    displayFieldType={"all"}
    setDisplayFieldType={undefined}
    selectedBranch={"main"}
    setSelectedBranch={undefined} />);
  it('should settings section', () => {
    show_settings
    .find("IconButton[label='Settings']")
    .simulate("click");
    expect(show_settings.debug()).toMatchSnapshot();
  });
});
