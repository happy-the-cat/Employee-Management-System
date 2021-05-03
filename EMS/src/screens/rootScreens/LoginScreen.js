import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import {Input, Button} from 'react-native-elements';

import {ButtonPrimary} from '../../component/buttons';
import * as Styles from '../../styles';
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

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <LoginImg height={'40%'} width={Styles.maxWidth} />
      <Text style={localStyles.header}> Log In </Text>
      <Input
        placeholder="Enter Username"
        onChangeText={value => handleUsernameChange(value)}
        inputStyle={localStyles.inputText}
        inputContainerStyle={localStyles.inputContainer}
        autoCapitalize="none"
        errorMessage={!data.isValidUsername ? 'Invalid Username' : ''}
        renderErrorMessage={false}
      />
      <Input
        placeholder="Enter Password"
        onChangeText={value => handlePasswordChange(value)}
        secureTextEntry={true}
        inputStyle={localStyles.inputText}
        inputContainerStyle={localStyles.inputContainer}
        autoCapitalize="none"
        errorMessage={!data.isValidPassword ? 'Invalid Password' : ''}
        renderErrorMessage={false}
      />
      <View style={{alignItems: 'flex-end'}}>
        <Button
          titleStyle={[
            Styles.texts.secondary,
            {color: Styles.colors.onBackground},
          ]}
          type="clear"
          title={'Forgot Password?'}
          /*TODO: add handler for Forgot Password onPress prop*/
        />
      </View>
      <View style={{padding: 28, alignItems: 'center'}}>
        <ButtonPrimary
          title={'Log In'}
          /*TODO: add handler function for pressing login button to onPress prop*/
        />
        <Text
          style={[
            Styles.texts.secondary,
            {marginTop: Styles.whitespaces.outer},
          ]}>
          {'Incorrect user type? Don’t have an account?'}
        </Text>
        <Button
          titleStyle={[
            Styles.texts.secondaryEmphasis,
            {color: Styles.colors.onBackground},
          ]}
          containerStyle={{
            marginVertical: -3,
          }}
          type="clear"
          title={'Return!'}
          onPress={() => navigation.goBack()}
        />
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
  header: {
    ...Styles.texts.title,
    marginTop: Styles.whitespaces.outer,
  },
  inputText: {
    ...Styles.texts.default,
    width: Styles.maxWidth,
  },
  inputContainer: {
    marginTop: Styles.whitespaces.inner,
  },
});

export default LoginScreen;
