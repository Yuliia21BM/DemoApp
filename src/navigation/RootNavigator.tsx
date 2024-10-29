/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     NAVIGATION
 */
import {createStackNavigator} from '@react-navigation/stack';
/*
 *     STATE
 */
import {useReduxSelector} from '../store';
import {selectIsAuthenticated} from '../store/selectors';
/*
 *     COMPONENTS
 */
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
/*
 *     TYPES
 */
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
