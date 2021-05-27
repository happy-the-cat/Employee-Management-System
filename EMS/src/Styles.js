import {StyleSheet, Dimensions} from 'react-native';

// Constants
const maxWidth = Dimensions.get('window').width - 30 * 2;
const maxHeight = Dimensions.get('window').height - 30 * 2;

const whitespaces = {
  margin: 30,
  outer: 28,
  inner: 14,
};

const colors = {
  light: '#ffffff',
  onBackground: '#000000',
  primary: '#2962FF',
  primaryLight: '#529CFF',
  primaryDark: '#0039CB',
  onPrimary: '#ffffff',
  secondary: '#E7EDF7',
  onSecondary: '#000000',
  gray: '#8F8F8F',
  darkGray: '#333333',
  lightGray: '#E0E0E0',
  highlight: '#80D8FF',
  error: '#D50000',
};

// Styles
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
  overlap: {
    position: 'absolute',
    zIndex: -1,
  },
  flip: {
    transform: [{scaleX: -1}],
  },
});

// Functions
const hexToRgb = hex =>
  // Source: https://stackoverflow.com/a/39077686
  // Returns a string of r, g, b
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .toString();

export {colors, texts, containers, maxWidth, maxHeight, whitespaces};
export {hexToRgb};
