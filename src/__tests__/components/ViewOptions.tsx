import React from 'react';
import renderer from 'react-test-renderer';
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"

import { ViewOptions } from '../../components/ViewOptions'
import { columns } from "../../components/DataDictionary";
import { defaultShowColumns } from "../../components/PanelFields";

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <ViewOptions
          columns={columns}
          shownColumns={defaultShowColumns}
          setShownColumns={() => {}}
        />)
      </ThemeProvider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
})
