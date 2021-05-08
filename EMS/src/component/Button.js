import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Styles from '../Styles';
import {Button} from 'react-native-elements';

const Buttons = () => {};

const ButtonPrimary = ({onPress, title, containerStyle, textStyle}) => (
  <View style={baseButtonStyles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[containerStyle, primaryStyles.button]}>
      <Text style={[textStyle, primaryStyles.text]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const ButtonSecondary = ({onPress, title, containerStyle, textStyle}) => (
  <View style={baseButtonStyles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[containerStyle, secondaryStyles.button]}>
      <Text style={[textStyle, secondaryStyles.text]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const ButtonTextOnly = ({title, onPress, containerStyle, titleStyle}) => (
  <Button
    onPress={onPress}
    containerStyle={[containerStyle, textOnlyStyles.button]}
    title={title}
    titleStyle={[titleStyle, textOnlyStyles.text]}
    type="clear"
  />
);

const baseButtonStyles = StyleSheet.create({
  buttonContainer: {
    width: Styles.maxWidth,
    alignSelf: 'center',
  },
  baseButton: {
    elevation: 5,
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

const textOnlyStyles = StyleSheet.create({
  button: {
    marginVertical: -3,
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    color: Styles.colors.onBackground,
  },
});

export {ButtonPrimary, ButtonSecondary, ButtonTextOnly};
