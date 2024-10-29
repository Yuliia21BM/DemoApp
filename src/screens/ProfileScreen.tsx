/*
 *     FRAMEWORK
 */
import React, {useState} from 'react';
/*
 *     COMPONENTS
 */
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from '../components/Button';
import {QuestionPopup} from '../components/QuestionPopup';
import {UserInfoModal} from '../components/EditUserModal';
import {AppText} from '../components/AppText';
/*
 *     STATE
 */
import {useReduxSelector, useReduxDispatch} from '../store';
import {logout} from '../store/slices/authSlice';
import {selectIsDarkMode, selectUser} from '../store/selectors';
/*
 *     STYLING
 */
import {lightTheme, darkTheme} from '../utils/theme';

const ProfileScreen: React.FC = () => {
  const dispatch = useReduxDispatch();
  const darkMode = useReduxSelector(selectIsDarkMode);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const user = useReduxSelector(selectUser);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogoutPress = () => setLogoutModalVisible(true);
  const confirmLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
  };
  const cancelLogout = () => setLogoutModalVisible(false);

  const handleEditPress = () => {
    setModalVisible(true);
  };

  const handleEditClose = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: currentTheme.colors.background},
      ]}>
      {user && (
        <View style={styles.userInfo}>
          <Image source={{uri: user.avatar}} style={styles.avatar} />
          <View>
            <AppText
              text={`${user.first_name} ${user.last_name}`}
              fontWeight="bold"
              fontSize="large"
              textColor={currentTheme.colors.text}
            />
            <AppText
              text={`${user.email || 'No email provided'}`}
              textColor={currentTheme.colors.text}
            />
          </View>
        </View>
      )}

      <View>
        <Button
          type="primary"
          text="Edit Info"
          onPress={handleEditPress}
          buttonStyle={{marginTop: 20}}
        />
        <Button
          type="secondary"
          text="Logout"
          onPress={handleLogoutPress}
          buttonStyle={{marginTop: 20}}
        />
      </View>
      <QuestionPopup
        isModalVisible={isLogoutModalVisible}
        cancelFunc={cancelLogout}
        confirmFunc={confirmLogout}
        question="Are you sure you want to logout?"
      />
      {user && (
        <UserInfoModal visible={isModalVisible} onDismiss={handleEditClose} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default ProfileScreen;
