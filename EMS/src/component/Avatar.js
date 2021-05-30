import React from 'react';
import {StyleSheet} from 'react-native';

import {Avatar} from 'react-native-elements';

import * as Styles from '../Styles';
import * as Utilities from '../Utilities';

const RoundAvatar = ({source, onPress, size, containerStyle, title, color}) => {
  const txtColor = color
    ? Utilities.getContrast(color)
    : Styles.colors.onPrimary;
  return (
    <Avatar
      rounded
      source={source}
      title={title}
      titleStyle={
        size === 'small' ? {fontSize: 14, color: txtColor} : {color: txtColor}
      }
      size={size !== undefined ? size : 'medium'}
      containerStyle={[
        color
          ? {backgroundColor: color}
          : {backgroundColor: Styles.colors.highlight},
        containerStyle,
      ]}
      onPress={onPress}
    />
  );
};

export {RoundAvatar};
