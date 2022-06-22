import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';

import ErrorBoundary from './src/ErrorBoundary';
import Header from './src/Header';
import {IVideo} from './types';
import VideoList from './src/VideoList';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextStyle} from 'react-native';
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
  dropDownLabel: TextStyle;
  dropDown: ViewStyle;
  dropDownContainer: ViewStyle;
}

interface IYear {
  label: string;
  value: number;
}

const App = () => {
  const [result, setApiResult] = useState<IResult>({genres: [], videos: []});

  const [filterResult, setFilterResult] = useState<any>([]);

  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(-1);
  const [years, setYears] = useState<IYear[]>([{label: '', value: -1}]);

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

  const setYearsList = () => {
    const now = new Date().getUTCFullYear();
    setYears([
      {label: 'Select Year', value: -1},
      ...Array(now - (now - 30))
        .fill('')
        .map((_v, idx) => {
          return {label: (now - idx).toString(), value: now - idx};
        }),
    ]);
  };

  useEffect(() => {
    setYearsList();
    getVideosFromApi();
  }, []);

  const onSearchValue = (searchPhrase: string) => {
    let input = searchPhrase;
    if (searchPhrase && searchPhrase.charAt(searchPhrase.length - 1) === ' ') {
      input = searchPhrase.substring(0, searchPhrase.length - 1) + ',';
      setSearchValue(input);
    } else {
      setSearchValue(searchPhrase);
    }

    filterMovies(input, selectedYear);

    // populate complete result if input field is cleared
    if (searchValue === '') {
      setFilterResult(result.videos);
    }
  };

  const filterBySearch = (searchPhrase: string) => {
    // // filter the result on the basis of genres id
    let output: IVideo[] = [];

    const musicTypes = searchPhrase.toLowerCase().split(',');
    const items = result.genres
      .filter(item => {
        return musicTypes.indexOf(item.name.toLowerCase()) !== -1;
      })
      .map(item => {
        return item.id;
      });

    console.log(items);

    if (items && items.length > 0) {
      output = result.videos.filter(
        (item: {genre_id: number; release_year: number}) => {
          return items.includes(item.genre_id);
        },
      );
    }
    return output;
  };

  const filterByYear = (res: IVideo[], year: number) => {
    return res?.filter((i: {release_year: number}) => {
      return i.release_year === year;
    });
  };

  const filterMovies = (searchPhrase: string, year: number) => {
    if (searchPhrase && year !== -1) {
      const res1 = filterBySearch(searchPhrase);
      const res2 = filterByYear(res1, year);
      setFilterResult(res2);
      return;
    }

    if (searchPhrase) {
      setFilterResult(filterBySearch(searchPhrase));
      return;
    }

    if (year !== -1) {
      setFilterResult(filterByYear(result.videos, year));
      return;
    }
  };

  const onYearSelected = (item: any) => {
    // it reset the filter result if user select first option "Select Year"
    if (item.value === -1) {
      setFilterResult(result.videos);
      return;
    }
    filterMovies(searchValue, item.value);
  };

  return (
    <ErrorBoundary>
      <SafeAreaView>
        <Header
          title="HOME"
          searchBarVisible={searchBarVisible}
          setSearchBarVisible={setSearchBarVisible}
          searchValue={searchValue}
          setSearchValue={onSearchValue}
        />
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={open}
            value={selectedYear}
            items={years}
            setOpen={setOpen}
            setValue={setSelectedYear}
            setItems={setYears}
            onSelectItem={onYearSelected}
            style={styles.dropDown}
            labelStyle={styles.dropDownLabel}
            textStyle={styles.dropDownLabel}
            placeholder="Select Year"
          />
        </View>
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
  dropDown: {
    minHeight: 42,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  dropDownLabel: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12,
  },
  dropDownContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 100000,
    marginHorizontal: 16,
  },
});

export default App;
