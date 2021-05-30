import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

import Ripple from 'react-native-material-ripple';
import {ListItem, SearchBar} from 'react-native-elements';

import * as Styles from '../Styles';

const SearchField = React.forwardRef(
  ({placeholder, onChangeText, value, lightTheme, containerStyle}, ref) => (
    <SearchBar
      ref={ref}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      platform="default"
      lightTheme={lightTheme}
      containerStyle={[fieldStyles.container, containerStyle]}
      inputContainerStyle={fieldStyles.inputContainer}
      inputStyle={fieldStyles.inputText}
      placeholderTextColor={Styles.colors.gray}
    />
  ),
);

const SearchDropDown = ({
  onPressItem,
  content,
  noResultPrompt,
  containerStyle,
}) => (
  <View style={[dropDownStyles.mainContainer, containerStyle]}>
    {content.length ? (
      content.map(item => (
        <Ripple onPress={() => onPressItem(item.id)}>
          <ListItem
            key={item.id}
            bottomDivider
            containerStyle={dropDownStyles.listContainer}>
            <ListItem.Content>
              <ListItem.Title style={dropDownStyles.listText}>
                {item.name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </Ripple>
      ))
    ) : (
      <Text style={dropDownStyles.noResultText}>{noResultPrompt}</Text>
    )}
  </View>
);

const fieldStyles = StyleSheet.create({
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

const dropDownStyles = StyleSheet.create({
  baseContainer: {},
  mainContainer: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    //maxHeight: Styles.maxHeight / 2,
    backgroundColor: Styles.colors.secondary,
    padding: Styles.whitespaces.inner / 2,
    borderRadius: 5,
  },
  listContainer: {
    width: '100%',
    borderRadius: 1,
    paddingVertical: Styles.whitespaces.inner / 2,
    paddingHorizontal: Styles.whitespaces.outer,
  },
  listText: {
    ...Styles.texts.default,
  },
  noResultText: {
    ...Styles.texts.secondary,
    textAlign: 'center',
    marginHorizontal: Styles.whitespaces.outer,
  },
});

export {SearchField, SearchDropDown};
