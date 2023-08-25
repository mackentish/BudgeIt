import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Keyboard, Alert } from 'react-native';
import { colors, font, numbers } from '../../constants/globalStyle';
import { Button, Icon, Modal } from '../../components';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { Pocket } from '../../types';
import { currencyFormatter } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';

function GroupPocket({ name, amount, onPress }: { name: string; amount: number; onPress: () => void }) {
  return (
    <View style={pocketStyles.pocket}>
      <View style={pocketStyles.pocketRow}>
        <View style={pocketStyles.pocketInfo}>
          <Text style={pocketStyles.name}>{name}</Text>
          <Text style={[pocketStyles.amount, amount < 0 && pocketStyles.negativeAmount]}>
            {currencyFormatter.format(amount)}
          </Text>
        </View>
        <Pressable onPress={onPress}>
          <Icon name="x" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

function PocketOption({
  name,
  amount,
  disabled,
  onPress,
}: {
  name: string;
  amount: number;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[pocketOptionStyles.pocketOption, disabled && pocketOptionStyles.disabled]} onPress={onPress}>
      <View style={pocketStyles.pocketInfo}>
        <Text style={pocketOptionStyles.name}>{name}</Text>
        <Text style={[pocketOptionStyles.amount, amount < 0 && pocketStyles.negativeAmount]}>
          {currencyFormatter.format(amount)}
        </Text>
      </View>
      <Icon name="plus" style={styles.icon} />
    </Pressable>
  );
}

export default function AddGroup({ pockets }: { pockets: Pocket[] }) {
  const { close } = useBottomSheet();
  const [groupName, setGroupName] = useState('');
  const [note, setNote] = useState('');
  const [groupPockets, setGroupPockets] = useState<Pocket[]>([]);
  const [showModal, setShowModal] = useState(false);

  const closeAndReset = () => {
    setGroupName('');
    setNote('');
    setGroupPockets([]);
    Keyboard.dismiss();
    close();
  };

  const onSave = () => {
    Alert.alert('TODO: save group and update pockets');
    closeAndReset();
  };

  const removePocket = (id: string) => {
    setGroupPockets(groupPockets.filter(p => p._id !== id));
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={closeAndReset} style={styles.closeBtn}>
        <Icon name="x" style={styles.icon} />
      </Pressable>
      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="New Pocket Group"
        style={styles.nameInput}
      />
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.labelLight}> - first 20 characters will be shown as subtitle</Text>
        </View>
        <TextInput value={note} placeholder="Ex: Tahoe trip expenses." style={styles.input} />
      </View>
      {groupPockets.length > 0 && (
        <View style={styles.addedPockets}>
          <View style={styles.totalRow}>
            <Text style={styles.header}>Total</Text>
            <Text style={styles.header}>
              {currencyFormatter.format(groupPockets.reduce((total, { amount }) => total + amount, 0))}
            </Text>
          </View>
          {groupPockets.map(p => (
            <GroupPocket key={p._id} name={p.name} amount={p.amount} onPress={() => removePocket(p._id)} />
          ))}
        </View>
      )}
      <Button size="medium" type="secondary" label="Add Pockets" onPress={() => setShowModal(true)} />
      <Modal visible={showModal}>
        <View style={modalStyles.modal}>
          <ScrollView style={modalStyles.scrollView}>
            <View style={modalStyles.pocketContainer}>
              {pockets.map(p => (
                <PocketOption
                  key={p._id}
                  name={p.name}
                  amount={p.amount}
                  disabled={groupPockets.some(gp => gp._id === p._id)}
                  onPress={() => {
                    if (groupPockets.some(gp => gp._id === p._id)) {
                      // if pocket is already in group, remove it
                      setGroupPockets(groupPockets.filter(gp => gp._id !== p._id));
                    } else {
                      setGroupPockets([...groupPockets, p]);
                    }
                  }}
                />
              ))}
            </View>
          </ScrollView>
          <Button label="Done" size="medium" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
      <View style={styles.gap} />
      <Button size="large" label="Save" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20,
    flex: 1,
    backgroundColor: colors.temp.gray,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  icon: {
    fontSize: 18,
  },
  inputGroup: {
    flexDirection: 'column',
    gap: 10,
  },
  nameInput: {
    fontSize: 22,
    fontFamily: font.bold,
    textAlign: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: font.medium,
  },
  labelLight: {
    fontSize: 13,
    fontFamily: font.medium,
    color: colors.temp.darkGray,
  },
  addedPockets: {
    flexDirection: 'column',
    gap: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontFamily: font.bold,
  },
  input: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    borderColor: colors.temp.midGray,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontFamily: font.regular,
    fontSize: 16,
  },
  gap: {
    flex: 1,
  },
});

const pocketStyles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 5 },
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
});

const modalStyles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  scrollView: {
    backgroundColor: colors.temp.gray,
    borderRadius: numbers.borderRadius.small,
    maxHeight: 300,
  },
  pocketContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 8,
  },
});

const pocketOptionStyles = StyleSheet.create({
  pocketOption: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    padding: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  name: {
    color: colors.temp.black,
    fontFamily: font.regular,
    fontSize: 14,
  },
  amount: {
    color: colors.temp.black,
    fontFamily: font.bold,
    fontSize: 16,
  },
});
