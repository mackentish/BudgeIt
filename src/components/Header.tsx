import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors, font} from '../constants/globalStyle';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>budge-it</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
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
