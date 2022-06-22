import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {colors} from './colors';

interface Style {
  headerContainer: ViewStyle;
  title: TextStyle;
}
interface Props {
  title: string;
}

const Header = (props: Props) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  headerContainer: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
  },
  title: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Header;
