import React from 'react';
import renderer from 'react-test-renderer';
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"

import SidebarToggle from '../../components/SidebarToggle'


it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <SidebarToggle
          isOpen={true}
          onClick={() => {}}
          headerHeight="114px"
        />
      </ThemeProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
})
