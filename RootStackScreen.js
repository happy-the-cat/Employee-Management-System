import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
