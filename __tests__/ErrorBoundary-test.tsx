/**
 * @format
 */

import 'react-native';
import React from 'react';
import ErrorBoundary from '../src/ErrorBoundary';

import {render} from '@testing-library/react-native';

it('renders correctly', () => {
  const ChildComponent = () => {
    throw new Error('');
  };

  const {getByTestId} = render(
    <ErrorBoundary>
      <ChildComponent />
    </ErrorBoundary>,
  );

  const text = getByTestId('error');
  expect(text.props.children).toBe('Sorry.. there was an error');
});
