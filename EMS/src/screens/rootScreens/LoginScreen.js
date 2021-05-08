import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

import {ButtonPrimary, ButtonTextOnly} from '../../component/Button';
import {TextInput} from '../../component/TextInput';

import * as Styles from '../../Styles';

import LoginImg from '../../../assets/images/login.svg';

const LoginScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    isValidUsername: true,
    isValidPassword: true,
    secureTextEntry: true,
  });

  const handleUsernameChange = value => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        username: value,
        isValidUsername: true,
      });
    } else {
      setData({
        ...data,
        isValidUsername: false,
      });
    }
  };

  const handlePasswordChange = value => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const handleLoginClick = () => {
    if (data.isValidUsername === true && data.isValidPassword === true) {
      /*TODO: add handler function for pressing login button*/
    }
  };

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <LoginImg height={'40%'} width={Styles.maxWidth} />
      <Text style={localStyles.header}> Log In </Text>
      <TextInput
        placeholder="Enter Username"
        onChangeText={value => handleUsernameChange(value)}
        errorMessage={!data.isValidUsername ? 'Invalid Username' : ''}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter Password"
        onChangeText={value => handlePasswordChange(value)}
        errorMessage={!data.isValidPassword ? 'Invalid Password' : ''}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <View style={localStyles.rightAligned}>
        <ButtonTextOnly
          title={'Forgot Password?'}
          /*TODO: add handler for Forgot Password onPress prop*/
        />
      </View>
      <View style={localStyles.footerContainer}>
        <ButtonPrimary title={'Log In'} onPress={handleLoginClick} />
        <Text
          style={[
            Styles.texts.secondary,
            {marginTop: Styles.whitespaces.outer},
          ]}>
          {'Incorrect user type? Don’t have an account?'}
        </Text>
        <ButtonTextOnly title={'Return!'} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    backgroundColor: '#fff',
  },
  footerContainer: {
    padding: 28,
    alignItems: 'center',
  },
  header: {
    ...Styles.texts.title,
    marginTop: Styles.whitespaces.outer,
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
});

export default LoginScreen;
