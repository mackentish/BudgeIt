import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Button, Modal } from '..';
import { colors, font } from '../../constants/globalStyle';
import { useGroups, usePockets } from '../../state/queries';
import { Pocket } from '../../types';
import { currencyFormatter } from '../../utils';

export default function DeletePocketModal({
  isOpen,
  setIsOpen,
  pocket,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pocket: Pocket;
}) {
  const [notZeroOpen, setNotZeroOpen] = useState(false);
  const { deletePocket } = usePockets();
  const { fetchGroups } = useGroups();

  function deletePocketLogic() {
    setIsOpen(false);
    if (pocket.amount !== 0) {
      setNotZeroOpen(true);
    } else {
      deletePocket.mutate(pocket._id, {
        onSuccess: () => {
          fetchGroups.refetch();
          setIsOpen(false);
        },
        onError: () => Alert.alert('Error deleting pocket'),
      });
    }
  }

  return (
    <>
      <Modal visible={isOpen}>
        <View style={styles.container}>
          <Text style={styles.header}>Are you sure?</Text>
          <Text style={styles.message}>This pocket will be permanently deleted.</Text>
          <Button size="medium" type="secondary" label="Cancel" onPress={() => setIsOpen(false)} />
          <Button size="medium" label="Delete" onPress={deletePocketLogic} />
        </View>
      </Modal>
      <Modal visible={notZeroOpen}>
        <View style={styles.container}>
          <Text style={styles.header}>{`${currencyFormatter.format(pocket.amount)} left in pocket.`}</Text>
          <Text style={styles.message}>Pockets must have a balance of $0 to be deleted</Text>
          <Button size="medium" type="secondary" label="Cancel" onPress={() => setNotZeroOpen(false)} />
          <Button size="medium" label="Add Transaction" onPress={() => console.log('TODO: add transaction')} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
