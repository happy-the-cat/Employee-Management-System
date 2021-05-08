import React from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RootStackScreen from './src/screens/rootScreens/RootStackScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/*<Stack.Navigator></Stack.Navigator>*/}
    </NavigationContainer>
  );
};

export default App;

// base data structures
// class Company {
//   constructor(
//     employees,
//     departments,
//     payrolls,
//     maximumPersonalLeaves,
//     maximumSickLeaves,
//     leaveRequests,
//   ) {
//     this.employees = employees;
//     this.departments = departments;
//     this.payrolls = payrolls;
//     this.maximumPersonalLeaves = maximumPersonalLeaves;
//     this.maximumSickLeaves = maximumSickLeaves;
//     this.leaveRequests = leaveRequests;
//   }
// }
//
// class Payroll {
//   constructor(startingDate, endingDate, wages) {
//     this.startingDate = startingDate;
//     this.endingDate = endingDate;
//     this.wages = wages;
//   }
// }
//
// const PaymentMethod = Object.freeze({
//   BANK_TRANSFER: 1,
//   CHECK: 2,
// });
//
// const PaymentStatus = Object.freeze({
//   PENDING: 1,
//   COMPLETE: 2,
// });
//
// class Wages {
//   constructor(
//     employeeIDNumber,
//     hoursWorkedEachDay,
//     rateOfPay,
//     grossAmountEarned,
//     totalDeductions,
//     netWagesPaidForWeek,
//     paymentMethod,
//     paymentStatus,
//   ) {
//     this.employeeIDNumber = employeeIDNumber;
//     this.rateOfPay = rateOfPay;
//     this.grossAmountEarned = grossAmountEarned;
//     this.totalDeductions = totalDeductions;
//     this.netWagesPaidForWeek = netWagesPaidForWeek;
//     this.paymentMethod = paymentMethod;
//     this.paymentStatus = paymentStatus;
//   }
// }
//
// class Department {
//   constructor(departmentIDNumber, title, headIDNumber, memberIDNumbers) {
//     this.departmentIDNumber = departmentIDNumber;
//     this.title = title;
//     this.headIDNumber = headIDNumber;
//     this.memberIDNumbers = memberIDNumbers;
//   }
// }
//
// class Skill {
//   constructor(skill, percentage) {
//     this.skill = skill;
//     this.percentage = percentage;
//   }
// }
//
// class Employee extends User {
//   constructor(
//     userCredentials,
//     firstName,
//     lastName,
//     emailAddress,
//     dateOfBirth,
//     gender,
//     pronoun,
//     employeeIDNumber,
//     title,
//     employmentType,
//     departmentIDNumber,
//     beginDate,
//     address,
//     educations,
//     workExperiences,
//     skills,
//     socialSecurityNumber,
//     leaveBenefits,
//     isCompanyAdmin,
//     isDepartmentHead,
//   ) {
//     super(
//       userCredentials,
//       firstName,
//       lastName,
//       emailAddress,
//       dateOfBirth,
//       gender,
//       pronoun,
//     );
//     this.employeeIDNumber = employeeIDNumber;
//     this.title = title;
//     this.employmentType = employmentType;
//     this.departmentIDNumber = departmentIDNumber;
//     this.beginDate = beginDate;
//     this.address = address;
//     this.educations = educations;
//     this.workExperiences = workExperiences;
//     this.skills = skills;
//     this.socialSecurityNumber = socialSecurityNumber;
//     this.leaveBenefits = leaveBenefits;
//     this.isCompanyAdmin = isCompanyAdmin;
//     this.isDepartmentHead = isDepartmentHead;
//   }
// }
//
// const LeaveBenefitType = Object.freeze({
//   PERSONAL_LEAVE: 1,
//   SICK_LEAVE: 2,
// });
//
// const LEAVE_REQUEST_STATUS = Object.freeze({
//   PENDING: 1,
//   APPROVED: 2,
//   DENIED: 3,
// });
//
// class LeaveRequest {
//   constructor(
//     employeeIDNumber,
//     leaveBenefitType,
//     leaveRequestStatus,
//     startingDate,
//     endingDate,
//     isPaidLeave,
//   ) {
//     this.employeeIDNumber = employeeIDNumber;
//     this.leaveBenefitType = leaveBenefitType;
//     this.leaveRequestStatus = leaveRequestStatus;
//     this.startingDate = startingDate;
//     this.endingDate = endingDate;
//     this.isPaidLeave = isPaidLeave;
//   }
// }
//
// class LeaveBenefits {
//   constructor(personalLeaves, sickLeaves) {
//     this.personalLeaves = personalLeaves;
//     this.sickLeaves = sickLeaves;
//   }
// }
//
// class Address {
//   constructor(address1, address2, city, region, postalCode, telephoneNumber) {
//     this.address1 = address1;
//     this.address2 = address2;
//     this.city = city;
//     this.region = region;
//     this.postalCode = postalCode;
//     this.telephoneNumber = telephoneNumber;
//   }
// }
//
// class Education {
//   constructor(school, degree, fieldOfStudy, startYear, endYear) {
//     this.school = school;
//     this.degree = degree;
//     this.fieldOfStudy = fieldOfStudy;
//     this.startYear = startYear;
//     this.endYear = endYear;
//   }
// }
//
// const EmploymentType = Object.freeze({
//   FULL_TIME: 1,
//   PART_TIME: 2,
//   SELF_EMPLOYED: 3,
//   FREELANCE: 4,
//   CONTRACT: 5,
//   INTERNSHIP: 6,
//   APPRENTICESHIP: 7,
//   SEASONAL: 8,
// });
//
// class WorkExperience {
//   constructor(title, employmentType, company, location, startDate, endDate) {
//     this.title = title;
//     this.employmentType = employmentType;
//     this.company = company;
//     this.location = location;
//     this.startDate = startDate;
//     this.endDate = endDate;
//   }
// }
//
// class User {
//   constructor(
//     userCredentials,
//     firstName,
//     lastName,
//     emailAddress,
//     dateOfBirth,
//     gender,
//     pronoun,
//   ) {
//     this.userCredentials = userCredentials;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.emailAddress = emailAddress;
//     this.dateOfBirth = dateOfBirth;
//     this.gender = gender;
//     this.pronoun = pronoun;
//   }
// }
//
// class UserCredentials {
//   constructor(username, password, userIDNumber) {
//     this.username = username;
//     this.password = password;
//     this.userIDNumber = userIDNumber;
//   }
// }
