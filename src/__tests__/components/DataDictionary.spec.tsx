import React from 'react';
import renderer from 'react-test-renderer';
import { mockModels, mockCurrentModel } from "../MockData/MockData";

import { DataDictionary } from '../../components/DataDictionary'

jest.mock('../../utils/fetchers', () => {
  return {
    useAllModels: jest.fn(() => {
      return mockModels
    }),
  }
})

jest.mock('../../utils/routes', () => {
  return {
    useCurrentModel: jest.fn(() => {
      return mockCurrentModel
    }),
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
    .create(<DataDictionary/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})