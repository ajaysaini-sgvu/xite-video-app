import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CrossIcon from '../assets/cross.svg';

interface Props {
  searchValue: string;
  setSearchPhrase: (value: string) => void;
  setSearchBarVisible: Dispatch<SetStateAction<boolean>>;
}

interface Style {
  searchBar: ViewStyle;
  input: TextStyle;
  crossView: ViewStyle;
}

const SearchBar = (props: Props) => {
  const {searchValue, setSearchPhrase, setSearchBarVisible} = props;

  const onCrossClick = () => {
    setSearchBarVisible(false);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchValue}
        onChangeText={setSearchPhrase}
      />
      <TouchableOpacity onPress={onCrossClick} style={styles.crossView}>
        <CrossIcon height={14} width={14} fill="black" />
      </TouchableOpacity>
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
});

export default SearchBar;
