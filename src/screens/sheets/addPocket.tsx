import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Keyboard, Alert } from 'react-native';
import { colors, font, numbers } from '../../constants/globalStyle';
import { Button, Icon } from '../../components';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { currencyFormatter } from '../../utils';
import { SelectList } from 'react-native-dropdown-select-list';

export default function AddPocket() {
  const { close } = useBottomSheet();
  const [pocketName, setPocketName] = useState('');
  const [startingAmount, setStartingAmount] = useState('$0.00');
  const [pocketGroup, setPocketGroup] = useState('');
  const [note, setNote] = useState('');
  // Only name and amount are required. Amount can be 0
  const isValid = pocketName.length > 0 && !isNaN(Number(startingAmount.replace(/[^0-9.]/g, '')));

  // TODO: get pocket groups from API
  const pocketGroupsMockData = [
    { key: '', value: 'No Group' },
    { key: '1', value: 'Pocket Group 1' },
    { key: '2', value: 'Pocket Group 2' },
    { key: '3', value: 'Pocket Group 3' },
    { key: '4', value: 'Pocket Group 4' },
    { key: '5', value: 'Pocket Group 5' },
    { key: '6', value: 'Pocket Group 6' },
    { key: '7', value: 'Pocket Group 7' },
    { key: '8', value: 'Pocket Group 8' },
    { key: '9', value: 'Pocket Group 9' },
    { key: '10', value: 'Pocket Group 10' },
  ];

  const closeAndReset = () => {
    setPocketName('');
    setStartingAmount('$0.00');
    setPocketGroup('');
    setNote('');
    Keyboard.dismiss();
    close();
  };

  const onSave = () => {
    Alert.alert('TODO: save pocket');
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
        <SelectList
          data={pocketGroupsMockData}
          setSelected={setPocketGroup}
          save="key"
          placeholder="Choose a Pocket Group"
          search
          maxHeight={200}
          arrowicon={<Icon name="chevron-down" style={styles.iconSm} />}
          closeicon={<Icon name="x" style={styles.iconSm} />}
          searchPlaceholder="Search Pocket Groups"
          fontFamily={font.regular}
          notFoundText="No matching groups found"
          boxStyles={styles.select}
          inputStyles={styles.selectInput}
          dropdownStyles={styles.dropDown}
        />
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Note</Text>
          <Text style={styles.labelLight}> - first 20 characters will be shown as subtitle</Text>
        </View>
        <TextInput value={note} placeholder="Ex: Use Jan-May to help pay off loan." style={styles.input} />
      </View>
      <View style={styles.gap} />
      <Button size="large" label="Save" onPress={onSave} disabled={!isValid} />
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
  iconSm: {
    alignSelf: 'center',
    fontSize: 12,
    color: colors.temp.midGray,
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
  select: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.medium,
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontFamily: font.regular,
    fontSize: 16,
  },
  selectInput: {
    fontFamily: font.regular,
    fontSize: 16,
  },
  dropDown: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
    borderWidth: 0,
  },
  amountInput: {
    fontFamily: font.bold,
  },
  gap: {
    flex: 1,
  },
});
