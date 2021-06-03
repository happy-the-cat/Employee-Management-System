import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DepartmentsScreen from './DepartmentsScreen';
import EmployeesScreen from './EmployeesScreen';
import AttendanceScreen from '../AttendanceScreen';

const Stack = createStackNavigator();

const EmployeeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      {/*<Stack.Screen name="Attendance" component={AttendanceScreen} />*/}
      <Stack.Screen name="Departments" component={DepartmentsScreen} />
      <Stack.Screen name="Employees" component={EmployeesScreen} />
    </Stack.Navigator>
  );
};

export default EmployeeStack;
