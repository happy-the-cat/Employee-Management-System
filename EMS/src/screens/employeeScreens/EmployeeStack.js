import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DepartmentsScreen from './DepartmentsScreen';

const Stack = createStackNavigator();

const EmployeeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Departments" component={DepartmentsScreen} />
    </Stack.Navigator>
  );
};

export default EmployeeStack;
