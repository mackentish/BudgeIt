import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, LayoutAnimation } from 'react-native';
import Icon from './Icon';
import Pocket from './Pocket';
import { colors, font, numbers } from '../constants/globalStyle';
import { currencyFormatter } from '../utils';
import { PocketGroup as PocketGroupType } from '../types';

export default function PocketGroup({ group }: { group: PocketGroupType }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <View style={styles.info}>
          <View style={styles.title}>
            <Icon name="group" style={styles.groupIcon} />
            <Text style={styles.name}>{group.name}</Text>
          </View>
          <Text style={styles.amount}>
            {currencyFormatter.format(group.pockets.reduce((acc, curr) => acc + curr.amount, 0))}
          </Text>
          <Icon name={`chevron-${isOpen ? 'up' : 'down'}`} style={styles.chevronIcon} />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.pockets}>
          {group.pockets.map(pocket => (
            <Pocket key={pocket._id} pocket={pocket} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.temp.black,
    justifyContent: 'center',
    borderRadius: numbers.borderRadius.medium,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
  },
  groupIcon: {
    color: colors.temp.white,
    fontSize: 20,
  },
  chevronIcon: {
    color: colors.temp.white,
    fontSize: 12,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 20,
  },
  pockets: {
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: colors.temp.white,
    fontSize: 16,
    fontFamily: font.regular,
  },
  amount: {
    color: colors.temp.white,
    fontSize: 20,
    fontFamily: font.bold,
  },
});
