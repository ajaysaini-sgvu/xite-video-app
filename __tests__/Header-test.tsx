/**
 * @format
 */

import 'react-native';
import React from 'react';
import Header from '../src/Header';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly with search bar', () => {
  const props = {
    title: 'HOME',
    searchBarVisible: false,
    setSearchBarVisible: jest.fn(),
    searchValue: '',
    setSearchValue: jest.fn(),
  };
  renderer.create(<Header {...props} />);
});

it('renders correctly without search bar', () => {
  const props = {
    title: 'HOME',
    searchBarVisible: true,
    setSearchBarVisible: jest.fn(),
    searchValue: '',
    setSearchValue: jest.fn(),
  };
  renderer.create(<Header {...props} />);
});
