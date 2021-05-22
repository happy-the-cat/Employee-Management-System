import React from 'react';
import {StyleSheet} from 'react-native';

import {SearchBar} from 'react-native-elements';

import * as Styles from '../Styles';

const SearchField = ({placeholder, onChangeText, value, lightTheme}) => {
  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      platform="default"
      lightTheme={lightTheme}
      containerStyle={localStyles.container}
      inputContainerStyle={localStyles.inputContainer}
      inputStyle={localStyles.inputText}
      placeholderTextColor={Styles.colors.gray}
    />
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: Styles.whitespaces.inner,
    backgroundColor: Styles.colors.light,
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: Styles.colors.light,
    borderColor: Styles.colors.lightGray,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  inputText: {
    ...Styles.texts.secondary,
    color: Styles.colors.onBackground,
  },
});

export {SearchField};
