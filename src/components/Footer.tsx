import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Icon name="home" style={styles.icon} />
      <Icon name="user" style={styles.icon} />
      <Icon name="bar-chart" style={styles.icon} />
      <Icon name="signal" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 10,
    width: '100%',
  },
  icon: {
    color: colors.secondary,
    fontSize: 30,
  },
});
