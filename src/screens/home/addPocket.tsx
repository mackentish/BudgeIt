import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/globalStyle';

export default function AddPocket() {
  return (
    <View style={styles.container}>
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
    top: 10,
    left: 10,
  },
  icon: {
    fontSize: 24,
    color: colors.temp.black,
  },
});
