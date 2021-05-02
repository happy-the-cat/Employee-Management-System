import * as React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Styles from '../../styles';
import {ButtonPrimary, TextOnlyButton} from '../../component/buttons';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';

const WelcomeScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
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
      <View style={localStyles.viewHorizontal}>
        <Input
          placeholder="First Name"
          placeholderTextColor={Styles.colors.gray}
          style={localStyles.textInput}
          onChangeText={value => setData({firstName: value})}
        />
        <Input
          placeholder="Last Name"
          placeholderTextColor={Styles.colors.gray}
          style={localStyles.textInput}
          onChangeText={value => setData({lastName: value})}
        />
      </View>
      <Input
        placeholder="E-mail Address"
        placeholderTextColor={Styles.colors.gray}
        style={localStyles.textInput}
        autoCapitalize="none"
        onChangeText={value => handleEmailChange(value)}
      />
      <Input
        placeholder="Username"
        placeholderTextColor={Styles.colors.gray}
        style={localStyles.textInput}
        autoCapitalize="none"
        onChangeText={value => handleUsernameChange(value)}
      />
      <Input
        placeholder="Password"
        placeholderTextColor={Styles.colors.gray}
        secureTextEntry={true}
        style={localStyles.textInput}
        autoCapitalize="none"
        onChangeText={value => handlePasswordChange(value)}
      />
      <Input
        placeholder="Confirm Password"
        placeholderTextColor={Styles.colors.gray}
        secureTextEntry={true}
        style={localStyles.textInput}
        autoCapitalize="none"
        onChangeText={value => handleMatchPassword(value)}
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
      <View style={localStyles.viewHorizontal}>
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
        title="Already have an account? Log In!"
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
  viewHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textInput: {
    ...Styles.texts.default,
    width: Styles.maxWidth,
    topMargin: 28,
  },
});

export default WelcomeScreen;
