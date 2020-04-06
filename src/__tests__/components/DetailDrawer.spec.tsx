import React from 'react';
import renderer from 'react-test-renderer';
import { mockCurrentModel, mockCurrentExplore } from "../MockData/MockData";
import { columns } from '../../components/DataDictionary'
import { defaultShowColumns } from "../../components/PanelFields";
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"
import { DetailDrawer } from '../../components/DetailDrawer'

jest.mock("../../components/DetailDrawerRow", () => ({
  DetailDrawerRow: () => "DetailDrawerRow"
}))

jest.mock("../../components/QueryChart", () => ({
  QueryChart: () => "QueryChart"
}))

jest.mock("../../components/ExternalLink", () => ({
  ExternalLink: () => "ExternalLink"
}))

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <DetailDrawer
          columns={columns}
          explore={mockCurrentExplore}
          model={mockCurrentModel}
          field={mockCurrentExplore.fields.dimensions[0]}
          shownColumns={defaultShowColumns}
        />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})
