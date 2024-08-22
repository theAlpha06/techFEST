import React from 'react';
import { BsCurrencyDollar, BsShield} from 'react-icons/bs';
import { FiShoppingBag, FiCreditCard } from 'react-icons/fi';
import { RiContactsLine } from 'react-icons/ri';
import avatar from './avatar.jpg';

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Home',
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: 'Fields',
    links: [
      {
        name: 'Users',
        icon: <RiContactsLine />,
      },
      {
        name: 'Domains',
        icon: <RiContactsLine />,
      },
      {
        name: 'Events',
        icon: <RiContactsLine />,
      },
      {
        name: 'Workshops',
        icon: <RiContactsLine />,
      },
      {
        name: 'Sponsers',
        icon: <RiContactsLine />,
      },
      {
        name: 'Domainadd',
        icon: <RiContactsLine />,
      },
      {
        name: 'Eventadd',
        icon: <RiContactsLine />,
      },
      {
        name: 'Workshopadd',
        icon: <RiContactsLine />,
      },
      {
        name: 'Sponseradd',
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: 'Charts',
    links: [
    ],
  },
];



export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];
