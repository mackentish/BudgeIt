import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors, font} from '../constants/globalStyle';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>budge-it</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
  },
  header: {
    height: 60,
    backgroundColor: colors.darkPurple,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: font.bold,
    color: colors.turquoise,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
