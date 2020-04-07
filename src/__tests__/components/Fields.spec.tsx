import React from 'react';
import renderer from 'react-test-renderer';
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"
import { columns } from '../../components/DataDictionary'
import { mockGroups, mockCurrentExplore, mockCurrentModel } from "../MockData/MockData";
import { defaultShowColumns } from "../../components/PanelFields";

import { Fields } from '../../components/Fields'

jest.mock("../../components/DetailDrawer", () => ({
  DetailDrawer: () => "DetailDrawer"
}))


it('renders correctly', () => {
  console.log('wut', mockGroups[0][0])
  const tree = renderer.create(
    <ThemeProvider theme={theme}>
      <Fields
        columns={columns}
        explore={mockCurrentExplore}
        // @ts-ignore
        label={mockGroups[0][0]}
        model={mockCurrentModel}

        // @ts-ignore
        fields={mockGroups[0][1]}
        search={null}
        shownColumns={defaultShowColumns}
      />
    </ThemeProvider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
