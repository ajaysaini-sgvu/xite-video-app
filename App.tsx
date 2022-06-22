import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ErrorBoundary from './src/ErrorBoundary';
import Header from './src/Header';
import {IVideo} from './types';
import VideoList from './src/VideoList';
interface IResult {
  genres: IGenres[];
  videos: IVideo[];
}

interface IGenres {
  id: number;
  name: string;
}
interface Style {
  videoList: ViewStyle;
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [result, setApiResult] = useState<IResult>({genres: [], videos: []});
  const [filterResult, setFilterResult] = useState<any>({
    videos: [],
  });
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getVideosFromApi = () => {
    return fetch(
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
    )
      .then(response => response.json())
      .then(json => {
        setApiResult(json);
        setFilterResult(json?.videos);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideosFromApi();
  }, []);

  const filteredResult = (value: string) => {
    setSearchValue(value);

    // filter the result on the basis of genres id
    const items = result.genres.filter(item => {
      return item.name.toLowerCase() === value.toLowerCase();
    });

    if (items && items.length > 0) {
      const genre_id = items[0].id;

      const output = result.videos.filter(item => {
        return item.genre_id === genre_id;
      });
      setFilterResult(output);
    }

    // populate complete result if input field is cleared
    if (value === '') {
      setFilterResult(result.videos);
    }
  };

  return (
    <ErrorBoundary>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header
          title="HOME"
          searchBarVisible={searchBarVisible}
          setSearchBarVisible={setSearchBarVisible}
          searchValue={searchValue}
          setSearchValue={filteredResult}
        />
        <View style={styles.videoList}>
          <VideoList videos={filterResult} />
        </View>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create<Style>({
  videoList: {
    margin: 16,
  },
});

export default App;
