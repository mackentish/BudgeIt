import { Text, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { currencyFormatter } from '../utils';
import { colors, numbers, font } from '../constants/globalStyle';
import { Button, Modal, PopupMenu } from '../components';
import { usePockets } from '../state/queries';

export default function Pocket({ _id, name, amount }: { _id: string; name: string; amount: number }) {
  const { deletePocket } = usePockets();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notZeroOpen, setNotZeroOpen] = useState(false);

  const pocketMenuOptions = [
    {
      label: 'Rename',
      icon: 'edit',
      action: () => console.log('TODO: rename pocket'),
    },
    {
      label: 'Add to group',
      icon: 'plus',
      action: () => console.log('TODO: add pocket to group'),
    },
    {
      label: 'Delete',
      icon: 'delete',
      action: () => setDeleteOpen(true),
      color: colors.temp.red,
    },
  ];

  function deletePocketLogic() {
    setDeleteOpen(false);
    if (amount !== 0) {
      setNotZeroOpen(true);
    } else {
      deletePocket.mutate(_id, {
        onSuccess: () => setDeleteOpen(false),
      });
    }
  }

  return (
    <View style={styles.pocket}>
      <View style={styles.pocketRow}>
        <View style={styles.pocketInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.amount, amount < 0 && styles.negativeAmount]}>{currencyFormatter.format(amount)}</Text>
        </View>
        <PopupMenu options={pocketMenuOptions} />
      </View>

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
          <Text style={modalStyles.header}>{`${currencyFormatter.format(amount)} left in pocket.`}</Text>
          <Text style={modalStyles.message}>Pockets must have a balance of $0 to be deleted</Text>
          <Button size="medium" type="secondary" label="Cancel" onPress={() => setNotZeroOpen(false)} />
          <Button size="medium" label="Add Transaction" onPress={() => console.log('TODO: add transaction')} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pocket: {
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 16,
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  pocketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    alignSelf: 'stretch',
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
