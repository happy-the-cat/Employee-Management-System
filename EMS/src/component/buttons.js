import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Styles from '../styles';
import {Button} from 'react-native-elements';

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

const LabelNButton = ({label, title, onPress, containerStyle, textStyle}) => {
  return (
    <View style={[containerStyle, Styles.containers.horizontal]}>
      <Text style={[textStyle, Styles.texts.secondary]}>{label}</Text>
      <Button
        titleStyle={[
          textStyle,
          Styles.texts.secondaryEmphasis,
          {color: Styles.colors.onBackground},
        ]}
        containerStyle={{
          marginVertical: -10,
        }}
        onPress={onPress}
        type="clear"
        title={title}
      />
    </View>
  );
};

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

export {ButtonPrimary, ButtonSecondary, LabelNButton};
