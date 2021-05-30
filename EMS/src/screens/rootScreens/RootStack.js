import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const Stack = createStackNavigator();

const RootStack = ({navigation}) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
