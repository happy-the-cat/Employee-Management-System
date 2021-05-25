import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {SafeAreaView} from 'react-native-safe-area-context';

import {RoundAvatar} from '../component/Avatar';
import {IconCard} from '../component/IconCard';
import {FocusAwareStatusBar} from '../component/FocusAwareStatusBar';

import * as Styles from '../Styles';
import AttendanceImg from '../../assets/featuresIcons/attendance.svg';
import TimesheetImg from '../../assets/featuresIcons/timesheet.svg';
import LeavesImg from '../../assets/featuresIcons/leaves.svg';
import PayrollImg from '../../assets/featuresIcons/payroll.svg';
import CaseImg from '../../assets/featuresIcons/case.svg';
import DepartmentsImg from '../../assets/featuresIcons/departments.svg';
import EmployeesImg from '../../assets/featuresIcons/employees.svg';
import SubscriptionImg from '../../assets/featuresIcons/subscription.svg';

const HomeScreen = ({navigation, route}) => {
  const imgWidth = (Styles.maxWidth - 30 * 4 - 20) / 2;
  const imgHeight = 70;
  const {userType} = route.params;
  const user = {
    /* TODO: retrieve user credentials from database */
    name: 'Mia Smith',
    department: 'Information Technology',
  };
  const features = [
    {
      title: 'Timesheet',
      image: <TimesheetImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : '',
    },
    {
      title: 'Leaves',
      image: <LeavesImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : '',
    },
    {
      title: 'Payroll',
      image: <PayrollImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : '',
    },
    {
      title: 'Case',
      image: <CaseImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : '',
    },
    {
      title: 'Departments',
      image: <DepartmentsImg height={imgHeight} width={imgWidth} />,
      screen:
        userType.toLowerCase() === 'hr'
          ? () =>
              navigation.navigate('HRScreens', {screen: 'DepartmentsScreen'})
          : () =>
              navigation.navigate('EmployeeScreens', {
                screen: 'DepartmentsScreen',
              }),
    },
    {
      title: 'Employees',
      image: <EmployeesImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : '',
    },
    {
      title: 'Subscription',
      image: <SubscriptionImg height={imgHeight} width={imgWidth} />,
      screen: userType.toLowerCase() === 'hr' ? '' : null,
    },
  ];

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <FocusAwareStatusBar
        backgroundColor={Styles.colors.primaryLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <Image
          source={require('../../assets/images/ellipse.png')}
          style={{position: 'absolute', zIndex: -1}}
        />
        <View style={localStyles.headerContainer}>
          <RoundAvatar
            containerStyle={localStyles.headerAvatar}
            onPress={() => navigation.navigate('Profile')}
          />
          <View style={localStyles.headerTextContainer}>
            {/* TODO: add user's name and department prop */}
            <Text style={Styles.texts.title}>{user.name}</Text>
            <Text style={Styles.texts.secondary}>{user.department}</Text>
          </View>
        </View>
        {/* footer */}
        <View style={localStyles.footer}>
          {features.map((value, index, array) => {
            if (index % 2 === 0) {
              return (
                <View key={nanoid()} style={Styles.containers.horizontal}>
                  {value.screen !== null ? (
                    <IconCard
                      title={value.title}
                      onPress={value.screen}
                      image={value.image}
                      containerStyle={localStyles.card}
                    />
                  ) : null}
                  {index + 1 < array.length &&
                  array[index + 1].screen !== null ? (
                    <IconCard
                      title={array[index + 1].title}
                      onPress={array[index + 1].screen}
                      image={array[index + 1].image}
                      containerStyle={localStyles.card}
                    />
                  ) : null}
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    backgroundColor: Styles.colors.primaryLight,
  },
  headerContainer: {
    ...Styles.containers.horizontal,
    marginHorizontal: Styles.whitespaces.inner,
    marginBottom: Styles.whitespaces.outer,
    paddingTop: Styles.whitespaces.inner,
  },
  headerAvatar: {
    borderColor: Styles.colors.gray,
    borderWidth: 1,
  },
  headerTextContainer: {
    justifyContent: 'flex-start',
    marginHorizontal: Styles.whitespaces.inner,
  },
  footer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Styles.colors.light,
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  card: {
    margin: 10,
  },
});

export default HomeScreen;
