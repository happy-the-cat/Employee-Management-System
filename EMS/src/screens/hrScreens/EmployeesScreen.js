import React, {useState} from 'react';
import {Alert, View, Text, StatusBar, StyleSheet, Keyboard} from 'react-native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Icon, Overlay} from 'react-native-elements';
import SectionListContacts from 'react-native-sectionlist-contacts';

import {SearchDropDown, SearchField} from '../../component/SearchField';
import {MemberListItem} from '../../component/DepartmentsLists';
import {InputField} from '../../component/InputField';
import {ButtonPrimary} from '../../component/Button';

import {Employees} from '../../../model/employees';
import * as Styles from '../../Styles';
import * as Utilities from '../../Utilities';
import {Departments} from '../../../model/departments';

const EmployeesScreen = ({navigation}) => {
  /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
  const [data, setData] = useState(
    Utilities.filterArrayWithKey(Employees, 'name'),
  );
  const [inputData, setInputData] = useState({
    isVisible: false,
    content: '', // 'addEmployee' || 'removeEmployee'
    employeeName: '',
    isValidEmployeeName: false,
  });
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

  const handleEmployeeNameInput = value => {
    if (value.trim().length >= 2) {
      setInputData({
        ...inputData,
        employeeName: value,
        isValidEmployeeName: true,
      });
    } else {
      setInputData({
        ...inputData,
        isValidEmployeeName: false,
      });
    }
  };

  const addEmployee = () => {
    if (inputData.isValidEmployeeName) {
      if (
        data.find(
          employee =>
            employee.name.trim().toLowerCase() ===
            inputData.employeeName.trim().toLowerCase(),
        ) === undefined
      ) {
        setData([
          ...data,
          {
            id: nanoid(),
            name: inputData.employeeName,
          },
        ]);
        Alert.alert('Success', 'Employee has been added successfully.');
        setInputData({isVisible: false});
      } else {
        Alert.alert('Error', 'Employee is already part of the company.');
      }
    }
  };

  const removeEmployee = () => {
    if (inputData.isValidEmployeeName) {
      const temp = data.filter(employee => {
        if (
          employee.name.trim().toLowerCase() !==
          inputData.employeeName.trim().toLowerCase()
        ) {
          return employee;
        }
      });
      if (temp.length !== data.length) {
        Alert.alert(
          'Confirm',
          'Are you sure you want to remove them from the company? This action cannot be undone.',
          [
            {
              text: 'Yes',
              onPress: () => {
                setData(temp);
              },
              style: 'destructive',
            },
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
          ],
        );
        setInputData({isVisible: false});
      } else {
        Alert.alert(
          'Error',
          'Cannot find inputted employee in the databases. Try searching for them in the search bar to check first.',
        );
      }
    }
  };

  const renderInputOverlay = () => (
    <Overlay
      isVisible={inputData.isVisible}
      onBackdropPress={() =>
        setInputData({
          isVisible: false,
        })
      }
      overlayStyle={localStyles.overlayContainer}>
      {(() => {
        if (inputData.content === 'addEmployee') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Add New Employee</Text>
              <Text style={localStyles.overlayText}>
                Enter the new employee's name to add them to the database.
              </Text>
              <InputField
                autoFocus
                autocapitalize="words"
                placeholder={'Employee Name'}
                onChangeText={value => handleEmployeeNameInput(value)}
                errorMessage={
                  !inputData.isValidEmployeeName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Add"
                onPress={addEmployee}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        } else if (inputData.content === 'removeEmployee') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Remove Employee</Text>
              <Text style={localStyles.overlayText}>
                Enter the name of the employee to be removed from the database.
              </Text>
              <InputField
                autoFocus
                autocapitalize="words"
                placeholder={'Employee Name'}
                onChangeText={value => handleEmployeeNameInput(value)}
                errorMessage={
                  !inputData.isValidEmployeeName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Remove"
                onPress={removeEmployee}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        }
      })()}
    </Overlay>
  );

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      {renderInputOverlay()}
      <View style={localStyles.horizontalContainer}>
        <SearchField
          placeholder="Search Name"
          onChangeText={value => handleSearch(value)}
          value={searchData.input}
          containerStyle={localStyles.searchBarContainer}
        />
        <Icon
          name="person-add"
          type="ionicons"
          onPress={() =>
            setInputData({
              ...inputData,
              isVisible: true,
              content: 'addEmployee',
            })
          }
          size={30}
          color="forestgreen"
          containerStyle={localStyles.iconContainer}
        />
        <Icon
          name="person-remove"
          type="ionicons"
          onPress={() =>
            setInputData({
              ...inputData,
              isVisible: true,
              content: 'removeEmployee',
            })
          }
          size={30}
          color="red"
          containerStyle={localStyles.iconContainer}
        />
      </View>
      <SectionListContacts
        sectionListData={data}
        letterViewStyle={localStyles.lettersContainer}
        letterTextStyle={{color: Styles.colors.darkGray}}
        renderItem={employee => (
          <MemberListItem
            name={employee.name}
            key={employee.id}
            id={employee.id}
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
          onPressItem={() => {
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
    paddingBottom: Styles.whitespaces.inner / 2,
  },

  horizontalContainer: {
    ...Styles.containers.horizontal,
    marginHorizontal: Styles.whitespaces.margin,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    flex: 1,
    //width: '100%',
  },
  searchDropDownContainer: {
    marginHorizontal: Styles.whitespaces.margin + 5,
  },
  iconContainer: {
    padding: Styles.whitespaces.inner,
  },

  overlayContainer: {
    borderRadius: 20,
    height: Styles.maxHeight / 2,
    width: Styles.maxWidth + Styles.whitespaces.inner,
    justifyContent: 'center',
  },
  overlayHeader: {
    fontSize: 16,
    fontFamily: 'Oxygen-Regular',
    fontWeight: 'bold',
    paddingHorizontal: Styles.whitespaces.outer,
    marginVertical: Styles.whitespaces.inner / 2,
    textAlign: 'center',
  },
  overlayText: {
    ...Styles.texts.secondary,
    paddingHorizontal: Styles.whitespaces.outer,
    textAlign: 'center',
  },
  overlayInput: {
    width: Styles.maxWidth,
    paddingHorizontal: Styles.whitespaces.outer,
  },
  overlayButton: {
    marginVertical: Styles.whitespaces.inner,
    width: Styles.maxWidth / 2,
    alignSelf: 'center',
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
    paddingRight: Styles.whitespaces.margin * 2,
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
