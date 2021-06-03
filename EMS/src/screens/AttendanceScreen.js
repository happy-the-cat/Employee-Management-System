import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';

import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar} from 'react-native-calendars';
import {Badge} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import {FocusAwareStatusBar} from '../component/FocusAwareStatusBar';
import {IconCard} from '../component/IconCard';

import * as Styles from '../Styles';
import {Attendance, HoursWorkedEachDay} from '../../model/attendance';
import * as Utilities from '../Utilities';
import ClockInImg from '../../assets/images/clock-in.svg';
import ClockOutImg from '../../assets/images/clock-out.svg';

const MarkedCalendar = ({markedDates, markingType}) => {
  return (
    <Calendar
      style={localStyles.calendar}
      markingType={markingType}
      markedDates={markedDates}
      displayLoadingIndicator
      disableMonthChange
      enableSwipeMonths
      theme={{
        calendarBackground: Styles.colors.secondary,
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: '#00BBF2',
        todayTextColor: '#00adf5',
        dayTextColor: Styles.colors.onBackground,
        monthTextColor: 'black',
        textMonthFontFamily: 'Oxygen-Regular',
        textMonthFontSize: 16,
        textDisabledColor: Styles.colors.gray,
        'stylesheet.calendar.header': {
          dayHeader: {
            ...Styles.texts.tertiary,
            textTransform: 'uppercase',
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            color: '#2d4150',
          },
        },
      }}
    />
  );
};

// Get the dates between startDate and stopDate, exclusive.
const getDatesBetween = (startDate, stopDate) => {
  const dateArray = [];
  let currentDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
  while (currentDate < stopDate) {
    dateArray.push(currentDate);
    currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
  }
  return dateArray;
};

const getMarkedDates = (dates, delimiter, color, textColor) => {
  const markedDates = {};
  if (dates) {
    dates.forEach(dateRange => {
      const splitDates = dateRange.split(delimiter);
      if (splitDates.length !== 1) {
        markedDates[splitDates[0]] = {
          startingDay: true,
          color: color,
          textColor: textColor,
        };
        if (!moment(splitDates[1]).subtract(1, 'days').isSame(splitDates[0])) {
          getDatesBetween(splitDates[0], splitDates[1]).forEach(
            date => (markedDates[date] = {color: color, textColor: textColor}), //71F5DA
          );
        }
        markedDates[splitDates[1]] = {
          endingDay: true,
          color: color,
          textColor: textColor,
        };
      } else {
        markedDates[splitDates[0]] = {
          startingDay: true,
          endingDay: true,
          color: color,
          textColor: textColor,
        };
      }
    });
  }
  return markedDates;
};

const AttendanceScreen = ({navigation}) => {
  const imgWidth = (Styles.maxWidth - 30 * 4 - 20) / 2;
  const imgHeight = 70;
  const [dates, setDates] = useState(Attendance);
  const [timeInOut, setTimeInOut] = useState({
    /*TODO: fetch from database*/
    timeIn: null,
    isTimeIn: false,
    workHrsToday: null,
    isTimeOut: false,
  });
  const [hoursWorkedEachDay, setHoursWorkedEachDay] = useState(
    HoursWorkedEachDay,
  );

  // Calendar markings & marked dates
  const workMarker = {color: 'turquoise', textColor: 'white'};
  const calendarMarkedDates = getMarkedDates(
    dates,
    ':',
    workMarker.color,
    workMarker.textColor,
  );

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

  const clockIn = () => {
    /* TODO (for clockout 2) : save time in cache/phone memory (asynchro storage?)
     * */
    const tempDates = dates;
    const today = moment().format('YYYY-MM-DD');
    if (tempDates) {
      const splitLastDateRange = tempDates[tempDates.length - 1].split(':');
      if (
        // User clocked in already (last date entry is same as today's date)
        moment(splitLastDateRange[0]).isSame(today) ||
        moment(splitLastDateRange[1]).isSame(today)
      ) {
        setTimeInOut({...timeInOut, isTimeIn: true});
        Alert.alert(
          'Invalid',
          'You have already clock-in for work today. Come back again tomorrow or next work day.',
        );
        return;
      } else if (
        // When last date entry is yesterday, update date range
        moment(splitLastDateRange[0]).add(1, 'days').isSame(today) ||
        moment(splitLastDateRange[1]).add(1, 'days').isSame(today)
      ) {
        tempDates.pop();
        tempDates.push(splitLastDateRange[0] + ':' + today);
        setDates(tempDates);
      } else {
        tempDates.pop();
        tempDates.push(splitLastDateRange[0] + ':' + today);
        setDates(tempDates);
      }
    } else {
      // When there is no date entry
      setDates(today);
    }
    setTimeInOut({
      ...timeInOut,
      timeIn: moment().format('YYYY-MM-DD HH:mm:ss'),
      isTimeIn: true,
    });
    Alert.alert(
      'Clocked In',
      'Clock in successful! Remember to come back later to clock out.',
    );
  };

  const clockOut = () => {
    // TODO: same todo as clockout
    // Reference: https://stackoverflow.com/a/18624295
    if (timeInOut.isTimeIn && !timeInOut.isTimeOut) {
      const timeOut = moment().format('YYYY-MM-DD HH:mm:ss');
      const milliseconds = moment(timeOut, 'YYYY-MM-DD HH:mm:ss').diff(
        moment(timeInOut.timeIn, 'YYYY-MM-DD HH:mm:ss'),
      );
      const duration = moment.duration(milliseconds);
      const workHours =
        Math.floor(duration.asHours()) +
        moment.utc(milliseconds).format(':mm:ss');
      setTimeInOut({
        ...timeInOut,
        workHrsToday: workHours,
        isTimeOut: true,
      });
      setHoursWorkedEachDay([...hoursWorkedEachDay, workHours]);
      console.log('timeIn: ' + timeInOut.timeIn + ' timeOut: ' + timeOut);
    } else {
      Alert.alert(
        'Invalid',
        'You either have yet to clock-in or have already clocked-out today.',
      );
    }
  };

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <FocusAwareStatusBar
        backgroundColor={Styles.colors.primary}
        barStyle="light-content"
      />
      <ScrollView>
        <Animatable.View
          style={localStyles.headerContainer}
          animation={'fadeInDownBig'}>
          <View style={localStyles.buttonsContainer}>
            <IconCard
              title="Clock In"
              onPress={clockIn}
              image={<ClockInImg height={imgHeight} width={imgWidth} />}
              containerStyle={localStyles.card}
            />
            <IconCard
              title="Clock Out"
              onPress={clockOut}
              image={<ClockOutImg height={imgHeight} width={imgWidth} />}
              containerStyle={localStyles.card}
            />
          </View>
        </Animatable.View>
        <Animatable.View
          style={localStyles.footerContainer}
          animation={'fadeInUpBig'}>
          <View style={dividedDataStyles.horizontalContainer}>
            <Text style={dividedDataStyles.text}>Hours Worked Today</Text>
            <View style={dividedDataStyles.bar} />
            <Text style={dividedDataStyles.subtext}>
              {timeInOut.isTimeOut ? timeInOut.workHrsToday : 0}
            </Text>
          </View>
          <View style={localStyles.legendsContainer}>
            <Badge
              badgeStyle={{backgroundColor: workMarker.color}}
              containerStyle={localStyles.badge}
            />
            <Text style={Styles.texts.secondary}>Work</Text>
          </View>
          <MarkedCalendar
            markedDates={calendarMarkedDates}
            markingType={'period'}
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
  headerContainer: {
    padding: Styles.whitespaces.inner,
    backgroundColor: Styles.colors.primary,
    paddingBottom: Styles.whitespaces.outer,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonsContainer: {
    ...Styles.containers.horizontal,
  },
  footerContainer: {
    paddingTop: Styles.whitespaces.outer,
    paddingBottom: Styles.whitespaces.outer,
  },
  legendsContainer: {
    paddingBottom: Styles.whitespaces.inner,
    paddingHorizontal: Styles.whitespaces.margin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
  },
  calendar: {
    paddingVertical: Styles.whitespaces.inner,
    borderRadius: 20,
  },
  badge: {
    paddingRight: Styles.whitespaces.inner / 2,
  },
});

const dividedDataStyles = StyleSheet.create({
  horizontalContainer: {
    ...Styles.containers.fill,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: Styles.whitespaces.inner / 2,
    marginBottom: Styles.whitespaces.inner,
  },
  text: {
    ...Styles.texts.default,
    color: Styles.colors.onBackground,
    textAlign: 'center',
  },
  subtext: {
    ...Styles.texts.default,
    color: Styles.colors.onBackground,
    textAlign: 'center',
  },
  bar: {
    width: 1,
    backgroundColor: Styles.colors.gray,
    marginHorizontal: Styles.whitespaces.inner,
  },
});

export default AttendanceScreen;
