import {StyleSheet, Dimensions} from 'react-native';

const maxWidth = Dimensions.get('window').width - 30 * 2;
const maxHeight = Dimensions.get('window').height - 30 * 2;

const whitespaces = {
  margin: 30,
  outer: 28,
  inner: 14,
};

const colors = {
  light: '#fff',
  onBackground: '#000',
  primary: '#2962FF',
  primaryLight: '#529CFF',
  primaryDark: '#0039CB',
  onPrimary: '#fff',
  secondary: '#E7EDF7',
  onSecondary: '#000',
  gray: '#8F8F8F',
  darkGray: '#333333',
  lightGray: '#E0E0E0',
  highlight: '#80D8FF',
  error: '#D50000',
};

const texts = StyleSheet.create({
  app_name: {
    fontSize: 32,
    fontFamily: 'Oxygen-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Oxygen-Regular',
    fontWeight: 'bold',
  },
  default: {
    fontSize: 16,
    fontFamily: 'Oxygen-Regular',
  },
  secondary: {
    fontSize: 14,
    fontFamily: 'Oxygen-Regular',
  },
  secondaryEmphasis: {
    fontSize: 14,
    fontFamily: 'Oxygen-Regular',
    fontWeight: 'bold',
  },
  secondaryCaps: {
    fontSize: 14,
    fontFamily: 'Oxygen',
    textTransform: 'uppercase',
  },
  tertiary: {
    fontSize: 12,
    fontFamily: 'Oxygen-Regular',
  },
  tertiaryEmphasis: {
    fontSize: 12,
    fontFamily: 'Oxygen-Regular',
    fontWeight: 'bold',
  },
});

const containers = StyleSheet.create({
  fill: {
    flex: 1,
  },
  pad: {
    padding: whitespaces.margin,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export {colors, texts, containers, maxWidth, maxHeight, whitespaces};
