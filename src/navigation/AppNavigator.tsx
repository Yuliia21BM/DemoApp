/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     NAVIGATION
 */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
/*
 *     COMPONENTS
 */
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText} from '../components/AppText';
/*
 *     STATE
 */
import {useReduxSelector} from '../store';
import {selectIsDarkMode} from '../store/selectors';
/*
 *     STYLING
 */
import {lightTheme, darkTheme} from '../utils/theme';

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => {
  const darkMode = useReduxSelector(selectIsDarkMode);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentTheme.colors.headerbarBackground,
      }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: currentTheme.colors.headerbarBackground,
          },
          tabBarLabelStyle: {
            color: currentTheme.colors.text,
          },
          tabBarIndicatorStyle: {
            backgroundColor: currentTheme.colors.primary,
          },
          tabBarItemStyle: {
            flexDirection: 'row',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <View style={styles.tabLabel}>
                <MIcon
                  name="home"
                  size={24}
                  color={
                    focused
                      ? currentTheme.colors.primary
                      : currentTheme.colors.text
                  }
                />
                <AppText
                  text="Feeds"
                  fontSize="middle"
                  fontWeight="regular"
                  textColor={
                    focused
                      ? currentTheme.colors.primary
                      : currentTheme.colors.text
                  }
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({focused}) => (
              <View style={styles.tabLabel}>
                <MIcon
                  name="account-heart"
                  size={24}
                  color={
                    focused
                      ? currentTheme.colors.primary
                      : currentTheme.colors.text
                  }
                />
                <AppText
                  text="Profile"
                  fontSize="middle"
                  fontWeight="regular"
                  textColor={
                    focused
                      ? currentTheme.colors.primary
                      : currentTheme.colors.text
                  }
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default AppNavigator;
