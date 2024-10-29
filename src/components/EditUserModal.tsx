/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {StyleSheet, Modal, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import {AppText} from './AppText';
import {Button} from './Button';
import InputField from './InputField';
/*
 *     STATE
 */
import {useReduxDispatch, useReduxSelector} from '../store';
import {selectIsDarkMode, selectUser} from '../store/selectors';
import {toggleTheme} from '../store/slices/themeSlice';
import {updateUser} from '../store/slices/authSlice';
/*
 *     SCHEMA
 */
import {editValidationSchema} from '../utils/schemas';
/*
 *     STYLING
 */
import {darkTheme, lightTheme} from '../utils/theme';

interface UserInfoModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const UserInfoModal = ({visible, onDismiss}: UserInfoModalProps) => {
  const dispatch = useReduxDispatch();
  const darkMode = useReduxSelector(selectIsDarkMode);
  const user = useReduxSelector(selectUser);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const havdleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSaveUserInfo = (firstName: string, lastName: string) => {
    dispatch(updateUser({firstName, lastName}));
    onDismiss();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: currentTheme.colors.background},
          ]}>
          <Button
            buttonStyle={styles.themeButton}
            type="primary"
            iconName={darkMode ? 'white-balance-sunny' : 'weather-night'}
            onPress={havdleToggleTheme}
          />
          <AppText
            text="Edit"
            textColor={currentTheme.colors.text}
            textStyle={styles.modalText}
            fontSize="large"
          />

          <Formik
            initialValues={{
              firstName: user?.first_name || '',
              lastName: user?.last_name || '',
              image: user?.avatar || '',
            }}
            validationSchema={editValidationSchema}
            onSubmit={values => {
              handleSaveUserInfo(values.firstName, values.lastName);
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <InputField
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                />
                <InputField
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    type="secondary"
                    text="Save"
                    onPress={handleSubmit}
                    buttonStyle={[
                      styles.modalButton,
                      {backgroundColor: currentTheme.colors.primary},
                    ]}
                  />
                  <Button
                    type="secondary"
                    text="Cancel"
                    onPress={onDismiss}
                    buttonStyle={[
                      styles.modalButton,
                      {backgroundColor: currentTheme.colors.error},
                    ]}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'relative',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  themeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 8,
    height: 'auto',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    width: '40%',
  },
});
