import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const WelcomeScreen = ({navigation}) => {
  const [selectedUserType, setSelectedUserType] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.view_center}>
        <Text style={styles.app_name}>Employee Management System</Text>
        <Image
          style={styles.image}
          source={require('./assets/welcome_cats.png')}
        />
      </View>
      <View style={styles.view_left}>
        <Text style={styles.title}> What are you? </Text>
        <Picker
          selectedValue={selectedUserType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedUserType(itemValue)
          }>
          <Picker.Item label="Employee" value="employee" />
          <Picker.Item label="Human Resources" value="hr" />
        </Picker>
        <TouchableOpacity style={styles.button_primary}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_secondary}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  view_center: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
  },
  view_left: {
    flex: 0.5,
    justifyContent: 'space-between',
    paddingVertical: 28,
  },
  app_name: {
    fontSize: 32,
    fontFamily: 'Oxygen',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    aspectRatio: 1.3,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Oxygen',
    fontWeight: 'bold',
  },
  default: {
    fontSize: 16,
    fontFamily: 'Oxygen',
  },
  button_primary: {
    backgroundColor: '#2962FF',
    padding: 10,
    fontSize: 14,
    fontFamily: 'Oxygen',
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#FFF',
    borderRadius: 20,
  },
  button_secondary: {
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 14,
    fontFamily: 'Oxygen',
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#000',
    borderRadius: 20,
  },
});

export default WelcomeScreen;
