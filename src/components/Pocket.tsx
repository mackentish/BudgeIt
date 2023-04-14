import {Text, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {currencyFormatter} from '../utils';
import AnimatedPressable from './AnimatedPressable';
import {colors, font} from '../constants/globalStyle';

export default function Pocket({name, amount}: {name: string; amount: number}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AnimatedPressable onPress={() => setIsOpen(!isOpen)}>
      <View style={styles.pocket}>
        <View style={styles.pocketRow}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={[styles.text, styles.amount]}>
            {currencyFormatter.format(amount)}
          </Text>
        </View>
        {isOpen && (
          <View style={styles.pocketRow}>
            <AnimatedPressable style={styles.button}>
              <Text style={styles.addBtn}>Add</Text>
            </AnimatedPressable>
            <AnimatedPressable style={styles.button}>
              <Text style={styles.removeBtn}>Remove</Text>
            </AnimatedPressable>
            <AnimatedPressable style={styles.button}>
              <Text style={styles.moreBtn}>More</Text>
            </AnimatedPressable>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pocket: {
    flexDirection: 'column',
    gap: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
  },
  pocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  name: {
    fontFamily: font.italic,
  },
  amount: {
    fontFamily: font.bold,
  },
  button: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 10,
  },
  addBtn: {
    color: 'green',
  },
  removeBtn: {
    color: 'red',
  },
  moreBtn: {
    color: 'blue',
  },
});
