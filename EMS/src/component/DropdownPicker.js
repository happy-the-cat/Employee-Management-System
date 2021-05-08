import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import * as Styles from '../Styles';

const DropdownPicker = ({
  prompt,
  selectedValue,
  onValueChange,
  pickerItems,
  containerStyle,
}) => (
  <View style={[containerStyle, dropdownPickerStyles.pickerContainer]}>
    <Picker
      prompt={prompt}
      style={[dropdownPickerStyles.picker]}
      selectedValue={selectedValue}
      onValueChange={onValueChange}>
      {Object.keys(pickerItems).map(key => (
        <Picker.Item label={pickerItems[key]} value={key} key={key} />
      ))}
    </Picker>
  </View>
);

const dropdownPickerStyles = StyleSheet.create({
  picker: {
    ...Styles.texts.default,
  },
  pickerContainer: {
    marginVertical: Styles.whitespaces.inner,
    marginHorizontal: 5,
    borderColor: Styles.colors.lightGray,
    elevation: 4,
  },
});

export {DropdownPicker};
