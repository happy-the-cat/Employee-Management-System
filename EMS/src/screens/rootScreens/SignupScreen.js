import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {ButtonPrimary, ButtonTextOnly} from '../../component/Button';
import {TextInput} from '../../component/TextInput';
import {DropdownPicker} from '../../component/DropdownPicker';
import {OverlayDatePicker} from '../../component/OverlayDatePicker';

import * as Styles from '../../Styles';

const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    isValidFirstName: true,
    isValidLastName: true,
    isValidUsername: true,
    isValidPassword: true,
    isPasswordMatch: true,
    isValidEmail: true,
  });
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('M');
  const [pronoun, setPronoun] = useState('they');
  const genderOptions = {
    M: 'Male',
    F: 'Female',
  };
  const pronounOptions = {
    he: 'He',
    she: 'She',
    they: 'They',
  };

  const handleNameChange = (value, isFirstName) => {
    if (value.trim().length >= 2) {
      if (isFirstName) {
        setData({
          ...data,
          firstName: value,
          isValidFirstName: true,
        });
      } else {
        setData({
          ...data,
          lastName: value,
          isValidLastName: true,
        });
      }
    } else {
      if (isFirstName) {
        setData({
          ...data,
          isValidFirstName: false,
        });
      } else {
        setData({
          ...data,
          isValidLastName: false,
        });
      }
    }
  };

  const handleEmailChange = value => {
    const condition = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/);
    if (condition.test(value)) {
      setData({
        ...data,
        emailAddress: value,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        emailAddress: value,
        isValidEmail: false,
      });
    }
  };

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
        username: value,
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

  const handleMatchPassword = value => {
    if (value === data.password) {
      setData({
        ...data,
        isPasswordMatch: true,
      });
    } else {
      setData({
        ...data,
        isPasswordMatch: false,
      });
    }
  };

  const handleSignupClick = () => {
    if (
      data.isValidUsername === true &&
      data.isValidFirstName === true &&
      data.isValidLastName === true &&
      data.isValidEmail === true &&
      data.isValidPassword === true &&
      data.isPasswordMatch === true
    ) {
      /*TODO: add handler function for pressing signup button*/
    }
  };

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={Styles.texts.title}> Sign Up </Text>
      <View style={localStyles.horizontalContainer}>
        <TextInput
          placeholder="First Name"
          onChangeText={value => handleNameChange(value, true)}
          containerStyle={localStyles.inputHalvedWidth}
          errorMessage={!data.isValidFirstName ? 'Invalid Input' : ''}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={value => handleNameChange(value, false)}
          containerStyle={localStyles.inputHalvedWidth}
          errorMessage={!data.isValidLastName ? 'Invalid Input' : ''}
        />
      </View>
      <TextInput
        placeholder="E-mail Address"
        onChangeText={value => handleEmailChange(value)}
        errorMessage={!data.isValidEmail ? 'Invalid Email' : ''}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Username"
        onChangeText={value => handleUsernameChange(value)}
        errorMessage={!data.isValidUsername ? 'Invalid Username' : ''}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={value => handlePasswordChange(value)}
        errorMessage={!data.isValidPassword ? 'Invalid Password' : ''}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={value => handleMatchPassword(value)}
        errorMessage={!data.isPasswordMatch ? 'Password does not match' : ''}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <OverlayDatePicker
        prompt={
          'Birthday: ' +
          birthday.getFullYear() +
          '-' +
          (birthday.getMonth() + 1) +
          '-' +
          birthday.getDate()
        }
        value={birthday}
        onChange={date => setBirthday(date)}
        maximumDate={new Date()}
        promptStyle={localStyles.datePickerPrompt}
      />
      <View style={localStyles.horizontalContainer}>
        <DropdownPicker
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}
          prompt={'Gender'}
          pickerItems={genderOptions}
          containerStyle={localStyles.pickerHalvedWidth}
        />
        <DropdownPicker
          selectedValue={pronoun}
          onValueChange={itemValue => setPronoun(itemValue)}
          prompt={'Pronoun'}
          pickerItems={pronounOptions}
          containerStyle={localStyles.pickerHalvedWidth}
        />
      </View>
      <View style={localStyles.footerContainer}>
        <ButtonPrimary title={'Sign Up'} onPress={handleSignupClick} />
        <Text
          style={[
            Styles.texts.secondary,
            {marginTop: Styles.whitespaces.outer},
          ]}>
          {'Incorrect user type? Already have an account?'}
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
    paddingVertical: 28,
    alignItems: 'center',
  },
  horizontalContainer: {
    ...Styles.containers.horizontal,
    justifyContent: 'space-between',
  },
  inputHalvedWidth: {
    width: Styles.maxWidth / 2,
  },
  pickerHalvedWidth: {
    width: Styles.maxWidth / 2 - Styles.whitespaces.inner,
  },
  datePickerPrompt: {
    width: Styles.maxWidth - Styles.whitespaces.inner - 5,
    marginTop: 30,
  },
});

export default SignupScreen;
