import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DepartmentsStack from './DepartmentsScreen';

const Stack = createStackNavigator();

const HRStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Departments"
        component={DepartmentsStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HRStack;
