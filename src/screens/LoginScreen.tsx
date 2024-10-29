/*
 *     FRAMEWORK
 */
import React, {useEffect, useState} from 'react';
/*
 *     COMPONENTS
 */
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components/Button';
import {Formik} from 'formik';
import InputField from '../components/InputField';
import {AppText} from '../components/AppText';
/*
 *     SCHEMA
 */
import {loginValidationSchema} from '../utils/schemas';
/*
 *     STATE
 */
import {useReduxSelector, useReduxDispatch} from '../store';
import {login} from '../store/slices/authSlice';
import {selectIsAuthenticated, selectIsDarkMode} from '../store/selectors';
import {fetchRandomUser} from '../store/operations';
/*
 *     NAVIGATION
 */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../navigation/types';
/*
 *     STYLING
 */
import {lightTheme, darkTheme} from '../utils/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const dispatch = useReduxDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const darkMode = useReduxSelector(selectIsDarkMode);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Main');
    }
  }, [isAuthenticated, navigation]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.colors.background},
      ]}>
      <AppText
        text="Welcome Back"
        fontSize="large"
        fontWeight="bold"
        textColor={currentTheme.colors.text}
        textStyle={styles.title}
      />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          dispatch(login({email: values.email}));
          dispatch(fetchRandomUser());
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <InputField
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              placeholder="Email"
            />
            <View style={styles.passwordContainer}>
              <InputField
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={{paddingRight: 55}}
              />
              <Button
                type="primary"
                iconName={showPassword ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisibility}
                buttonStyle={styles.eyeIcon}
              />
            </View>

            <Button
              type="primary"
              onPress={() => handleSubmit()}
              text="Log In"
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    marginTop: 0,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
