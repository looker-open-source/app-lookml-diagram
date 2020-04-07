import React from 'react';
import renderer from 'react-test-renderer';
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"
import { columns } from '../../components/DataDictionary'
import { mockCurrentModel, mockCurrentExplore } from "../MockData/MockData";

import { PanelFields } from '../../components/PanelFields'

jest.mock("../../components/DetailDrawer", () => ({
  DetailDrawer: () => "DetailDrawer"
}))

jest.mock("../../components/Fields", () => ({
  Fields: () => "Fields"
}))

jest.mock("../../components/ViewOptions", () => ({
  ViewOptions: () => "ViewOptions"
}))

jest.mock('../../utils/routes', () => {
  return {
    useCurrentModel: jest.fn(() => {
      return mockCurrentModel
    }),
    useCurrentExplore: jest.fn(() => {
      return mockCurrentExplore
    })
  }
})


it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <PanelFields
        columns={columns}
        model={mockCurrentModel}
      />
    </ThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
