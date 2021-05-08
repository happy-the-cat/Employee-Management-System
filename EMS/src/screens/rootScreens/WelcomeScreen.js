import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text} from 'react-native';

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
    <View style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={Styles.texts.app_name}>Employee Management System</Text>
      <WelcomeImg height={'50%'} width={Styles.maxWidth} />
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
          onPress={() => navigation.navigate('SignupScreen')}
          containerStyle={{marginVertical: Styles.whitespaces.inner}}
        />
        <ButtonSecondary
          title={'Log In'}
          onPress={() => navigation.navigate('LoginScreen')}
          containerStyle={{marginVertical: Styles.whitespaces.inner}}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    backgroundColor: '#fff',
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
