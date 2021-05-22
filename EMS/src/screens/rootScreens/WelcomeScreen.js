import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {ButtonPrimary, ButtonSecondary} from '../../component/Button';
import {DropdownPicker} from '../../component/DropdownPicker';
import * as Styles from '../../Styles';
import WelcomeImg from '../../../assets/images/welcome_cats.svg';

const WelcomeScreen = ({navigation}) => {
  const [selectedUserType, setSelectedUserType] = useState();
  const userTypes = {
    employee: 'Employee',
    hr: 'Human Resources',
  };

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={localStyles.appName}>Employee Management System</Text>
      <WelcomeImg height={Styles.maxHeight / 3} width={Styles.maxWidth - 20} />
      <View style={localStyles.footerContainer}>
        <Text style={Styles.texts.title}> What are you? </Text>
        <DropdownPicker
          prompt="Select User Type"
          selectedValue={selectedUserType}
          onValueChange={itemValue => setSelectedUserType(itemValue)}
          pickerItems={userTypes}
        />
        <ButtonPrimary
          title={'Sign Up'}
          onPress={() =>
            navigation.navigate('Signup', {userType: selectedUserType})
          }
          containerStyle={{marginVertical: Styles.whitespaces.inner}}
        />
        <ButtonSecondary
          title={'Log In'}
          onPress={() =>
            navigation.navigate('Login', {userType: selectedUserType})
          }
          containerStyle={{marginVertical: Styles.whitespaces.inner}}
        />
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    backgroundColor: Styles.colors.light,
    alignItems: 'center',
  },
  footerContainer: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    paddingTop: 0,
    justifyContent: 'center',
  },
  appName: {
    ...Styles.texts.app_name,
    ...Styles.containers.pad,
  },
});

export default WelcomeScreen;
