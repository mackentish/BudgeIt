import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { colors, font } from '../constants/globalStyle';
import { currencyFormatter } from '../utils';
import { UserContext } from '../state/context/UserProvider';

export default function Banner() {
  const {
    pockets,
    user: { unallocated },
  } = useContext(UserContext);
  const inUseTotal = pockets.reduce((acc, pocket) => acc + pocket.amount, 0);
  const total = inUseTotal + unallocated;
  return (
    <View style={styles.banner}>
      <View style={styles.bannerRow}>
        <Text style={styles.bannerText}>Total:</Text>
        <Text style={styles.bannerText}>{currencyFormatter.format(total)}</Text>
      </View>

      <View style={styles.blocksRow}>
        <View style={styles.allocationBlock}>
          <Text style={styles.blockHeader}>Unallocated</Text>
          <Text style={styles.blockText}>{currencyFormatter.format(unallocated)}</Text>
        </View>

        <View style={styles.allocationBlock}>
          <Text style={styles.blockHeader}>In Use</Text>
          <Text style={styles.blockText}>{currencyFormatter.format(inUseTotal)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '100%',
    marginVertical: 15,
  },
  bannerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.secondary,
  },
  bannerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    fontFamily: font.bold,
  },
  blocksRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  allocationBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: '48%',
  },
  blockHeader: {
    color: 'white',
    fontSize: 18,
    fontFamily: font.bold,
  },
  blockText: {
    color: 'white',
    fontSize: 16,
    fontFamily: font.regular,
  },
});
