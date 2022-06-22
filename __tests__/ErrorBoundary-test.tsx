/**
 * @format
 */

import 'react-native';
import React from 'react';
import ErrorBoundary from '../src/ErrorBoundary';

import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  const ComponentThatThrows = () => {
    throw new Error('');
  };

  const {getByTestId} = render(
    <ErrorBoundary>
      <ComponentThatThrows />
    </ErrorBoundary>,
  );

  const text = getByTestId('error');
  expect(text.props.children).toBe('Sorry.. there was an error');
});
