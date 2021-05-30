import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import * as Styles from '../Styles';

const IconCard = ({title, onPress, image, containerStyle}) => (
  <View style={[containerStyle, iconCardStyles.baseContainer]}>
    <TouchableOpacity onPress={onPress} style={iconCardStyles.buttonContainer}>
      {image}
      <Text style={iconCardStyles.text}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const iconCardStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    alignItems: 'center',
  },
  buttonContainer: {
    padding: Styles.whitespaces.outer,
    backgroundColor: Styles.colors.light,
    borderColor: Styles.colors.secondary,
    borderRadius: 20,
    borderWidth: 1,
  },
  text: {
    ...Styles.texts.default,
    textAlign: 'center',
    color: Styles.colors.onBackground,
    marginTop: Styles.whitespaces.inner,
  },
});

export {IconCard};
