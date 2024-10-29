/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
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

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (val: any) => void;
  error?: any;
  placeholder: string;
  secureTextEntry?: boolean;
  style?: StyleProp<TextStyle>;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
  secureTextEntry = false,
  style,
}) => {
  const darkMode = useReduxSelector(selectIsDarkMode);

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.border}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <AppText
          text={error}
          fontSize="small"
          textStyle={[styles.error, {color: theme.colors.error}]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 12,
    borderRadius: 8,
    width: '100%',
  },
  error: {
    marginBottom: 10,
  },
});

export default InputField;
