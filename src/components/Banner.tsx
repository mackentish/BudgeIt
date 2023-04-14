import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors, font} from '../constants/globalStyle';
import {currencyFormatter} from '../utils';

export default function Banner({total}: {total: number}) {
  return (
    <View style={styles.banner}>
      <View style={styles.textContainer}>
        <Text style={styles.bannerText}>Total:</Text>
        <Text style={styles.bannerText}>{currencyFormatter.format(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.secondary,
    width: '100%',
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bannerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontFamily: font.bold,
  },
});
