import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';

import {AuthContext} from './src/component/Context';

import RootStack from './src/screens/rootScreens/RootStack';
import EmployeeStack from './src/screens/employeeScreens/EmployeeStack';
import HRStack from './src/screens/hrScreens/HRStack';
import AttendanceScreen from './src/screens/AttendanceScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const NotificationsScreen = () => {
  return <SafeAreaView />;
};

const App = () => {
  const userType = 'hr'; /*TODO: test, remove later*/
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: 'null',
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userType, userName, password) => {
        /*TODO: actual scenario username and password r fetch by some API then
         *  match against some user-pass in the database,
         *  token is also retrieved from database */
        let userToken;
        userToken = null;
        if (userName === 'user' && password === 'pass') {
          try {
            userToken = 'dummy-tokenn';
            await EncryptedStorage.setItem(
              'userSession',
              JSON.stringify({
                userToken: userToken,
                userType: userType,
              }),
            );
          } catch (e) {
            console.log(e);
          }
        }
        console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await EncryptedStorage.removeItem('userSession');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fdfg');
        // setIsLoading(false);
      },
    }),
    [],
  );
  //
  // React.useEffect(() => {
  //   setTimeout(async () => {
  //     /* TODO: fetch some token from storage or database */
  //     let userToken = null;
  //     try {
  //       const session = await EncryptedStorage.getItem('userSession');
  //       userToken = session.getItem('userToken');
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     console.log('user token: ', userToken);
  //     dispatch({type: 'SIGNUP', token: userToken});
  //   }, 1000);
  // }, []);
  //
  // if (loginState.isLoading) {
  //   return (
  //     <View style={localStyles.loadingContainer}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{userType: userType}}
          options={{headerShown: false}}
        />
        {userType.toLowerCase() === 'hr' ? (
          <Stack.Screen
            name="HRScreens"
            component={HRStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="EmployeeScreens"
            component={EmployeeStack}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name={'Profile'}
          component={ProfileScreen}
          options={({navigation}) => ({
            headerStyle: {
              backgroundColor: 'white',
            },
            headerLeft: () => (
              <Ionicons
                style={{marginLeft: 16}}
                name={'arrow-back-outline'}
                color={'green'}
                size={24}
                onPress={() => {
                  navigation.navigate('Home');
                }}
              />
            ),
            headerBackTitleVisible: false,
            headerTitle: '',
            headerRight: () => (
              <Ionicons
                style={{marginRight: 16}}
                name={'pencil-outline'}
                color={'green'}
                size={24}
              />
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Tab.Navigator initialRouteName={HomeStack} labeled={false}>
              <Tab.Screen
                name={'Home'}
                component={HomeStack}
                options={{
                  tabBarIcon: ({focused, color}) => (
                    <Ionicons
                      name={focused ? 'apps' : 'apps-outline'}
                      color={color}
                      size={24}
                    />
                  ),
                  tabBarColor: 'darkblue',
                }}
              />
              <Tab.Screen
                name={'Profile'}
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({focused, color}) => (
                    <Ionicons
                      name={focused ? 'person' : 'person-outline'}
                      color={color}
                      size={24}
                    />
                  ),
                  tabBarColor: 'darkgreen',
                }}
              />
              <Tab.Screen
                name={'Notifications'}
                component={NotificationsScreen}
                options={{
                  tabBarIcon: ({focused, color}) => (
                    <Ionicons
                      name={focused ? 'notifications' : 'notifications-outline'}
                      color={color}
                      size={24}
                    />
                  ),
                  tabBarColor: 'darkred',
                }}
              />
              <Tab.Screen
                name={'Attendance'}
                component={AttendanceScreen}
                options={{
                  tabBarIcon: ({focused, color}) => (
                    <Ionicons
                      name={focused ? 'alarm' : 'alarm-outline'}
                      color={color}
                      size={24}
                    />
                  ),
                  tabBarColor: 'indigo',
                }}
              />
            </Tab.Navigator>
          ) : (
            <RootStack />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};

const localStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

// base data structures
// class Company {
//   constructor(
//     employees,
//     departments,
//     payrolls,
//     maximumPersonalLeaves,
//     maximumSickLeaves,
//     leaveRequests,
//   ) {
//     this.employees = employees;
//     this.departments = departments;
//     this.payrolls = payrolls;
//     this.maximumPersonalLeaves = maximumPersonalLeaves;
//     this.maximumSickLeaves = maximumSickLeaves;
//     this.leaveRequests = leaveRequests;
//   }
// }
//
// class Payroll {
//   constructor(startingDate, endingDate, wages) {
//     this.startingDate = startingDate;
//     this.endingDate = endingDate;
//     this.wages = wages;
//   }
// }
//
// const PaymentMethod = Object.freeze({
//   BANK_TRANSFER: 1,
//   CHECK: 2,
// });
//
// const PaymentStatus = Object.freeze({
//   PENDING: 1,
//   COMPLETE: 2,
// });
//
// class Wages {
//   constructor(
//     employeeIDNumber,
//     hoursWorkedEachDay,
//     rateOfPay,
//     grossAmountEarned,
//     totalDeductions,
//     netWagesPaidForWeek,
//     paymentMethod,
//     paymentStatus,
//   ) {
//     this.employeeIDNumber = employeeIDNumber;
//     this.rateOfPay = rateOfPay;
//     this.grossAmountEarned = grossAmountEarned;
//     this.totalDeductions = totalDeductions;
//     this.netWagesPaidForWeek = netWagesPaidForWeek;
//     this.paymentMethod = paymentMethod;
//     this.paymentStatus = paymentStatus;
//   }
// }
//
// class Department {
//   constructor(departmentIDNumber, title, headIDNumber, memberIDNumbers) {
//     this.departmentIDNumber = departmentIDNumber;
//     this.title = title;
//     this.headIDNumber = headIDNumber;
//     this.memberIDNumbers = memberIDNumbers;
//   }
// }
//
// class Skill {
//   constructor(skill, percentage) {
//     this.skill = skill;
//     this.percentage = percentage;
//   }
// }
//
// class Employee extends User {
//   constructor(
//     userCredentials,
//     firstName,
//     lastName,
//     emailAddress,
//     dateOfBirth,
//     gender,
//     pronoun,
//     employeeIDNumber,
//     title,
//     employmentType,
//     departmentIDNumber,
//     beginDate,
//     address,
//     educations,
//     workExperiences,
//     skills,
//     socialSecurityNumber,
//     leaveBenefits,
//     isCompanyAdmin,
//     isDepartmentHead,
//   ) {
//     super(
//       userCredentials,
//       firstName,
//       lastName,
//       emailAddress,
//       dateOfBirth,
//       gender,
//       pronoun,
//     );
//     this.employeeIDNumber = employeeIDNumber;
//     this.title = title;
//     this.employmentType = employmentType;
//     this.departmentIDNumber = departmentIDNumber;
//     this.beginDate = beginDate;
//     this.address = address;
//     this.educations = educations;
//     this.workExperiences = workExperiences;
//     this.skills = skills;
//     this.socialSecurityNumber = socialSecurityNumber;
//     this.leaveBenefits = leaveBenefits;
//     this.isCompanyAdmin = isCompanyAdmin;
//     this.isDepartmentHead = isDepartmentHead;
//   }
// }
//
// const LeaveBenefitType = Object.freeze({
//   PERSONAL_LEAVE: 1,
//   SICK_LEAVE: 2,
// });
//
// const LEAVE_REQUEST_STATUS = Object.freeze({
//   PENDING: 1,
//   APPROVED: 2,
//   DENIED: 3,
// });
//
// class LeaveRequest {
//   constructor(
//     employeeIDNumber,
//     leaveBenefitType,
//     leaveRequestStatus,
//     startingDate,
//     endingDate,
//     isPaidLeave,
//   ) {
//     this.employeeIDNumber = employeeIDNumber;
//     this.leaveBenefitType = leaveBenefitType;
//     this.leaveRequestStatus = leaveRequestStatus;
//     this.startingDate = startingDate;
//     this.endingDate = endingDate;
//     this.isPaidLeave = isPaidLeave;
//   }
// }
//
// class LeaveBenefits {
//   constructor(personalLeaves, sickLeaves) {
//     this.personalLeaves = personalLeaves;
//     this.sickLeaves = sickLeaves;
//   }
// }
//
// class Address {
//   constructor(address1, address2, city, region, postalCode, telephoneNumber) {
//     this.address1 = address1;
//     this.address2 = address2;
//     this.city = city;
//     this.region = region;
//     this.postalCode = postalCode;
//     this.telephoneNumber = telephoneNumber;
//   }
// }
//
// class Education {
//   constructor(school, degree, fieldOfStudy, startYear, endYear) {
//     this.school = school;
//     this.degree = degree;
//     this.fieldOfStudy = fieldOfStudy;
//     this.startYear = startYear;
//     this.endYear = endYear;
//   }
// }
//
// const EmploymentType = Object.freeze({
//   FULL_TIME: 1,
//   PART_TIME: 2,
//   SELF_EMPLOYED: 3,
//   FREELANCE: 4,
//   CONTRACT: 5,
//   INTERNSHIP: 6,
//   APPRENTICESHIP: 7,
//   SEASONAL: 8,
// });
//
// class WorkExperience {
//   constructor(title, employmentType, company, location, startDate, endDate) {
//     this.title = title;
//     this.employmentType = employmentType;
//     this.company = company;
//     this.location = location;
//     this.startDate = startDate;
//     this.endDate = endDate;
//   }
// }
//
// class User {
//   constructor(
//     userCredentials,
//     firstName,
//     lastName,
//     emailAddress,
//     dateOfBirth,
//     gender,
//     pronoun,
//   ) {
//     this.userCredentials = userCredentials;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.emailAddress = emailAddress;
//     this.dateOfBirth = dateOfBirth;
//     this.gender = gender;
//     this.pronoun = pronoun;
//   }
// }
//
// class UserCredentials {
//   constructor(username, password, userIDNumber) {
//     this.username = username;
//     this.password = password;
//     this.userIDNumber = userIDNumber;
//   }
// }
