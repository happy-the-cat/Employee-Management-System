import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Styles from './styles';

const ButtonPrimary = ({onPress, title}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={buttonStyles.button1Container}>
    <Text style={[buttonStyles.button1Text]}>{title}</Text>
  </TouchableOpacity>
);

export {ButtonPrimary};

const buttonStyles = StyleSheet.create({
  button1Container: {
    elevation: 8,
    backgroundColor: Styles.colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  button1Text: {
    ...Styles.texts.secondaryEmphasis,
    ...Styles.colors.onPrimary,
  },
  button2Container: {
    elevation: 8,
    backgroundColor: Styles.colors.light,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  button2Text: {
    color: '#000',
  },
});
