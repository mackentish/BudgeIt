/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors, font } from '../constants/globalStyle';

export default function Header() {
  return (
    <View style={{ zIndex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>budge-it</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: font.bold,
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
