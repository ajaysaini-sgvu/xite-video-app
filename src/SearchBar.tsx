import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CrossIcon from '../assets/cross.svg';
import {colors} from './colors';

interface Props {
  searchValue: string;
  setSearchPhrase: (value: string) => void;
  setSearchBarVisible: (value: boolean) => void;
}

interface Style {
  container: ViewStyle;
  searchBar: ViewStyle;
  input: TextStyle;
  crossView: ViewStyle;
  tags: ViewStyle;
  tagsContainer: ViewStyle;
  tag: TextStyle;
}

const SearchBar = (props: Props) => {
  const {searchValue, setSearchPhrase, setSearchBarVisible} = props;

  const onCrossClick = () => {
    setSearchBarVisible(false);
    setSearchPhrase('');
  };

  const tags = searchValue.split(',');

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Press space to add tags"
          value={searchValue}
          onChangeText={setSearchPhrase}
          testID="input"
        />
        <TouchableOpacity
          onPress={onCrossClick}
          style={styles.crossView}
          testID="cross">
          <CrossIcon height={14} width={14} fill="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => {
          if (tag) {
            return (
              <View style={styles.tags} key={index}>
                <Text style={styles.tag}>{tag}</Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  searchBar: {
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  input: {
    fontSize: 20,
    width: '100%',
    padding: 8,
  },
  crossView: {
    position: 'absolute',
    right: 10,
  },
  tags: {
    backgroundColor: colors.blue,
    marginRight: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white,
    padding: 4,
  },
  tagsContainer: {
    marginHorizontal: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    color: colors.white,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default SearchBar;
