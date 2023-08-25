import React from 'react';
import { View, Modal as ReactModal, StyleSheet } from 'react-native';
import { colors, numbers } from '../constants/globalStyle';

export default function Modal({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <View style={styles.centeredView}>
      <ReactModal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </ReactModal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.large,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
