import React, {useState} from 'react';
import {Alert, View, Text, StatusBar, StyleSheet, Keyboard} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider} from 'react-native-elements';
import SectionListContacts from 'react-native-sectionlist-contacts';

import {SearchDropDown, SearchField} from '../../component/SearchField';
import {MemberListItem} from '../../component/DepartmentsLists';

import {Employees} from '../../../model/employees';
import * as Styles from '../../Styles';
import * as Utilities from '../../Utilities';

const EmployeesScreen = ({navigation}) => {
  /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
  const data = Utilities.filterArrayWithKey(Employees, 'name');
  const [searchData, setSearchData] = useState({
    input: '',
    isSearching: false,
    searchList: [],
  });

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

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <SearchField
        placeholder="Search Name"
        onChangeText={value => handleSearch(value)}
        value={searchData.input}
        containerStyle={{marginHorizontal: Styles.whitespaces.outer}}
      />
      <SectionListContacts
        sectionListData={data}
        letterViewStyle={localStyles.lettersContainer}
        letterTextStyle={{color: Styles.colors.darkGray}}
        renderItem={employee => (
          <MemberListItem
            name={employee.name}
            key={employee.id}
            id={employee.id}
            onPress={id => console.log('pressed ' + id)}
            containerStyle={localStyles.itemListContainer}
            hideChevron
          />
        )}
        renderHeader={params => {
          return (
            <View style={localStyles.sectionHeaderContainer}>
              <Text style={localStyles.sectionHeaderText}>{params.key}</Text>
              <Divider style={localStyles.sectionDivider} />
            </View>
          );
        }}
      />
      {searchData.isSearching && (
        <SearchDropDown
          onPressItem={id => {
            /* TODO: Add function to the clicked employee's profile */
            console.log('pressed' + id);
            setSearchData({input: '', isSearching: false, searchList: []});
            Keyboard.dismiss();
          }}
          content={searchData.searchList}
          noResultPrompt="No employee with similar name found."
          containerStyle={localStyles.searchDropDownContainer}
        />
      )}
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  baseContainer: {
    ...Styles.containers.fill,
    backgroundColor: Styles.colors.light,
    paddingHorizontal: Styles.whitespaces.inner / 2,
  },
  searchDropDownContainer: {
    marginHorizontal: Styles.whitespaces.margin + 3,
  },
  lettersContainer: {
    marginRight: Styles.whitespaces.inner / 2,
    width: 25,
    backgroundColor:
      'rgba(' + Utilities.hexToRgb(Styles.colors.light) + ',0.75)',
    borderRadius: 10,
  },
  itemListContainer: {
    paddingHorizontal: Styles.whitespaces.margin,
    paddingVertical: Styles.whitespaces.inner / 2,
  },
  sectionHeaderContainer: {
    paddingHorizontal: Styles.whitespaces.inner,
    paddingTop: Styles.whitespaces.inner / 2,
  },
  sectionHeaderText: {
    ...Styles.texts.secondaryCaps,
    color: Styles.colors.darkGray,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Styles.colors.lightGray,
  },
});

export default EmployeesScreen;
