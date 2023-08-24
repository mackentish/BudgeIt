import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
import { colors, font, numbers } from '../../constants/globalStyle';
import { Button, Icon } from '../../components';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { currencyFormatter } from '../../utils';

export default function AddPocket() {
  const { close } = useBottomSheet();
  const [pocketName, setPocketName] = useState('');
  const [startingAmount, setStartingAmount] = useState('$0.00');
  const [pocketGroup, setPocketGroup] = useState(''); // TODO: use react-native-dropdown-select-list
  const [note, setNote] = useState('');

  const closeAndReset = () => {
    setPocketName('');
    setStartingAmount('$0.00');
    setPocketGroup('');
    setNote('');
    Keyboard.dismiss();
    close();
  };

  const onSave = () => {
    // TODO: save pocket
    closeAndReset();
  };

  const onAmountChange = (text: string) => {
    // don't allow more than one decimal
    const splitText = text.split('.');
    if (splitText.length > 2) {
      return;
    }
    // don't allow more than two decimal places
    if (splitText.length > 1 && splitText[1].length > 2) {
      return;
    }
    setStartingAmount(text);
  };
  const onAmountBlur = () => {
    try {
      // remove all non-numeric characters and split on decimal
      const splitText = startingAmount.replace(/[^0-9.]/g, '').split('.');
      let newText = splitText[0];
      // if there is a decimal, add it back
      if (splitText.length > 1) {
        newText += '.' + splitText[1].slice(0, 2);
      }
      // if there is no decimal, add one
      else {
        newText += '.00';
      }
      setStartingAmount(currencyFormatter.format(Number(newText)));
    } catch (err) {
      console.log(err);
      setStartingAmount('$0.00');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={closeAndReset} style={styles.closeBtn}>
        <Icon name="x" style={styles.icon} />
      </Pressable>
      <TextInput value={pocketName} onChangeText={setPocketName} placeholder="Pocket Name" style={styles.nameInput} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Starting Amount</Text>
        <TextInput
          value={startingAmount}
          onBlur={onAmountBlur}
          clearTextOnFocus
          onChangeText={onAmountChange}
          keyboardType="numeric"
          style={[styles.input, styles.amountInput]}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pocket Group</Text>
        <Text>TODO: use react-native-dropdown-select-list</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Note - first 20 characters will be shown as subtitle</Text>
        <TextInput value={note} placeholder="Ex: Use Jan-May to help pay off loan." style={styles.input} />
      </View>
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
  label: {
    fontSize: 14,
    fontFamily: font.medium,
  },
  input: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontFamily: font.regular,
    fontSize: 16,
  },
  amountInput: {
    fontFamily: font.bold,
  },
  gap: {
    flex: 1,
  },
});
