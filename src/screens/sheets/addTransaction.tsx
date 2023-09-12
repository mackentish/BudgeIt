import { useBottomSheet } from '@gorhom/bottom-sheet';
import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { AnimatedChevron, Button, CurrencyInput, Dropdown, Icon } from '../../components';
import { colors, font, numbers } from '../../constants/globalStyle';
import { TransactionStackParams } from '../../navigation/TransactionNavigator';
import { TransactionContext } from '../../state/context';
import { usePockets } from '../../state/queries';
import { DropdownOption } from '../../types';

type Props = {
  navigation: NavigationProp<TransactionStackParams, 'addTransaction'>;
};

export default function AddTransaction({ navigation }: Props) {
  // Form fields
  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('$0.00');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [inflow, setInflow] = useState<DropdownOption | undefined>(undefined);
  const externalOption = { label: 'External', value: 'external' };
  const [outflow, setOutflow] = useState<DropdownOption | undefined>(externalOption);
  const { transactionTags } = useContext(TransactionContext);
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
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          close();
        }}
        style={styles.closeBtn}>
        <Icon name="x" style={styles.close} />
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

        <Pressable style={styles.tagPressable} onPress={() => navigation.navigate('selectTags')}>
          <View style={styles.tagContainer}>
            <Text style={styles.text}>Select Tags</Text>
            {transactionTags.length > 0 && (
              <Text style={styles.smallText}>
                {transactionTags.length <= 3
                  ? transactionTags.join(', ')
                  : transactionTags.slice(0, 3).join(', ') +
                    (transactionTags.length > 3 && ` +${transactionTags.length - 3} more`)}
              </Text>
            )}
          </View>
          <Icon name="chevron-right" style={styles.chevron} />
        </Pressable>

        <TextInput value={note} onChangeText={setNote} placeholder="Add a note" style={styles.input} />
      </View>
      <View style={styles.flex} />
      <Button
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
  close: {
    fontSize: 18,
    color: colors.temp.black,
  },
  chevron: {
    fontSize: 16,
    color: colors.temp.darkGray,
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
    fontSize: 14,
    fontFamily: font.regular,
  },
  tagPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  tagContainer: {
    flexDirection: 'column',
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  smallText: {
    fontSize: 12,
    fontFamily: font.regular,
    color: colors.temp.darkGray,
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
