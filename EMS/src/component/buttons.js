import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import * as Styles from '../styles';

const ButtonPrimary = ({onPress, title}) => (
  <View style={baseButtonStyles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={primaryStyles.button}>
      <Text style={[primaryStyles.text]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const ButtonSecondary = ({onPress, title}) => (
  <View style={baseButtonStyles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={secondaryStyles.button}>
      <Text style={[secondaryStyles.text]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const TextOnlyButton = ({onPress, title}) => {
  <View style={baseButtonStyles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={textButtonStyles.button}>
      <Text style={[textButtonStyles.text]}>{title}</Text>
    </TouchableOpacity>
  </View>;
};

const baseButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: Styles.maxWidth,
    alignSelf: 'center',
  },
  baseButton: {
    elevation: 4,
    borderRadius: 30,
    paddingVertical: 11,
  },
});

const primaryStyles = StyleSheet.create({
  button: {
    ...baseButtonStyles.baseButton,
    backgroundColor: Styles.colors.primary,
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    color: Styles.colors.onPrimary,
  },
});

const secondaryStyles = StyleSheet.create({
  button: {
    ...baseButtonStyles.baseButton,
    backgroundColor: Styles.colors.light,
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    color: Styles.colors.onBackground,
  },
});

const textButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    color: Styles.colors.onBackground,
  },
});

export {ButtonPrimary, ButtonSecondary, TextOnlyButton};
