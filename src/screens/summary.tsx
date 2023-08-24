import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Summary() {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Summary</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.temp.gray,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.temp.gray,
    flex: 1,
    padding: 30,
  },
  headerText: {
    fontSize: 20,
    fontFamily: font.regular,
    color: colors.temp.black,
  },
});
