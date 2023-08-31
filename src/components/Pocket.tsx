import { Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { currencyFormatter } from '../utils';
import { colors, numbers, font } from '../constants/globalStyle';
import { Button, Modal, PopupMenu } from '../components';
import { useGroups, usePockets } from '../state/queries';
import { Pocket as PocketType } from '../types';
import { AddToGroupModal } from './modals';

export default function Pocket({ pocket }: { pocket: PocketType }) {
  const { updatePocket, deletePocket } = usePockets();
  const { fetchGroups } = useGroups();
  // delete pocket
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notZeroOpen, setNotZeroOpen] = useState(false);
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

  function deletePocketLogic() {
    setDeleteOpen(false);
    if (pocket.amount !== 0) {
      setNotZeroOpen(true);
    } else {
      deletePocket.mutate(pocket._id, {
        onSuccess: () => {
          fetchGroups.refetch();
          setDeleteOpen(false);
        },
        onError: () => Alert.alert('Error deleting pocket'),
      });
    }
  }

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

      {/* Delete pocket modal */}
      <Modal visible={deleteOpen}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.header}>Are you sure?</Text>
          <Text style={modalStyles.message}>This pocket will be permanently deleted.</Text>
          <Button size="medium" type="secondary" label="Cancel" onPress={() => setDeleteOpen(false)} />
          <Button size="medium" label="Delete" onPress={deletePocketLogic} />
        </View>
      </Modal>

      {/* Pocket amount not zero modal */}
      <Modal visible={notZeroOpen}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.header}>{`${currencyFormatter.format(pocket.amount)} left in pocket.`}</Text>
          <Text style={modalStyles.message}>Pockets must have a balance of $0 to be deleted</Text>
          <Button size="medium" type="secondary" label="Cancel" onPress={() => setNotZeroOpen(false)} />
          <Button size="medium" label="Add Transaction" onPress={() => console.log('TODO: add transaction')} />
        </View>
      </Modal>
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

const modalStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
  },
  header: {
    fontFamily: font.bold,
    fontSize: 24,
    color: colors.temp.black,
    alignSelf: 'center',
  },
  message: {
    fontFamily: font.regular,
    fontSize: 16,
    color: colors.temp.black,
    alignSelf: 'center',
    marginBottom: 10,
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
