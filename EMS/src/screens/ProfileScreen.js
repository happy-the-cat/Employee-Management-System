import 'react-native-gesture-handler';
import React, {useRef, useCallback, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Divider} from 'react-native-elements';
import {ReanimatedArcBase} from '@callstack/reanimated-arc';
import Reanimated, {Easing} from 'react-native-reanimated';

import {FocusAwareStatusBar} from '../component/FocusAwareStatusBar';

import * as Styles from '../Styles';

const Education = education => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
      }}>
      <View
        style={{
          width: 4,
          height: '100%',
          backgroundColor: 'green',
          marginRight: 8,
        }}
      />
      <Text style={styles.body}>
        <Text style={{fontWeight: 'bold'}}>
          {education.school}
          {'\n'}
        </Text>
        <Text>
          {education.degree}
          {'\n'}
        </Text>
        {education.startYear === education.endYear ? (
          <Text>{education.startYear}</Text>
        ) : education.endYear !== undefined ? (
          <Text>
            {education.startYear}–{education.endYear}
          </Text>
        ) : (
          <Text>{education.startYear}–Present</Text>
        )}
      </Text>
    </View>
  );
};

const WorkExperience = workExperience => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
      }}>
      <View
        style={{
          width: 4,
          height: '100%',
          backgroundColor: 'green',
          marginRight: 8,
        }}
      />
      <Text style={styles.body}>
        <Text style={{fontWeight: 'bold'}}>
          {workExperience.title}
          {'\n'}
        </Text>
        <Text>
          {workExperience.company}
          {'\n'}
        </Text>
        {workExperience.startYear === workExperience.endYear ? (
          <Text>{workExperience.startYear}</Text>
        ) : workExperience.endYear !== undefined ? (
          <Text>
            {workExperience.startYear}–{workExperience.endYear}
          </Text>
        ) : (
          <Text>{workExperience.startYear}–Present</Text>
        )}
      </Text>
    </View>
  );
};

const Progress = skill => {
  const [arcText, setArcText] = useState('0%');
  const arcAngle = useRef(new Reanimated.Value(Math.random() * 240));
  const randomizeProgress = useCallback(() => {
    Reanimated.timing(arcAngle.current, {
      toValue: Math.random() * 240,
      easing: Easing.inOut(Easing.quad),
      duration: 1000,
    }).start();
  }, []);

  return (
    <View style={{alignItems: 'center', marginHorizontal: 8}}>
      <View style={[styles.arcContainer]}>
        <Reanimated.Code
          exec={Reanimated.call([arcAngle.current], ([value]) => {
            setArcText(`${Math.round((value / 240) * 100)}%`);
          })}
        />
        <ReanimatedArcBase
          color="lightgrey"
          diameter={64}
          width={12}
          arcSweepAngle={240}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <ReanimatedArcBase
          color="green"
          diameter={64}
          width={12}
          arcSweepAngle={arcAngle.current}
          lineCap="round"
          rotation={240}
          style={styles.absolute}
        />
        <Text style={[styles.body, {fontSize: 13}]}>{arcText}</Text>
      </View>
      {/*<Button title="Randomize progress" onPress={randomizeProgress} />*/}
      <Text style={[styles.body, {alignContent: 'center'}]}>{skill.title}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: Styles.colors.light}}>
      <FocusAwareStatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: Styles.whitespaces.margin}}
        showsVerticalScrollIndicator={false}
        style={styles.baseContainer}>
        <View>
          <View style={{alignItems: 'center', marginVertical: 8}}>
            <Avatar
              rounded
              overlayContainerStyle={{backgroundColor: 'green'}}
              size={'large'}
              title={'MS'}
            />
          </View>
          <View style={{alignItems: 'center', marginVertical: 8}}>
            <Text style={styles.largeTitle}>Mia Smith</Text>
            <Text style={[styles.body]}>Executive Manager</Text>
            <Text style={[styles.body]}>Information Technology Department</Text>
          </View>
        </View>
        <Divider style={{marginVertical: 8, backgroundColor: 'dimgray'}} />
        <View style={{marginVertical: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name={'color-palette-outline'}
              size={24}
              color={'indigo'}
              style={{marginRight: 8}}
            />
            <Text style={styles.title3}>Skills</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 8,
            height: 70,
          }}>
          <Progress title={'Java'} style={{marginRight: 8}} />
          <Progress title={'C++'} style={{marginRight: 8}} />
          <Progress title={'Python'} />
        </View>
        <View style={{marginVertical: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name={'school-outline'}
              size={24}
              color={'indigo'}
              style={{marginRight: 8}}
            />
            <Text style={styles.title3}>Education</Text>
          </View>
        </View>
        <Education
          school={'De La Salle University'}
          degree={'Bachelor of Science in Computer Engineering'}
          startYear={2019}
          endYear={2023}
        />
        <Education
          school={'Mapúa University'}
          degree={'Science, Technology, Engineering and Mathematics Strand'}
          startYear={2017}
          endYear={2019}
        />
        <View style={{marginVertical: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name={'briefcase-outline'}
              size={24}
              color={'indigo'}
              style={{marginRight: 8}}
            />
            <Text style={styles.title3}>Work Experience</Text>
          </View>
        </View>
        <WorkExperience
          title={'Full-Stack Web Developer'}
          company={'Sony Interactive Entertainment'}
          startYear={2023}
          endYear={2025}
        />
        <WorkExperience
          title={'Software Engineering Intern'}
          company={'Microsoft'}
          startYear={2023}
          endYear={2023}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    marginHorizontal: Styles.whitespaces.inner,
  },
  largeTitle: {
    // fontFamily: 'Helvetica',
    // fontSize: 34,
    // fontWeight: 'bold',
    ...Styles.texts.title,
  },
  title3: {
    // fontFamily: 'Helvetica',
    // fontSize: 20,
    // fontWeight: 'bold',
    ...Styles.texts.secondaryCaps,
  },
  body: {
    // fontFamily: 'Helvetica',
    // fontSize: 17,
    ...Styles.texts.default,
  },
  arcContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
  },
  absolute: {
    position: 'absolute',
  },
});

export default ProfileScreen;
