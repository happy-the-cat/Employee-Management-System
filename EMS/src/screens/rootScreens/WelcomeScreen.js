import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Text, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {ButtonPrimary, ButtonSecondary} from '../../component/buttons';
import * as Styles from '../../styles';

const WelcomeScreen = ({navigation}) => {
  const [selectedUserType, setSelectedUserType] = useState();

  return (
    <View style={localStyles.container}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <Text style={Styles.texts.app_name}>Employee Management System</Text>
      <Image
        style={localStyles.image}
        source={require('../../../assets/images/welcome_cats.png')}
      />
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={Styles.texts.title}> What are you? </Text>
        <Picker
          style={Styles.texts.default}
          selectedValue={selectedUserType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedUserType(itemValue)
          }>
          <Picker.Item label="Employee" value="employee" />
          <Picker.Item label="Human Resources" value="hr" />
        </Picker>
        <ButtonPrimary
          title={'Sign Up'}
          onPress={() => navigation.navigate('SignupScreen')}
        />
        <ButtonSecondary
          title={'Log In'}
          onPress={() => navigation.navigate('LoginScreen')}
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
  image: {
    ...Styles.containers.fill,
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;
