import React from 'react';
import {Button, ScrollView} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

const AttendanceScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          title={'Profile'}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceScreen;
