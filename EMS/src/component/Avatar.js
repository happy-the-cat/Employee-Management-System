import React from 'react';
import {StyleSheet} from 'react-native';

import {Avatar} from 'react-native-elements';

import * as Styles from '../Styles';

const RoundAvatar = ({source, onPress, size, containerStyle}) => (
  <Avatar
    rounded
    source={source}
    icon={{name: 'person', type: 'octicon'}}
    size={size !== undefined ? size : 'medium'}
    containerStyle={[avatarStyles.container, containerStyle]}
    onPress={onPress}
  />
);

const avatarStyles = StyleSheet.create({
  container: {
    backgroundColor: Styles.colors.lightGray,
  },
});

export {RoundAvatar};
