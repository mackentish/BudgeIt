import { useBottomSheet } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, font, numbers } from '../../constants/globalStyle';
import { AnimatedChevron, Button, CurrencyInput, Dropdown, Icon } from '../../components';
import { DropdownOption } from '../../types';
import { usePockets } from '../../state/queries';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddTransaction() {
  // Form fields
  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('$0.00');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [inflow, setInflow] = useState<DropdownOption | undefined>(undefined);
  const externalOption = { label: 'External', value: 'external' };
  const [outflow, setOutflow] = useState<DropdownOption | undefined>(externalOption);
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');

  const { close } = useBottomSheet();
  const { fetchPockets } = usePockets();
  const isValid = transactionTitle && transactionAmount && date && inflow && outflow && inflow.value !== outflow.value;

  const flowOptions = [{ label: 'Pockets', value: '', isHeader: true }];
  flowOptions.push(
    ...(fetchPockets.data || []).map(pocket => ({
      label: pocket.name,
      value: pocket._id,
      isHeader: false,
    })),
  );

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
        <Pressable onPress={() => setDatePickerVisibility(true)} style={[styles.input, styles.datePickerRow]}>
          <Text style={styles.text}>{date.toLocaleDateString()}</Text>
          <AnimatedChevron chevronUp={isDatePickerVisible} />
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          date={date}
          mode="date"
          display="inline"
          onConfirm={newDate => {
            setDate(newDate);
            setDatePickerVisibility(false);
          }}
          onCancel={() => setDatePickerVisibility(false)}
          buttonTextColorIOS={colors.temp.black}
          accentColor={colors.temp.black}
        />

        <Dropdown
          label="Inflow"
          placeholder="Where's the money coming from?"
          options={flowOptions}
          value={inflow}
          setValue={setInflow}
          topOption={externalOption}
        />

        <Dropdown
          label="Outflow"
          placeholder="Where's the money going?"
          options={flowOptions}
          value={outflow}
          setValue={setOutflow}
          topOption={externalOption}
        />

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
    color: colors.temp.black,
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
