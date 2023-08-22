import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/globalStyle';
import { Icon } from '../../components';

export default function AddPocket({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.back()}>
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
  },
  icon: {
    fontSize: 24,
    color: colors.temp.black,
  },
});
