/*
 *     FRAMEWORK
 */
import React from 'react';
/*
 *     COMPONENTS
 */
import {StyleSheet, Modal, View} from 'react-native';
import {AppText} from './AppText';
import {Button} from './Button';
/*
 *     STATE
 */
import {useReduxSelector} from '../store';
import {selectIsDarkMode} from '../store/selectors';
/*
 *     STYLING
 */
import {darkTheme, lightTheme} from '../utils/theme';

interface QuestionPopupProps {
  isModalVisible: boolean;
  confirmFunc: () => void;
  cancelFunc: () => void;
  question: string;
}

export const QuestionPopup = ({
  isModalVisible,
  confirmFunc,
  cancelFunc,
  question,
}: QuestionPopupProps) => {
  const darkMode = useReduxSelector(selectIsDarkMode);

  const currentTheme = darkMode ? darkTheme : lightTheme;
  return (
    <Modal visible={isModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: currentTheme.colors.background},
          ]}>
          <AppText
            text={question}
            textColor={currentTheme.colors.text}
            textStyle={styles.modalText}
          />
          <View style={styles.buttonContainer}>
            <Button
              type="secondary"
              text="Yes"
              onPress={confirmFunc}
              buttonStyle={[
                styles.modalButton,
                {backgroundColor: currentTheme.colors.error},
              ]}
            />
            <Button
              type="secondary"
              text="Cancel"
              onPress={cancelFunc}
              buttonStyle={[
                styles.modalButton,
                {backgroundColor: currentTheme.colors.primary},
              ]}
            />
          </View>
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
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
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
