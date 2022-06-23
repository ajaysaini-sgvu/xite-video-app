import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from './colors';
import SearchBar from './SearchBar';
import SearchIcon from '../assets/search.svg';
interface Style {
  headerContainer: ViewStyle;
  title: TextStyle;
  searchBarContainer: ViewStyle;
  searchIcon: ViewStyle;
}
interface Props {
  title: string;
  searchBarVisible: boolean;
  setSearchBarVisible: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const Header = (props: Props) => {
  const {
    title,
    searchBarVisible,
    setSearchBarVisible,
    searchValue,
    setSearchValue,
  } = props;

  const onSearchToggle = () => {
    setSearchBarVisible(!searchBarVisible);
    setSearchValue('');
  };

  return (
    <View style={styles.headerContainer}>
      {searchBarVisible ? (
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchValue={searchValue}
            setSearchPhrase={setSearchValue}
            setSearchBarVisible={setSearchBarVisible}
          />
        </View>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onSearchToggle}>
            <SearchIcon
              height={20}
              width={20}
              fill="black"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  headerContainer: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 16,
  },
  searchBarContainer: {
    width: '100%',
  },
  searchIcon: {
    marginRight: 16,
  },
});

export default Header;
