import React from 'react';
import renderer from 'react-test-renderer';
import { mockCurrentModel, mockCurrentExplore} from "../MockData/MockData";
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"

import { ExploreList } from '../../components/ExploreList'

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

jest.mock('react-router', () => {
  return {
    useHistory: jest.fn(() => {
      push: () => {}
    })
  }
})

jest.mock("../../components/PanelFields", () => ({
  PanelFields: () => "PanelFields"
}))

jest.mock("../../components/Sidebar", () => ({
  Sidebar: () => "Sidebar"
}))

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ExploreList
          search={null}
        />)
      </ThemeProvider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
})
