import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import {ButtonPrimary, LabelNButton} from '../../component/buttons';
import * as Styles from '../../styles';

const SignupScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    isChangeTextEmpty: true,
    isValidUsername: true,
    isValidPassword: true,
    isPasswordMatch: true,
    isValidEmail: true,
    isValidBirthday: true,
  });
  const [birthday, setBirthday] = useState(new Date(1598051730000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('M');
  const [pronoun, setPronoun] = useState('they');

  const handleChangeText = value => {
    if (value.trim().length !== 0) {
      setData({
        ...data,
        isChangeText: false,
      });
    } else {
      setData({
        ...data,
        isChangeText: true,
      });
    }
  };

  const handleEmailChange = value => {
    /*TODO*/
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
    /*TODO*/
  };

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={Styles.texts.title}> Sign Up </Text>
      <View style={Styles.containers.horizontal}>
        <Input
          placeholder="First Name"
          onChangeText={value => setData({firstName: value})}
          inputStyle={localStyles.inputText}
          inputContainerStyle={localStyles.inputContainer}
          errorMessage={!data.isChangeTextEmpty ? 'Invalid Input' : ''}
          renderErrorMessage={false}
        />
        <Input
          placeholder="Last Name"
          onChangeText={value => setData({lastName: value})}
          style={localStyles.inputText}
          errorMessage={!data.isChangeTextEmpty ? 'Invalid Input' : ''}
          renderErrorMessage={false}
        />
      </View>
      <Input
        placeholder="E-mail Address"
        onChangeText={value => handleEmailChange(value)}
        style={localStyles.inputText}
        autoCapitalize="none"
      />
      <Input
        placeholder="Username"
        onChangeText={value => handleUsernameChange(value)}
        style={localStyles.inputText}
        autoCapitalize="none"
        errorMessage={!data.isValidUsername ? 'Invalid Username' : ''}
        renderErrorMessage={false}
      />
      <Input
        placeholder="Password"
        onChangeText={value => handlePasswordChange(value)}
        secureTextEntry={true}
        style={localStyles.inputText}
        autoCapitalize="none"
        errorMessage={!data.isValidPassword ? 'Invalid Password' : ''}
        renderErrorMessage={false}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={value => handleMatchPassword(value)}
        secureTextEntry={true}
        style={localStyles.inputText}
        autoCapitalize="none"
        errorMessage={!data.isPasswordMatch ? 'Password does not match' : ''}
        renderErrorMessage={false}
      />
      <View>
        <View>
          <Button
            onPress={setShowDatePicker(true)}
            title="Select Date of Birth"
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, date) => setBirthday(date)}
          />
        )}
      </View>
      <View style={Styles.containers.horizontal}>
        <Picker
          style={Styles.texts.default}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          prompt={'Gender'}>
          <Picker.Item label="Male" value="M" />
          <Picker.Item label="Female" value="F" />
        </Picker>
        <Picker
          style={Styles.texts.default}
          selectedValue={pronoun}
          onValueChange={(itemValue, itemIndex) => setPronoun(itemValue)}
          prompt={'Pronoun'}>
          <Picker.Item label="He" value="he" />
          <Picker.Item label="She" value="she" />
          <Picker.Item label="They" value="they" />
        </Picker>
      </View>
      <ButtonPrimary
        title={'Sign Up'}
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <LabelNButton
        label={'Incorrect user type? Already have an account?'}
        title={'Return!'}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    backgroundColor: '#fff',
  },
  inputText: {
    ...Styles.texts.default,
    width: Styles.maxWidth,
  },
  inputContainer: {
    marginTop: Styles.whitespaces.inner,
  },
});

export default SignupScreen;
