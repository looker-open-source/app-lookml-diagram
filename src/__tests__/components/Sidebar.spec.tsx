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
