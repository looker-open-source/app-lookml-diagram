import React from 'react';
import renderer from 'react-test-renderer';

import { ExternalLink } from '../../components/ExternalLink'


it('renders correctly', () => {
  const tree = renderer.create(
    <ExternalLink
      target="_blank"
      href="looker.com"
    >
      <div>External Link</div>
    </ExternalLink>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
