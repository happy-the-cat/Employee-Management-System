import React, {useState} from 'react';
import {StyleSheet, Text, StatusBar, ScrollView} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'react-native-elements';

import {RoundAvatar} from '../../component/Avatar';
import {Accordion} from '../../component/Accordion';
import {SearchField} from '../../component/SearchField';

import * as Styles from '../../Styles';

const DepartmentsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const departments = [
    {
      title: 'Marketing',
      head: 'Macey Osaka',
      members: ['Amy Farha', 'Chris Jackson', 'Mia Smith'],
    },
    {
      title: 'Information Technology',
      head: 'Atsuma Yami',
      members: ['Armanda Martin', 'Christy Thomas', 'Melissa Jones'],
    },
    {
      title: 'Human Resources',
      head: 'Will Taylor',
      members: ['Jessica Ang', 'Kris Grey', 'Trish Kia'],
    },
  ];

  /* TODO:
      - add department
      - edit dept name
      - remove a dept
      - add employee to a department
      - remove employee from a department
   * */

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <ScrollView style={localStyles.mainContainer}>
        <SearchField
          placeholder="Search"
          onChangeText={value => setSearchText(value)}
          value={searchText}
        />
        {departments.map((department, index) => (
          <Accordion
            topDivider
            key={index}
            keyId={index}
            titleContent={
              <>
                <ListItem.Content>
                  <ListItem.Title>{department.title}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            items={
              <>
                <ListItem
                  onPress={
                    null /*TODO: add some action for clicking a member*/
                  }>
                  <RoundAvatar
                    size="small"
                    /*TODO: Add source (picture)*/
                  />
                  <ListItem.Content>
                    <ListItem.Title>{department.head}</ListItem.Title>
                    <ListItem.Subtitle>Department Head</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
                {department.members.map((member, index) => (
                  <ListItem
                    key={index}
                    onPress={
                      null /*TODO: add some action for clicking a member*/
                    }>
                    <RoundAvatar
                      size="small"
                      /*TODO: Add source (picture)*/
                    />
                    <ListItem.Content>
                      <ListItem.Title>{member}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))}
              </>
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    backgroundColor: Styles.colors.light,
  },
  mainContainer: {
    ...Styles.containers.fill,
    paddingHorizontal: Styles.whitespaces.margin,
    paddingBottom: Styles.whitespaces.margin * 2,
  },
});

export default DepartmentsScreen;
