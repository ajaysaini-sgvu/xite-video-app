import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import ErrorBoundary from './ErrorBoundary';
import { IVideo } from './types';
import VideoList from './VideoList';
interface IResult {
  genres: IGenres[];
  videos: IVideo[]
}

interface IGenres {
  id: number,
  name: string
}

interface Style {
  videoList: ViewStyle,
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [result, setApiResult] = useState<IResult>({ genres: [], videos: [] });

  const getVideosFromApi = () => {
    return fetch('https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json')
      .then((response) => response.json())
      .then((json) => {
        setApiResult(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideosFromApi();
  }, [])

  return (
    <ErrorBoundary>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.videoList}>
          <VideoList videos={result?.videos} />
        </View>
      </SafeAreaView>
    </ErrorBoundary>

  );
};

const styles = StyleSheet.create<Style>({
  videoList: {
    margin: 16
  }
});

export default App;
