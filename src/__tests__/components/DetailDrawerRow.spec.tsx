import React from 'react';
import renderer from 'react-test-renderer';
import { mockCurrentExplore } from "../MockData/MockData";
import { columns } from '../../components/DataDictionary'
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"
import { DetailDrawerRow } from '../../components/DetailDrawerRow'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <DetailDrawerRow
          column={columns[0]}
          field={mockCurrentExplore.fields.dimensions[0]}
        />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})
