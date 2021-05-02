import * as React from 'react';
import {View, Image, StyleSheet, Text, StatusBar} from 'react-native';
import {Input, Button} from 'react-native-elements';

import * as Styles from '../../styles';
import {ButtonPrimary, TextOnlyButton} from '../../component/buttons';

const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    isValidUsername: true,
    isValidPassword: true,
  });

  const handleUsernameChange = value => {
    if (value.trim().length >= 9) {
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
      <View style={{flex: 1}}>
        <Image
          style={localStyles.image}
          source={require('../../../assets/images/login.png')}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={Styles.texts.title}> Log In </Text>
        <Input
          placeholder="Enter Username"
          placeholderTextColor={Styles.colors.gray}
          style={localStyles.textInput}
          autoCapitalize="none"
          onChangeText={value => handleUsernameChange(value)}
        />
        <Input
          placeholder="Enter Password"
          placeholderTextColor={Styles.colors.gray}
          secureTextEntry={true}
          style={localStyles.textInput}
          autoCapitalize="none"
          onChangeText={value => handlePasswordChange(value)}
        />
        <Text style={[Styles.texts.secondary, {textAlign: 'right'}]}>
          {' '}
          Forgot Password?{' '}
        </Text>
        <View style={{padding: 28, alignItems: 'center'}}>
          <ButtonPrimary
            title={'Log In'}
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Button
            titleStyle={[
              Styles.texts.secondary,
              {color: Styles.colors.onBackground},
            ]}
            type="clear"
            title="Incorrect user type? Return!"
          />
          <Button
            titleStyle={[
              Styles.texts.secondary,
              {color: Styles.colors.onBackground},
            ]}
            type="clear"
            title="Don’t have an account? Sign Up!"
          />
        </View>
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
  image: {
    ...Styles.containers.fill,
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  textInput: {
    ...Styles.texts.default,
    width: Styles.maxWidth,
    topMargin: 28,
  },
  button: {
    ...Styles.texts.secondary,
  },
});

export default LoginScreen;
