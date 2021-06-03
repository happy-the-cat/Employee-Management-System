import React from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarStrip from 'react-native-calendar-strip';
import * as Animatable from 'react-native-animatable';

import {FocusAwareStatusBar} from '../component/FocusAwareStatusBar';
import {IconCard} from '../component/IconCard';

import * as Styles from '../Styles';
import * as Utilities from '../Utilities';
import ClockInImg from '../../assets/images/clock-in.svg';
import ClockOutImg from '../../assets/images/clock-out.svg';

const AttendanceScreen = ({navigation}) => {
  const imgWidth = (Styles.maxWidth - 30 * 4 - 20) / 2;
  const imgHeight = 70;
  const datesWhitelist = [
    {
      start: Date(),
      end: (new Date() + 3).toString(),
    },
  ];
  const datesBlacklist = [new Date() + 1]; // 1 day disabled

  navigation.setOptions({
    headerStyle: {
      backgroundColor: Styles.colors.primary,
      shadowColor: 'transparent',
    },
    headerTitleStyle: {
      color: Styles.colors.onPrimary,
    },
    headerTintColor: Styles.colors.onPrimary,
  });

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <FocusAwareStatusBar
        backgroundColor={Styles.colors.primary}
        barStyle="light-content"
      />
      <Animatable.View animation={'fadeInDownBig'}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          selectedDate={new Date().toISOString()}
          style={localStyles.calendar}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={Styles.colors.primary}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: 'yellow'}}
          highlightDateNameStyle={{color: 'yellow'}}
          highlightDateContainerStyle={{
            borderWidth: 0,
            backgroundColor:
              'rgba(' + Utilities.hexToRgb(Styles.colors.secondary) + ',0.3)',
          }}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          // datesWhitelist={datesWhitelist}
          // datesBlacklist={datesBlacklist}
          iconContainer={{flex: 0.1}}
        />
      </Animatable.View>
      <ScrollView>
        <Animatable.View
          style={localStyles.horizontalContainer}
          animation={'fadeInUpBig'}>
          <IconCard
            title="Clock In"
            onPress={null /*TODO: record time in time*/}
            image={<ClockInImg height={imgHeight} width={imgWidth} />}
            containerStyle={localStyles.card}
          />
          <IconCard
            title="Clock Out"
            onPress={
              null /*TODO: record time out time & get the diff to record work hrs today*/
            }
            image={<ClockOutImg height={imgHeight} width={imgWidth} />}
            containerStyle={localStyles.card}
          />
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    backgroundColor: Styles.colors.light,
  },
  horizontalContainer: {
    ...Styles.containers.horizontal,
    margin: Styles.whitespaces.inner,
  },
  calendar: {
    height: 140,
    paddingTop: Styles.whitespaces.inner,
    paddingBottom: Styles.whitespaces.margin,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  card: {
    margin: 10,
  },
});

export default AttendanceScreen;
