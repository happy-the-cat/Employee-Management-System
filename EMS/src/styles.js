import {StyleSheet, Dimensions} from 'react-native';

const maxWidth = Dimensions.get('window').width - 30 * 2;

const colors = {
  light: '#fff',
  onBackground: '#000',
  primary: '#2962FF',
  primaryLight: '529CFF',
  primaryDark: '0039CB',
  onPrimary: '#fff',
  secondary: '#E7EDF7',
  onSecondary: '#000',
  gray: '8F8F8F',
  darkGray: '333333',
  lightGray: 'E0E0E0',
  highlight: '80D8FF',
  error: 'D50000',
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
    fontFamily: 'Oxygen-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  secondaryCaps: {
    fontFamily: 'Oxygen',
    fontSize: 14,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

const containers = StyleSheet.create({
  fill: {
    flex: 1,
  },
  pad: {
    padding: 30,
  },
});

export {colors, texts, containers, maxWidth};
