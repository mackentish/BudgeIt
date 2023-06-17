import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font } from '../constants/globalStyle';

export default function UserSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    padding: 30,
  },
  headerText: {
    fontSize: 20,
    fontFamily: font.regular,
    color: colors.white,
  },
});
