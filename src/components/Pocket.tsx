import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { currencyFormatter } from '../utils';
import { colors, numbers, font } from '../constants/globalStyle';
import { Button, PopupMenu } from '../components';
import { useGroups, usePockets } from '../state/queries';
import { Pocket as PocketType } from '../types';
import { AddToGroupModal, DeletePocketModal } from './modals';

export default function Pocket({ pocket }: { pocket: PocketType }) {
  const { updatePocket } = usePockets();
  const { fetchGroups } = useGroups();
  // delete pocket
  const [deleteOpen, setDeleteOpen] = useState(false);
  // edit pocket
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(pocket.name);
  // add to group
  const [addToGroupOpen, setAddToGroupOpen] = useState(false);

  const pocketMenuOptions = [
    {
      label: 'Rename',
      icon: 'edit',
      action: () => setIsEditing(true),
    },
    ...(!pocket.groupId
      ? [
          {
            label: 'Add to group',
            icon: 'plus',
            action: () => setAddToGroupOpen(true),
          },
        ]
      : []),
    {
      label: 'Delete',
      icon: 'delete',
      action: () => setDeleteOpen(true),
      color: colors.temp.red,
    },
  ];

  if (isEditing) {
    return (
      <View style={[styles.pocketRow, editStyles.container]}>
        <TextInput
          value={newName}
          onChangeText={setNewName}
          autoFocus
          selectTextOnFocus
          multiline
          style={[styles.name, editStyles.input]}
        />
        <Button size="small" type="secondary" label="Cancel" onPress={() => setIsEditing(false)} />
        <Button
          size="small"
          type="primary"
          label="Done"
          onPress={() => {
            updatePocket.mutate(
              { ...pocket, name: newName },
              {
                onSuccess: () => {
                  fetchGroups.refetch();
                  setIsEditing(false);
                },
                onError: () => Alert.alert('Error updating pocket'),
              },
            );
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.pocketRow}>
      <View style={styles.pocketInfo}>
        <Text style={styles.name}>{pocket.name}</Text>
        <Text style={[styles.amount, pocket.amount < 0 && styles.negativeAmount]}>
          {currencyFormatter.format(pocket.amount)}
        </Text>
      </View>
      <PopupMenu options={pocketMenuOptions} />
      <DeletePocketModal isOpen={deleteOpen} setIsOpen={setDeleteOpen} pocket={pocket} />
      <AddToGroupModal isOpen={addToGroupOpen} setIsOpen={setAddToGroupOpen} pocket={pocket} />
    </View>
  );
}

const styles = StyleSheet.create({
  pocketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    alignSelf: 'stretch',
    padding: 16,
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
  },
  pocketInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    color: colors.temp.black,
    fontFamily: font.regular,
    fontSize: 16,
  },
  amount: {
    color: colors.temp.black,
    fontFamily: font.bold,
    fontSize: 20,
  },
  negativeAmount: {
    color: colors.temp.red,
  },
  icon: {
    fontSize: 24,
    color: colors.temp.black,
  },
});

const editStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.temp.gray,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.temp.black,
    borderStyle: 'dashed',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'justify',
  },
});
