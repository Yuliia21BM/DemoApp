/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText} from './AppText';
/*
 *     STATE
 */
import {useReduxSelector} from '../store';
import {selectIsDarkMode} from '../store/selectors';
/*
 *     STYLING
 */
import {darkTheme, lightTheme} from '../utils/theme';

interface ButtonProps {
  type: 'primary' | 'secondary';
  onPress: () => void;
  text?: string;
  iconName?: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

export const Button = ({
  type,
  onPress,
  text,
  iconName,
  buttonStyle,
}: ButtonProps) => {
  const darkMode = useReduxSelector(selectIsDarkMode);

  const currentTheme = darkMode ? darkTheme : lightTheme;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor:
            type === 'primary'
              ? currentTheme.colors.primary
              : currentTheme.colors.error,
        },
        buttonStyle,
      ]}
      onPress={onPress}>
      {text && <AppText text={text} fontSize="middle" fontWeight="bold" />}
      {iconName && <MIcon name={iconName} size={24} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
});
