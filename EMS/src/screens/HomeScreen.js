import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';

import {AuthContext} from '../component/Context';
import {RoundAvatar} from '../component/Avatar';
import {IconCard} from '../component/IconCard';
import {FocusAwareStatusBar} from '../component/FocusAwareStatusBar';
import {ButtonTextOnly} from '../component/Button';

import * as Styles from '../Styles';
import * as Utilities from '../Utilities';
import AttendanceImg from '../../assets/featuresIcons/attendance.svg';
import LeavesImg from '../../assets/featuresIcons/leaves.svg';
import PayrollImg from '../../assets/featuresIcons/payroll.svg';
import CaseImg from '../../assets/featuresIcons/case.svg';
import DepartmentsImg from '../../assets/featuresIcons/departments.svg';
import EmployeesImg from '../../assets/featuresIcons/employees.svg';
import SubscriptionImg from '../../assets/featuresIcons/subscription.svg';

const HomeScreen = ({navigation, route}) => {
  const imgWidth = (Styles.maxWidth - 30 * 4 - 20) / 2;
  const imgHeight = 70;
  const {signOut} = React.useContext(AuthContext);
  const {userType} = route.params;
  const user = {
    /* TODO: retrieve user credentials from database */
    name: 'Mia Smith',
    department: 'Information Technology',
  };
  const features = [
    {
      title: 'Attendance',
      image: <AttendanceImg height={imgHeight} width={imgWidth} />,
      screen: () => navigation.navigate('Attendance'),
    },
    // {
    //   title: 'Leaves',
    //   image: <LeavesImg height={imgHeight} width={imgWidth} />,
    //   screen: userType.toLowerCase() === 'hr' ? '' : '',
    // },
    // {
    //   title: 'Payroll',
    //   image: <PayrollImg height={imgHeight} width={imgWidth} />,
    //   screen: userType.toLowerCase() === 'hr' ? '' : '',
    // },
    // {
    //   title: 'Case',
    //   image: <CaseImg height={imgHeight} width={imgWidth} />,
    //   screen: userType.toLowerCase() === 'hr' ? '' : '',
    // },
    {
      title: 'Departments',
      image: <DepartmentsImg height={imgHeight} width={imgWidth} />,
      screen:
        userType.toLowerCase() === 'hr'
          ? () => navigation.navigate('HRScreens', {screen: 'Departments'})
          : () =>
              navigation.navigate('EmployeeScreens', {
                screen: 'Departments',
              }),
    },
    {
      title: 'Employees',
      image: <EmployeesImg height={imgHeight} width={imgWidth} />,
      screen:
        userType.toLowerCase() === 'hr'
          ? () => navigation.navigate('HRScreens', {screen: 'Employees'})
          : () =>
              navigation.navigate('EmployeeScreens', {
                screen: 'Employees',
              }),
    },
    // {
    //   title: 'Subscription',
    //   image: <SubscriptionImg height={imgHeight} width={imgWidth} />,
    //   screen: userType.toLowerCase() === 'hr' ? '' : null,
    // },
  ];

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <FocusAwareStatusBar
        backgroundColor={Styles.colors.primaryLight}
        barStyle="dark-content"
      />
      <ScrollView style={Styles.containers.fill}>
        <Image
          source={require('../../assets/images/ellipse.png')}
          style={Styles.containers.overlap}
        />
        <Animatable.View
          animation={'fadeInDownBig'}
          style={localStyles.headerContainer}>
          <RoundAvatar
            title={user.name[0]}
            containerStyle={localStyles.headerAvatar}
          />
          <View style={localStyles.headerTextContainer}>
            {/* TODO: add user's name and department prop */}
            <Text style={Styles.texts.title}>{user.name}</Text>
            <Text style={Styles.texts.secondary}>{user.department}</Text>
          </View>
        </Animatable.View>
        {/* footer */}
        <Animatable.View animation={'fadeInUpBig'} style={localStyles.footer}>
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
          {/*<View style={{paddingTop: Styles.whitespaces.outer}}>*/}
          {/*  <ButtonTextOnly*/}
          {/*    title="Log Out"*/}
          {/*    onPress={signOut}*/}
          {/*    icon={*/}
          {/*      <Icon*/}
          {/*        name="log-out-outline"*/}
          {/*        type="ionicon"*/}
          {/*        size={24}*/}
          {/*        color={Styles.colors.light}*/}
          {/*        style={localStyles.logoutIcon}*/}
          {/*      />*/}
          {/*    }*/}
          {/*    containerStyle={localStyles.logoutButton}*/}
          {/*    textColor={Styles.colors.light}*/}
          {/*  />*/}
          {/*</View>*/}
        </Animatable.View>
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
    marginTop: Styles.whitespaces.inner,
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
    height: Styles.maxHeight - 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Styles.colors.light,
    paddingTop: 30,
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  card: {
    margin: 10,
    marginBottom: 20,
  },
  logoutButton: {
    borderColor: Styles.colors.error,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FF0000',
    //   'rgba(' + Utilities.hexToRgb(Styles.colors.error) + ',0.33)',
  },
  logoutIcon: {
    ...Styles.containers.flip,
    paddingLeft: Styles.whitespaces.inner / 2,
  },
});

export default HomeScreen;
