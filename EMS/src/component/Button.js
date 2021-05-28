import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {Button} from 'react-native-elements';

import * as Styles from '../Styles';

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

const ButtonTextOnly = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
  textColor,
}) => (
  <Button
    onPress={onPress}
    containerStyle={[containerStyle, textOnlyStyles.button]}
    title={title}
    titleStyle={[
      titleStyle,
      textOnlyStyles.text,
      [
        {
          ...(textColor
            ? {color: textColor}
            : {color: Styles.colors.onBackground}),
        },
      ],
    ]}
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
    alignSelf: 'center',
  },
});

const secondaryStyles = StyleSheet.create({
  button: {
    ...baseButtonStyles.baseButton,
    backgroundColor: Styles.colors.light,
    borderWidth: 0.5,
    borderColor: Styles.colors.lightGray,
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    color: Styles.colors.onBackground,
    alignSelf: 'center',
  },
});

const textOnlyStyles = StyleSheet.create({
  button: {
    marginVertical: -3,
  },
  text: {
    ...Styles.texts.secondaryEmphasis,
    alignSelf: 'center',
  },
});

export {ButtonPrimary, ButtonSecondary, ButtonTextOnly};
