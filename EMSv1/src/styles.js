import {StyleSheet} from 'react-native';

const colors = {
  light: '#fff',
  onBackground: '#000',
  primary: '#2962FF',
  onPrimary: '#fff',
  secondary: '#E7EDF7',
  onSecondary: '#000',
};

const texts = StyleSheet.create({
  app_name: {
    fontSize: 32,
    fontFamily: 'Oxygen',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  secondaryEmphasis: {
    fontFamily: 'Oxygen',
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

export {colors, texts};
