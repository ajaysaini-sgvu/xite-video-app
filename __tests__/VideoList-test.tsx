/**
 * @format
 */

import 'react-native';
import React from 'react';
import VideoList from '../src/VideoList';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const props = {
    videos: [
      {
        id: 501437,
        artist: 'Pants Velour',
        title: 'All In',
        release_year: 2014,
        genre_id: 14,
        image_url:
          'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg',
      },
    ],
  };
  renderer.create(<VideoList {...props} />);
});
