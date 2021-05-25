import React, {useState} from 'react';
import {StyleSheet, Text, StatusBar, ScrollView, Alert} from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'react-native-elements';

import {RoundAvatar} from '../../component/Avatar';
import {Accordion} from '../../component/Accordion';
import {SearchField, SearchDropDown} from '../../component/SearchField';

import * as Styles from '../../Styles';

const Member = ({type, name, onPress}) => (
  <ListItem onPress={onPress /*TODO: add some action for clicking a member*/}>
    <RoundAvatar
      size="small"
      /*TODO: Add source (picture)*/
    />
    <ListItem.Content>
      {type === 'head' ? (
        <>
          <ListItem.Title>{name}</ListItem.Title>
          <ListItem.Subtitle>Department Head</ListItem.Subtitle>
        </>
      ) : (
        <ListItem.Title>{name}</ListItem.Title>
      )}
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
);

const Department = ({department, onLayout}) => (
  <Accordion
    topDivider
    onLayout={onLayout}
    titleContent={
      <ListItem.Content>
        <ListItem.Title>{department.name}</ListItem.Title>
      </ListItem.Content>
    }
    items={
      <>
        {department.head.length > 0 ? (
          <Member
            type="head"
            name={department.head}
            onPress={null /*TODO: add some action for clicking dept. head*/}
          />
        ) : null}
        {department.members.map(member => (
          <Member
            key={member.id}
            name={member.name}
            onPress={null /*TODO: add some action for clicking a member*/}
          />
        ))}
      </>
    }
  />
);

const DepartmentsScreen = ({navigation}) => {
  const data = [
    /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
    {
      id: nanoid(),
      name: 'Marketing',
      head: 'Macey Osaka',
      members: [
        {id: nanoid(), name: 'Amy Farha'},
        {id: nanoid(), name: 'Chris Jackson'},
        {id: nanoid(), name: 'Mia Smith'},
      ],
    },
    {
      id: nanoid(),
      name: 'Information Technology',
      head: 'Atsuma Yami',
      members: [
        {id: nanoid(), name: 'Armanda Martin'},
        {id: nanoid(), name: 'Christy Thomas'},
        {id: nanoid(), name: 'Melissa Jones'},
      ],
    },
    {
      id: nanoid(),
      name: 'Human Resources',
      head: 'Will Taylor',
      members: [
        {id: nanoid(), name: 'Jessica Ang'},
        {id: nanoid(), name: 'Kris Grey'},
        {id: nanoid(), name: 'Trish Kia'},
      ],
    },
    {
      id: nanoid(),
      name: 'A',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'Aa',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'bbabb',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'zzazzz',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'lllall',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'kkkkkk',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'rrrrrr',
      head: 'Will Taylor',
      members: [],
    },
    {
      id: nanoid(),
      name: 'acccccc',
      head: 'Will Taylor',
      members: [],
    },
  ];
  const [dataCords, setDataCords] = useState([]);
  const [searchData, setSearchData] = useState({
    input: '',
    isSearching: false,
    searchList: [],
  });
  const [refs, setRefs] = useState({
    searchRef: React.createRef(),
    scrollRef: null,
  });

  const handleSearch = input => {
    // based on https://swairaq.medium.com/react-native-dropdown-searchbar-adc4532f7535
    if (input) {
      const temp = input.toLowerCase();
      const filteredData =
        searchData.searchList === undefined ||
        searchData.searchList.length === 0
          ? data.filter(item => {
              if (item.name.toLowerCase().match(temp)) {
                return item;
              }
            })
          : searchData.searchList.filter(item => {
              if (item.name.toLowerCase().match(temp)) {
                return item;
              }
            });
      setSearchData({
        input: input,
        isSearching: true,
        searchList: filteredData,
      });
    } else {
      setSearchData({
        input: input,
        isSearching: false,
      });
    }
  };

  const handleScrollTo = scrollToIndex => {
    if (scrollToIndex in dataCords) {
      let temp = dataCords[scrollToIndex];
      const offset = 80;
      console.log(temp, Styles.maxHeight);
      if (temp > offset) {
        if (temp - offset < Styles.maxHeight) {
          temp = temp - offset;
        } else {
          temp = temp - Styles.maxHeight / 2;
        }
      }
      refs.scrollRef.scrollTo({
        x: 0,
        y: temp,
        animated: true,
      });
    } else {
      Alert.alert('Out of Max Index');
    }
  };

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <ScrollView
        style={localStyles.mainContainer}
        ref={scroll => setRefs({...refs, scrollRef: scroll})}>
        <SearchField
          placeholder="Search Department"
          onChangeText={value => handleSearch(value)}
          value={searchData.input}
          ref={refs.searchRef}
        />
        {data.map(department => (
          <Department
            key={department.id}
            department={department}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              dataCords[department.id] = layout.y;
              setDataCords(dataCords);
            }}
          />
        ))}
        {searchData.isSearching && (
          <SearchDropDown
            onPressItem={scrollToIndex => {
              handleScrollTo(scrollToIndex);
              setSearchData({isSearching: false});
            }}
            content={searchData.searchList}
            noResultPrompt="No department with similar name found."
          />
        )}
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
