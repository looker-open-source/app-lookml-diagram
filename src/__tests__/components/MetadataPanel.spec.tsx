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
import {MetadataPanel} from '../../components/DiagramFrame/MetadataPanel/MetadataPanel'
import { shallow } from 'enzyme';
import {
  mockCurrentModel} from "../test_data";
// import 'jest-styled-components';

// jest.mock("@looker/components", () => ({
//   Divider: () => "Divider",
//   Flex: () => "Flex",
//   Aside: () => "Aside",
//   FlexItem: () => "FlexItem",
//   Card: () => "Card",
//   IconButton: () => "IconButton",
//   Badge: () => "Badge",
//   ButtonTransparent: () => "ButtonTransparent",
//   CodeBlock: () => "CodeBlock",
//   Code: () => "Code",
//   Heading: () => "Heading",
//   SpaceVertical: () => "SpaceVertical",
//   Paragraph: () => "Paragraph",
//   Footer: () => "Footer",
//   Icon: () => "Icon",
//   Space: () => "Space",
//   Tabs: () => "Tabs",
//   Tab: () => "Tab",
//   TabList: () => "TabList",
//   TabPanel: () => "TabPanel",
//   TabPanels: () => "TabPanels",
//   theme: {colors: {key:"rgb(45, 126, 234)"}, space: {large: "2em"}, fontSizes: {large: "2em"}, fontWeights: {normal: "1em"}}
// }))

// jest.mock('react', () => {
//   return {
//     useContext: jest.fn(() => {
//       return "useContext"
//     }),
//     createContext: jest.fn(() => {
//       return "createContext"
//     }),
//     createElement: jest.fn(() => {
//       return "createElement"
//     }),
//   }
// })

// jest.mock('@looker/extension-sdk-react', () => {
//   return {
//     ExtensionContext: jest.fn(() => {
//       return "ExtensionContext"
//     }),
//   }
// })

// jest.mock('styled-components', () => {
//   return {
//     SpinnerBlock: jest.fn(() => {
//       return "SpinnerBlock"
//     }),
//     Spinner: jest.fn(() => {
//       return "Spinner"
//     }),
//     DisabledText: jest.fn(() => {
//       return "DisabledText"
//     }),
//     _styledComponents: jest.fn(() => {
//       return "div"
//     }),
//     Aside: jest.fn(() => {
//       return "Aside"
//     }),
//   }
// })

// jest.mock("../../components/ExternalLink", () => ({
//   ExternalLink: () => "ExternalLink"
// }))

// jest.mock("../../components/DiagramFrame/MetadataPanel/JoinIcon", () => ({
//   JoinIcon: () => "JoinIcon"
// }))

// jest.mock("../../components/DiagramFrame/MetadataPanel/MetadataPanelTable", () => ({
//   MetadataPanelTable: () => "MetadataPanelTable"
// }))

// jest.mock("../../components/DiagramFrame/MetadataPanel/MetadataInfoPanel", () => ({
//   MetadataInfoPanel: () => "MetadataInfoPanel"
// }))

// jest.mock("../../components/DiagramFrame/MetadataPanel/MetadataFooter", () => ({
//   MetadataInfoPanel: () => "MetadataFooter"
// }))

// jest.mock("../../components/DiagramFrame/MetadataPanel/LookmlCodeBlock", () => ({
//   LookmlCodeBlock: () => "LookmlCodeBlock"
// }))

describe('<MetadataPanel />', () => {
  const basic = shallow(
  <MetadataPanel
    currentExplore={{joins:[{name:"join"}]}}
    selectionInfo={{lookmlElement: "join", name: "join"}}
    model={mockCurrentModel}
  />);
  it('should match the basic', () => {
    expect(basic).toMatchSnapshot();
  });
});
