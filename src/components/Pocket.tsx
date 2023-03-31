import {Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {currencyFormatter} from '../utils';

export default function Pocket({name, amount}: {name: string; amount: number}) {
  return (
    <View style={styles.pocket}>
      <Text style={[styles.text, styles.name]}>{name}</Text>
      <Text style={[styles.text, styles.amount]}>
        {currencyFormatter.format(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pocket: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  name: {
    fontStyle: 'italic',
  },
  amount: {
    fontWeight: 'bold',
  },
});
