import React from 'react';
import { View, Modal as ReactModal, StyleSheet } from 'react-native';
import { colors } from '../constants/globalStyle';

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
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.temp.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
