import React from 'react';
import renderer from 'react-test-renderer';
import { theme} from "@looker/components"
import { ThemeProvider } from "styled-components"

import { SQLSnippet } from '../../components/SqlSnippet'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <SQLSnippet
          src={"SELECT * from users;"}
        />)
      </ThemeProvider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
})
