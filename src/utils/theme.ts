import {DefaultTheme, DarkTheme} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F4F4',
    text: '#000000',
    primary: '#4094A3',
    error: '#DB524A',
    inputBackground: '#FFFFFF',
    border: '#DDDDDD',
    headerbarBackground: '#fffffa',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#3A474E',
    text: '#ffffff',
    primary: '#4094A3',
    error: '#DB524A',
    inputBackground: '#65727A',
    border: '#444',

    headerbarBackground: '#65727A',
  },
};
