import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, font, numbers } from '../../constants/globalStyle';
import { Button, CurrencyInput, Dropdown, Icon } from '../../components';

export default function AddTransaction() {
  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('$0.00');
  const [date, setDate] = useState(new Date());
  const [inflow, setInflow] = useState('');
  const [outflow, setOutflow] = useState('');
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');
  const { close } = useBottomSheet();
  const isValid = transactionTitle && transactionAmount && date && inflow && outflow;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => close()} style={styles.closeBtn}>
        <Icon name="x" style={styles.icon} />
      </Pressable>
      <TextInput
        value={transactionTitle}
        onChangeText={setTransactionTitle}
        placeholder="Title of Transaction"
        style={styles.title}
      />
      <CurrencyInput value={transactionAmount} setValue={setTransactionAmount} style={styles.amount} />
      <View style={styles.details}>
        <View style={[styles.input, styles.datePickerRow]}>
          <Text style={styles.text}>Date:</Text>
          {/* 
          <DateTimePicker
            value={date}
            onChange={(e, newDate) => {
              if (newDate) setDate(newDate);
            }}
            mode="date"
            accentColor={colors.temp.black}
          />
          */}
        </View>

        <Dropdown
          label="Inflow"
          placeholder="Where's the money coming from?"
          options={[
            { label: 'Pockets', value: '', isHeader: true },
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
            { label: 'Other', value: '', isHeader: true },
            { label: 'Other 1', value: 'O1' },
            { label: 'Other 2', value: 'O2' },
          ]}
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Outflow</Text>
          <TextInput
            value={outflow}
            onChangeText={setOutflow}
            placeholder="Where's the money going?"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tags</Text>
          <TextInput
            value={tags}
            onChangeText={setTags}
            placeholder="Type to select/create tags"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note</Text>
          <TextInput value={note} onChangeText={setNote} placeholder="Optional note" style={styles.input} />
        </View>
      </View>
      <View style={styles.flex} />
      <Button
        size="large"
        label="Add Transaction"
        onPress={() => Alert.alert('TODO: add transaction & update pocket(s)')}
        disabled={!isValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 25,
    flex: 1,
    backgroundColor: colors.temp.gray,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  icon: {
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontFamily: font.bold,
    alignSelf: 'center',
  },
  amount: {
    fontSize: 60,
    fontFamily: font.bold,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: colors.temp.midGray,
    borderRadius: numbers.borderRadius.small,
    padding: 10,
  },
  details: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  inputGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: font.regular,
    color: colors.temp.darkGray,
  },
});
