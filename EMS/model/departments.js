import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

export const Departments = [
  /*TODO: retrieve data and IDs from database. This is only a dummy data.*/
  {
    id: nanoid(),
    name: 'Marketing',
    head: {id: nanoid(), name: 'Macey Osaka'},
    members: [
      {id: nanoid(), name: 'Amy Farha'},
      {id: nanoid(), name: 'Chris Jackson'},
      {id: nanoid(), name: 'Mia Smith'},
    ],
  },
  {
    id: nanoid(),
    name: 'Information Technology',
    head: {id: nanoid(), name: 'Atsuma Yami'},
    members: [
      {id: nanoid(), name: 'Armanda Martin'},
      {id: nanoid(), name: 'Christy Thomas'},
      {id: nanoid(), name: 'Melissa Jones'},
    ],
  },
  {
    id: nanoid(),
    name: 'Human Resources',
    head: {id: nanoid(), name: 'Will Taylor'},
    members: [
      {id: nanoid(), name: 'Jessica Ang'},
      {id: nanoid(), name: 'Kris Grey'},
      {id: nanoid(), name: 'Trish Kia'},
    ],
  },
];
