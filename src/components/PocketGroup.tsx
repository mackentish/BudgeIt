import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, LayoutAnimation } from 'react-native';
import { Icon, Pocket, AnimatedChevron } from '.';
import { ConfirmDeleteGroup } from './modals';
import { colors, font, numbers } from '../constants/globalStyle';
import { currencyFormatter } from '../utils';
import { PocketGroup as PocketGroupType } from '../types';
import { useGroups, usePockets } from '../state/queries';

export default function PocketGroup({ group }: { group: PocketGroupType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { deleteGroup } = useGroups();
  const { fetchPockets } = usePockets();

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <View style={styles.title}>
          <Icon name="group" style={styles.icon} />
          <Text style={styles.name}>{group.name}</Text>
        </View>
        <View style={styles.headerGroup}>
          <Text style={styles.amount}>
            {currencyFormatter.format(group.pockets.reduce((acc, curr) => acc + curr.amount, 0))}
          </Text>
          <AnimatedChevron chevronUp={isOpen} color={colors.temp.white} />
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.pockets}>
          {group.pockets.map(pocket => (
            <Pocket key={pocket._id} pocket={pocket} />
          ))}
          <Pressable style={styles.deleteBtn} onPress={() => setIsConfirmOpen(true)}>
            <Text style={styles.btnText}>Delete Group</Text>
          </Pressable>
        </View>
      )}
      <ConfirmDeleteGroup
        isOpen={isConfirmOpen}
        close={() => setIsConfirmOpen(false)}
        deleteFn={() => {
          deleteGroup.mutate(group._id, {
            onSuccess: () => fetchPockets.refetch(),
          });
          setIsConfirmOpen(false);
        }}
      />
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
  icon: {
    color: colors.temp.white,
    fontSize: 20,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pockets: {
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
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
  deleteBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.temp.red,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: numbers.borderRadius.medium,
  },
  btnText: {
    color: colors.temp.white,
    fontFamily: font.bold,
    fontSize: 16,
  },
});
