import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DepartmentsStack from './DepartmentsScreen';
import EmployeesScreen from './EmployeesScreen';
import AttendanceScreen from '../AttendanceScreen';

const Stack = createStackNavigator();

const HRStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      {/*<Stack.Screen name="Attendance" component={AttendanceScreen} />*/}
      <Stack.Screen
        name="Departments"
        component={DepartmentsStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Employees" component={EmployeesScreen} />
    </Stack.Navigator>
  );
};

export default HRStack;
