import React from 'react';
import {StyleSheet} from 'react-native';

import {Input} from 'react-native-elements';

import * as Styles from '../Styles';

const InputField = React.forwardRef(
  (
    {
      placeholder,
      onChangeText,
      errorMessage,
      autoCapitalize,
      containerStyle,
      inputContainerStyle,
      secureTextEntry,
      value,
      leftIcon,
      rightIcon,
      disabled,
      autoFocus,
      placeholderTextColor,
    },
    ref,
  ) => (
    <Input
      ref={ref}
      placeholder={placeholder}
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      inputStyle={inputStyles.text}
      containerStyle={[containerStyle, inputStyles.container]}
      inputContainerStyle={inputContainerStyle}
      autoCapitalize={autoCapitalize}
      renderErrorMessage={false}
      secureTextEntry={secureTextEntry}
      selectionColor={Styles.colors.highlight}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      disabled={disabled}
      autoFocus={autoFocus}
      placeholderTextColor={placeholderTextColor}
    />
  ),
);

const inputStyles = StyleSheet.create({
  text: {
    ...Styles.texts.default,
  },
  container: {
    marginTop: Styles.whitespaces.inner,
  },
});

export {InputField};
