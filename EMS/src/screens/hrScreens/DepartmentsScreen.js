import React, {useState} from 'react';
import {Text, StyleSheet, StatusBar, ScrollView, Alert} from 'react-native';

import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListItem, Overlay} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/Octicons';

import {RoundAvatar} from '../../component/Avatar';
import {Accordion} from '../../component/Accordion';
import {SearchDropDown, SearchField} from '../../component/SearchField';
import {ButtonPrimary} from '../../component/Button';
import {InputField} from '../../component/InputField';

import * as Styles from '../../Styles';

const Stack = createStackNavigator();

const Member = ({type, name, onPress, hideChevron, chevronProps}) => (
  <ListItem onPress={onPress /*TODO: add some action for clicking a member*/}>
    <RoundAvatar
      size="small"
      /*TODO: Add source for picture*/
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
    {!hideChevron ? <ListItem.Chevron {...chevronProps} /> : null}
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
  const [data, setData] = useState([
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
  ]);
  const actions = [
    {
      text: 'Add Department',
      icon: <Icon name="plus" size={16} color={Styles.colors.onPrimary} />,
      name: 'addDepartment',
      color: 'limegreen',
      position: 1,
    },
    {
      text: 'Remove Department',
      icon: <Icon name="x" size={16} color={Styles.colors.onPrimary} />,
      name: 'removeDepartment',
      color: Styles.colors.error,
      position: 2,
    },
    {
      text: 'Update Department',
      icon: <Icon name="sync" size={16} color={Styles.colors.onPrimary} />,
      name: 'updateDepartment',
      color: 'slateblue',
      position: 3,
    },
  ];
  const [overlayData, setOverlayData] = useState({
    isVisible: false,
    content: '',
    departmentName: '',
    isValidDepartmentName: false,
    departmentHead: '',
    isValidDepartmentHead: false,
  });
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

  const handleDepartmentNameChange = value => {
    if (value.trim().length >= 2) {
      setOverlayData({
        ...overlayData,
        departmentName: value,
        isValidDepartmentName: true,
      });
    } else {
      setOverlayData({
        ...overlayData,
        isValidDepartmentName: false,
      });
    }
  };

  const handleDepartmentHeadChange = value => {
    /*TODO: check if head's name exists (if they are an employee of the company)*/
    if (value.trim().length >= 2) {
      setOverlayData({
        ...overlayData,
        departmentHead: value,
        isValidDepartmentHead: true,
      });
    } else {
      setOverlayData({
        ...overlayData,
        isValidDepartmentHead: false,
      });
    }
  };

  const renderFABOverlay = () => (
    <Overlay
      isVisible={overlayData.isVisible}
      onBackdropPress={() =>
        setOverlayData({
          isVisible: false,
        })
      }
      overlayStyle={localStyles.overlayContainer}>
      {(() => {
        if (overlayData.content === 'addDepartment') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Add Department</Text>
              <Text style={localStyles.overlayText}>
                Enter the name of the department and its head to add it to the
                database.
              </Text>
              <InputField
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameChange(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <InputField /*TODO: search bar drop down list*/
                placeholder={'Department Head'}
                onChangeText={value => handleDepartmentHeadChange(value)}
                errorMessage={
                  !overlayData.isValidDepartmentHead
                    ? 'Inputted name is not part of the company.'
                    : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Add"
                onPress={() => addDepartment()}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        } else if (overlayData.content === 'removeDepartment') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Remove Department</Text>
              <Text style={localStyles.overlayText}>
                Enter the name of the department to remove from the database.
              </Text>
              <InputField
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameChange(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Remove"
                onPress={() => removeDepartment()}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        } else if (overlayData.content === 'updateDepartment') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Update Department</Text>
              <Text style={localStyles.overlayText}>
                Enter the name of the department to update it.
              </Text>
              <InputField
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameChange(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Update"
                onPress={() => null}
                //onPress={() => updateDepartment()}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        }
      })()}
    </Overlay>
  );

  const addDepartment = () => {
    if (
      overlayData.isValidDepartmentName &&
      overlayData.isValidDepartmentHead
    ) {
      if (
        data.find(
          department =>
            department.name.toLowerCase() ===
            overlayData.departmentName.toLowerCase(),
        ) === undefined
      ) {
        setData([
          ...data,
          {
            id: nanoid(),
            name: overlayData.departmentName,
            head: overlayData.departmentHead,
            members: [],
          },
        ]);
        setOverlayData({isVisible: false});
      } else {
        Alert.alert('Error', 'Inputted department already exists.');
      }
    }
  };

  const removeDepartment = () => {
    if (overlayData.isValidDepartmentName) {
      let temp = data.filter(department => {
        if (
          !department.name.toLowerCase() ===
          overlayData.departmentName.toLowerCase()
        ) {
          return department;
        }
      });
      if (temp.length !== data.length) {
        setData(temp);
        Alert.alert(
          'Removal Success',
          overlayData.departmentName + 'has been successfully removed.',
        );
        setOverlayData({isVisible: false});
      } else {
        Alert.alert('Error', 'Inputted department does not exists.');
      }
    }
  };

  const updateDepartment = () => {
    if (overlayData.isValidDepartmentName) {
      let temp = data.find(
        department =>
          department.name.toLowerCase() ===
          overlayData.departmentName.toLowerCase(),
      );
      if (temp !== undefined) {
        setOverlayData({isVisible: false});
        navigation.navigate('Update Department', {department: temp});
      } else {
        Alert.alert('Error', 'Inputted department does not exists.');
      }
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
      {renderFABOverlay()}
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          setOverlayData({...overlayData, isVisible: true, content: name});
        }}
        floatingIcon={
          <Icon name="pencil" size={24} color={Styles.colors.onPrimary} />
        }
        color={Styles.colors.primary}
        dismissKeyboardOnPress={true}
      />
    </SafeAreaView>
  );
};

const UpdateModalScreen = ({navigation, route}) => {
  const {department} = route.params;
  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <ScrollView styles={localStyles.mainContainer}>
        {department.members.map(member => (
          <Member
            key={member.id}
            department={member.name}
            chevronProps={{name: 'x', type: 'octicon', size: 30}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const DepartmentsStack = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Main"
      component={DepartmentsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Update Department"
      component={UpdateModalScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

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
  fabText: {
    ...Styles.texts.tertiary,
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
});

export default DepartmentsStack;