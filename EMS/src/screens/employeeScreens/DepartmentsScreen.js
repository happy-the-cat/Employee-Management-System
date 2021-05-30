import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Alert,
  Keyboard,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem} from 'react-native-elements';

import {DepartmentAccordionItem} from '../../component/DepartmentsLists';
import {SearchField, SearchDropDown} from '../../component/SearchField';

import {Departments} from '../../../model/departments';
import * as Styles from '../../Styles';
import * as Utilities from '../../Utilities';

const DepartmentsScreen = ({navigation}) => {
  const data = Utilities.filterArrayWithKey(
    /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
    Departments,
    'name',
  );
  const [dataCords, setDataCords] = useState([]);
  const [searchData, setSearchData] = useState({
    input: '',
    isSearching: false,
    searchList: [],
  });
  const [scrollRef, setScrollRefs] = useState(null);

  const handleSearch = input => {
    // based on https://swairaq.medium.com/react-native-dropdown-searchbar-adc4532f7535
    if (input) {
      const temp = input.trim().toLowerCase();
      const filteredData =
        searchData.searchList === undefined ||
        searchData.searchList.length === 0
          ? data.filter(item => {
              if (item.name.trim().toLowerCase().match(temp)) {
                return item;
              }
            })
          : searchData.searchList.filter(item => {
              if (item.name.trim().toLowerCase().match(temp)) {
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
      scrollRef.scrollRef.scrollTo({
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
        ref={scroll => setScrollRefs({...scrollRef, scrollRef: scroll})}>
        <SearchField
          placeholder="Search Department"
          onChangeText={value => handleSearch(value)}
          value={searchData.input}
        />
        {data !== undefined
          ? data.map(department => (
              <DepartmentAccordionItem
                key={department.id}
                department={department}
                onPressItem={id => {
                  /*TODO: add some action for clicking a member*/
                  console.log('pressed' + id);
                }}
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  dataCords[department.id] = layout.y;
                  setDataCords(dataCords);
                }}
              />
            ))
          : null}
        {searchData.isSearching && (
          <SearchDropDown
            onPressItem={scrollToIndex => {
              handleScrollTo(scrollToIndex);
              setSearchData({input: '', isSearching: false, searchList: []});
              Keyboard.dismiss();
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
