import React from 'react';
import {StyleSheet} from 'react-native';

import {Input} from 'react-native-elements';

import * as Styles from '../Styles';

const InputField = ({
  placeholder,
  onChangeText,
  errorMessage,
  autoCapitalize,
  containerStyle,
  secureTextEntry,
}) => (
  <Input
    placeholder={placeholder}
    onChangeText={onChangeText}
    errorMessage={errorMessage}
    inputStyle={inputStyles.text}
    containerStyle={[containerStyle, inputStyles.container]}
    autoCapitalize={autoCapitalize}
    renderErrorMessage={false}
    secureTextEntry={secureTextEntry}
  />
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
