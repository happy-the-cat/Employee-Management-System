import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar, Alert} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from '../../component/Context';
import {ButtonPrimary, ButtonTextOnly} from '../../component/Button';
import {InputField} from '../../component/InputField';

import {Users} from '../../../model/users';
import * as Styles from '../../Styles';

import LoginImg from '../../../assets/images/login.svg';

const LoginScreen = ({navigation, route}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    isValidUsername: false,
    isValidPassword: false,
    secureTextEntry: false,
  });
  const {userType} = route.params;
  const {signIn} = React.useContext(AuthContext);

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

  const handleLogin = (username, password) => {
    if (data.isValidUsername === true && data.isValidPassword === true) {
      /*TODO: add handler function for pressing login button*/
      const foundUser = Users.filter(item => {
        return username === item.username && password === item.password;
      });
      if (data.username.length === 0 || data.password.length === 0) {
        Alert.alert('Login Failed :(', 'Username or password is incorrect.');
      } else {
        signIn(foundUser);
      }
    } else {
      Alert.alert('Invalid Input', 'Username and password must not be empty.');
    }
  };

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <LoginImg height={'40%'} width={Styles.maxWidth} />
      <Text style={localStyles.header}> Log In </Text>
      <InputField
        placeholder="Enter Username"
        onChangeText={value => handleUsernameChange(value)}
        errorMessage={!data.isValidUsername ? 'Invalid Username' : ''}
        autoCapitalize="none"
      />
      <InputField
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
        <ButtonPrimary
          title={'Log In'}
          onPress={() => {
            handleLogin(data.username, data.password);
          }}
        />
        <Text
          style={[
            Styles.texts.secondary,
            {marginTop: Styles.whitespaces.outer},
          ]}>
          {'Incorrect user type? Don’t have an account?'}
        </Text>
        <ButtonTextOnly title={'Return!'} onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    backgroundColor: Styles.colors.light,
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
