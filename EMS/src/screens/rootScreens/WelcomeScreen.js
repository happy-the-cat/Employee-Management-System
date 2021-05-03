import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {ButtonPrimary, ButtonSecondary} from '../../component/buttons';
import * as Styles from '../../styles';
import WelcomeImg from '../../../assets/images/welcome_cats.svg';

const WelcomeScreen = ({navigation}) => {
  const [selectedUserType, setSelectedUserType] = useState();

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={Styles.texts.app_name}>Employee Management System</Text>
      <WelcomeImg height={'50%'} width={Styles.maxWidth} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={Styles.texts.title}> What are you? </Text>
        <View style={localStyles.pickerContainer}>
          <Picker
            prompt={'Select User Type'}
            style={localStyles.picker}
            selectedValue={selectedUserType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedUserType(itemValue)
            }>
            <Picker.Item label="Employee" value="employee" />
            <Picker.Item label="Human Resources" value="hr" />
          </Picker>
        </View>
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
  container: {
    ...Styles.containers.fill,
    ...Styles.containers.pad,
    backgroundColor: '#fff',
  },
  picker: {
    ...Styles.texts.default,
  },
  pickerContainer: {
    marginVertical: Styles.whitespaces.inner,
    borderColor: Styles.colors.lightGray,
    elevation: 4,
  },
});

export default WelcomeScreen;
