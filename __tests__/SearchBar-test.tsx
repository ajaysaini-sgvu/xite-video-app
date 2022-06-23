/**
 * @format
 */

import 'react-native';
import React from 'react';
import SearchBar from '../src/SearchBar';
import {fireEvent, render} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {
    searchValue: 'Pop',
    setSearchPhrase: jest.fn(),
    setSearchBarVisible: jest.fn(),
  };
  renderer.create(<SearchBar {...props} />);
});

it('test cross click', async () => {
  const props = {
    searchValue: 'Pop',
    setSearchPhrase: jest.fn(),
    setSearchBarVisible: jest.fn(),
  };
  const {getByTestId} = render(<SearchBar {...props} />);

  const touchableOpacity = getByTestId('cross');
  fireEvent.press(touchableOpacity);
  expect(props.setSearchPhrase).toHaveBeenCalled();
});
