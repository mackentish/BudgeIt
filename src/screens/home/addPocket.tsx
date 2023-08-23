import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../../constants/globalStyle';
import { Icon } from '../../components';
import { useBottomSheet } from '@gorhom/bottom-sheet';

export default function AddPocket() {
  const { close } = useBottomSheet();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => close()} style={styles.closeBtn}>
        <Icon name="x" style={styles.icon} />
      </Pressable>
      <Text>Add Pocket</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.temp.gray,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  icon: {
    fontSize: 24,
    color: colors.temp.black,
  },
});
