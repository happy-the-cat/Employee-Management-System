import React, {useState} from 'react';
import {
  Button,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  BackHandler,
  Keyboard,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Overlay, Divider, ListItem, Icon} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';

import {
  DepartmentAccordionItem,
  MemberListItem,
} from '../../component/DepartmentsLists';
import {SearchDropDown, SearchField} from '../../component/SearchField';
import {ButtonPrimary, ButtonTextOnly} from '../../component/Button';
import {InputField} from '../../component/InputField';

import {Departments} from '../../../model/departments';
import * as Styles from '../../Styles';

const Stack = createStackNavigator();

const DepartmentsScreen = ({navigation, route}) => {
  const [data, setData] = useState(
    /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
    Departments,
  );
  const actions = [
    {
      text: 'Add Department',
      icon: (
        <Icon
          name="plus"
          type="octicon"
          size={16}
          color={Styles.colors.onPrimary}
        />
      ),
      name: 'addDepartment',
      color: 'forestgreen',
      position: 1,
    },
    {
      text: 'Remove Department',
      icon: (
        <Icon
          name="x"
          type="octicon"
          size={16}
          color={Styles.colors.onPrimary}
        />
      ),
      name: 'removeDepartment',
      color: Styles.colors.error,
      position: 2,
    },
    {
      text: 'Rename Department',
      icon: (
        <Icon
          name="text-size"
          type="octicon"
          size={16}
          color={Styles.colors.onPrimary}
          style={Styles.containers.flip}
        />
      ),
      name: 'renameDepartment',
      color: 'mediumorchid',
      position: 3,
    },
    {
      text: 'Update Department',
      icon: (
        <Icon
          name="sync"
          type="octicon"
          size={16}
          color={Styles.colors.onPrimary}
        />
      ),
      name: 'updateDepartment',
      color: 'slateblue',
      position: 4,
    },
  ];
  const [overlayData, setOverlayData] = useState({
    isVisible: false,
    content: '',
    departmentName: '',
    isValidDepartmentName: false,
    departmentHead: '',
    isValidDepartmentHead: false,
    newDepartmentName: '',
    isValidNewDepartmentName: false,
  });
  const [dataCords, setDataCords] = useState([]);
  const [searchData, setSearchData] = useState({
    input: '',
    isSearching: false,
    searchList: [],
  });
  const [scrollRef, setScrollRef] = useState(null);

  // React.useEffect(() => {
  //   if (route.params?.department) {
  //     setData(prevState => {
  //       const temp = prevState.filter(department => {
  //         if (department.id === route.params.department.id) {
  //           return route.params.department;
  //         } else {
  //           return department;
  //         }
  //       });
  //       console.log(temp.length);
  //       return {temp};
  //     });
  //   }
  // }, [route.params?.department]);

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
    // based on https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
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
      scrollRef.scrollTo({
        x: 0,
        y: temp,
        animated: true,
      });
    } else {
      Alert.alert('Out of Max Index');
    }
  };

  const handleDepartmentNameInput = value => {
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

  const handleDepartmentHeadInput = value => {
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

  const handleNewDepartmentNameInput = value => {
    if (value.trim().length >= 2) {
      setOverlayData({
        ...overlayData,
        newDepartmentName: value,
        isValidNewDepartmentName: true,
      });
    } else {
      setOverlayData({
        ...overlayData,
        isValidNewDepartmentName: false,
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
                autoFocus
                autocapitalize="words"
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameInput(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <InputField
                autocapitalize="words"
                placeholder={'Department Head'}
                onChangeText={value => handleDepartmentHeadInput(value)}
                errorMessage={
                  !overlayData.isValidDepartmentHead
                    ? 'Inputted name is not part of the company.'
                    : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Add"
                onPress={addDepartment}
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
                autoFocus
                autocapitalize="words"
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameInput(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Remove"
                onPress={removeDepartment}
                containerStyle={localStyles.overlayButton}
              />
            </>
          );
        } else if (overlayData.content === 'renameDepartment') {
          return (
            <>
              <Text style={localStyles.overlayHeader}>Rename Department</Text>
              <Text style={localStyles.overlayText}>
                Enter the name of the department to be renamed and its new name.
              </Text>
              <InputField
                autoFocus
                autocapitalize="words"
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameInput(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <InputField
                autocapitalize="words"
                placeholder={'New Department Name'}
                onChangeText={value => handleNewDepartmentNameInput(value)}
                errorMessage={
                  !overlayData.isValidNewDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Rename"
                onPress={renameDepartment}
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
                autoFocus
                autocapitalize="words"
                placeholder={'Department Name'}
                onChangeText={value => handleDepartmentNameInput(value)}
                errorMessage={
                  !overlayData.isValidDepartmentName ? 'Invalid Input' : ''
                }
                containerStyle={localStyles.overlayInput}
              />
              <ButtonPrimary
                title="Update"
                onPress={() => updateDepartment()}
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
            department.name.trim().toLowerCase() ===
            overlayData.departmentName.trim().toLowerCase(),
        ) === undefined
      ) {
        setData([
          ...data,
          {
            id: nanoid(),
            name: overlayData.departmentName,
            head: {id: nanoid(), name: overlayData.departmentHead},
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
      const temp = data.filter(department => {
        if (
          department.name.trim().toLowerCase() !==
          overlayData.departmentName.trim().toLowerCase()
        ) {
          return department;
        }
      });
      if (temp.length !== data.length) {
        setData(temp);
        Alert.alert(
          'Removal Success',
          overlayData.departmentName + ' has been successfully removed.',
        );
        setOverlayData({isVisible: false});
      } else {
        Alert.alert('Error', 'Inputted department does not exists.');
      }
    }
  };

  const renameDepartment = () => {
    let changed = false;
    if (
      overlayData.isValidDepartmentName &&
      overlayData.isValidNewDepartmentName
    ) {
      const temp = data.filter(department => {
        if (
          department.name.trim().toLowerCase() ===
          overlayData.departmentName.trim().toLowerCase()
        ) {
          department.name = overlayData.newDepartmentName;
          changed = true;
          return department;
        } else {
          return department;
        }
      });
      if (changed) {
        setData(temp);
        Alert.alert(
          'Rename Success',
          overlayData.departmentName +
            ' has been successfully renamed to ' +
            overlayData.newDepartmentName +
            '.',
        );
        setOverlayData({isVisible: false});
      } else {
        Alert.alert('Error', 'Inputted department does not exists.');
      }
    }
  };

  const updateDepartment = () => {
    if (overlayData.isValidDepartmentName) {
      const temp = data.find(
        department =>
          department.name.trim().toLowerCase() ===
          overlayData.departmentName.trim().toLowerCase(),
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
        ref={scroll => setScrollRef(scroll)}
        keyboardShouldPersistTaps="handled"
        style={localStyles.mainContainer}>
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
      {renderFABOverlay()}
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          setOverlayData({...overlayData, isVisible: true, content: name});
        }}
        floatingIcon={
          <Icon
            name="pencil"
            type="octicon"
            size={24}
            color={Styles.colors.onPrimary}
          />
        }
        color={Styles.colors.primary}
        dismissKeyboardOnPress={true}
        listenKeyboard={false}
      />
    </SafeAreaView>
  );
};

const UpdateModalScreen = ({navigation, route}) => {
  const [department, setDepartment] = useState(route.params.department);
  const [modalData, setModalData] = useState({
    memberName: '',
    headName: '',
    isHeadEditable: false,
    hasUnsavedChanges: false,
  });
  let inputMemberRef;
  let inputHeadRef;

  const hasUnsavedChanges = Boolean(modalData.hasUnsavedChanges);

  // Attemp1: Using BackHandler, alert user of unsaved changes using custom back button
  // useFocusEffect(
  //   React.useCallback(() => {
  //     let onBackPress = false;
  //     if (hasUnsavedChanges) {
  //       Alert.alert(
  //         'Discard changes?',
  //         'You have unsaved changes. Are you sure to discard them and go back to previous screen?',
  //         [
  //           {
  //             text: "Don't leave",
  //             style: 'cancel',
  //             onPress: () => (onBackPress = !onBackPress),
  //           },
  //           {
  //             text: 'Discard',
  //             style: 'destructive',
  //             onPress: null,
  //           },
  //         ],
  //       );
  //     }
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [hasUnsavedChanges]),
  // );

  // Attemp2: On going back (popping a screen of nav), alert user of unsaved changes
  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       if (!hasUnsavedChanges) {
  //         return;
  //       }
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //       Alert.alert(
  //         'Discard changes?',
  //         'You have unsaved changes. Are you sure to discard them and go back to previous screen?',
  //         [
  //           {text: "Don't leave", style: 'cancel', onPress: () => {}},
  //           {
  //             text: 'Discard',
  //             style: 'destructive',
  //             onPress: () => navigation.dispatch(e.data.action),
  //           },
  //         ],
  //       );
  //     }),
  //   [navigation, hasUnsavedChanges],
  // );

  const getDepartment = department;

  // Save button on right for passing param
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <ButtonTextOnly
  //         onPress={() => {
  //           navigation.navigate({
  //             name: 'Departments',
  //             params: {department: getDepartment},
  //             merge: true,
  //           });
  //         }}
  //         title="Save"
  //         titleStyle={{paddingHorizontal: Styles.whitespaces.inner}}
  //         textColor={Styles.colors.primaryLight}
  //       />
  //     ),
  //   });
  // }, [getDepartment, navigation]);

  const onChangeHead = () => {
    if (
      modalData.headName !== undefined &&
      modalData.headName.trim().length >= 2
    ) {
      const temp = department.members.filter(member => {
        if (
          member.name.trim().toLowerCase() !==
          modalData.headName.trim().toLowerCase()
        ) {
          return member;
        }
      });
      if (temp.length !== department.members.length) {
        temp.push({id: department.head.id, name: department.head.name});
        setDepartment({
          ...department,
          head: {id: nanoid(), name: modalData.headName},
          members: temp,
        });
        setModalData({
          ...modalData,
          isHeadEditable: false,
          headName: '',
          hasUnsavedChanges: true,
        });
        inputHeadRef.clear();
      } else {
        Alert.alert(
          'Error',
          'Inputted employee must be a member of this department.',
        );
        inputHeadRef.clear();
        setModalData({...modalData, headName: ''});
      }
    } else {
      Alert.alert('Invalid Input', 'Input must not be empty.');
    }
  };

  const onAddMember = () => {
    if (
      modalData.memberName !== undefined &&
      modalData.memberName.length >= 2
    ) {
      if (
        department.members.find(
          member =>
            member.name.trim().toLowerCase() ===
            modalData.memberName.trim().toLowerCase(),
        ) === undefined
      ) {
        setDepartment({
          ...department,
          members: [
            ...department.members,
            {
              id: nanoid(),
              name: modalData.memberName,
            },
          ],
        });
        setModalData({...modalData, memberName: '', hasUnsavedChanges: true});
        inputMemberRef.clear();
      } else {
        Alert.alert(
          'Error',
          'Inputted member is already part of the department.',
        );
      }
    } else {
      Alert.alert('Invalid Input', 'Input must not be empty.');
    }
  };

  const onRemoveMember = id => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove them from the department?',
      [
        {
          text: 'Yes',
          onPress: () => {
            const temp = department.members.filter(member => {
              if (member.id !== id) {
                return member;
              }
            });
            setDepartment({...department, members: temp});
            setModalData({...modalData, hasUnsavedChanges: true});
          },
          style: 'default',
        },
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={localStyles.baseContainer}>
      <StatusBar
        backgroundColor={Styles.colors.light}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={localStyles.modalContainer}>
        <Text style={localStyles.modalHeader}>{department.name}</Text>
        <Divider style={localStyles.divider} />
        <InputField
          ref={input => {
            inputMemberRef = input;
          }}
          autocapitalize="words"
          placeholder="Enter employee name to add."
          inputContainerStyle={localStyles.modalInputContainer}
          onChangeText={value =>
            setModalData({...modalData, memberName: value})
          }
          rightIcon={
            <Icon
              name="plus"
              type="octicon"
              size={24}
              color="forestgreen"
              onPress={onAddMember}
            />
          }
        />
        <MemberListItem
          type="head"
          name={department.head.name}
          containerStyle={localStyles.modalListContainer}
          chevronProps={
            modalData.isHeadEditable
              ? {
                  name: 'dash',
                  type: 'octicon',
                  size: 24,
                  color: Styles.colors.error,
                  onPress: () =>
                    setModalData({
                      ...modalData,
                      isHeadEditable: false,
                      headName: '',
                    }),
                }
              : {
                  name: 'pencil',
                  type: 'octicon',
                  size: 24,
                  color: Styles.colors.primaryLight,
                  onPress: () =>
                    setModalData({...modalData, isHeadEditable: true}),
                }
          }
        />
        {modalData.isHeadEditable && (
          <InputField
            ref={input => {
              inputHeadRef = input;
            }}
            autoFocus
            autocapitalize="words"
            placeholder="Enter department head's name."
            inputContainerStyle={localStyles.modalInputContainer}
            onChangeText={value =>
              setModalData({...modalData, headName: value})
            }
            rightIcon={
              <Icon
                name="check"
                type="octicon"
                size={24}
                color="forestgreen"
                onPress={onChangeHead}
              />
            }
          />
        )}
        {department.members.map(member => (
          <MemberListItem
            key={member.id}
            name={member.name}
            containerStyle={localStyles.modalListContainer}
            chevronProps={{
              name: 'x',
              type: 'octicon',
              size: 24,
              color: Styles.colors.error,
              onPress: () => onRemoveMember(member.id),
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

UpdateModalScreen.navigationOptions = navigationData => {
  const handler = navigationData.navigation.route.params('handler');
  return {
    headerLeft: <HeaderBackButton onPress={handler} />,
  };
};

const DepartmentsStack = () => (
  <Stack.Navigator mode="modal" headerMode="screen">
    <Stack.Screen
      name="Departments"
      component={DepartmentsScreen}
      options={({navigation}) => ({
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        ),
      })}
    />
    <Stack.Screen name="Update Department" component={UpdateModalScreen} />
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
  modalContainer: {
    paddingHorizontal: Styles.whitespaces.margin,
    paddingBottom: Styles.whitespaces.margin,
  },
  horizontalContainer: {
    ...Styles.containers.horizontal,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalInputContainer: {
    borderColor: Styles.colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: Styles.whitespaces.inner,
  },
  modalListContainer: {
    paddingVertical: Styles.whitespaces.inner / 2,
    paddingRight: Styles.whitespaces.inner + 7,
  },
  modalHeader: {
    //...Styles.containers.overlap,
    ...Styles.texts.title,
    backgroundColor: Styles.colors.light,
    marginVertical: Styles.whitespaces.inner,
    marginHorizontal: Styles.whitespaces.inner / 2,
  },
  divider: {
    height: 1,
    backgroundColor: Styles.colors.lightGray,
  },
});

export default DepartmentsStack;
