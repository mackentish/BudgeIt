import { Text, StyleSheet, View, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { currencyFormatter } from '../utils';
import AnimatedPressable from './AnimatedPressable';
import { colors, font } from '../constants/globalStyle';
import { usePockets } from '../state/queries';
import { UserContext } from '../state/context/UserProvider';

export default function Pocket({ _id, name, amount }: { _id: string; name: string; amount: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [changeAmount, setChangeAmount] = useState(amount);
  const { user } = useContext(UserContext);
  const { updatePocket } = usePockets(user._id);

  const onInputChange = (text: string) => {
    setChangeAmount(Number(text));
  };

  const changePocketAmount = () => {
    // update pocket data using updatePocket query
    updatePocket.mutate(
      {
        _id,
        name,
        amount: changeAmount,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  const openClosePocket = () => {
    // if closing pocket, reset changeAmount to amount
    if (isOpen) {
      setChangeAmount(amount);
    }
    setIsOpen(!isOpen);
  };

  return (
    <AnimatedPressable onPress={() => setIsOpen(true)}>
      <View style={styles.pocket}>
        <View style={styles.pocketRow}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={[styles.text, styles.amount]}>{currencyFormatter.format(amount)}</Text>
        </View>
        {isOpen && (
          <View style={styles.updateForm}>
            <View style={styles.pocketRow}>
              <Text style={styles.title}>Change Pocket Amount:</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                value={changeAmount.toString()}
                onChangeText={onInputChange}
              />
            </View>
            <View style={styles.buttonContainer}>
              <AnimatedPressable onPress={openClosePocket} style={styles.button}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </AnimatedPressable>
              <AnimatedPressable onPress={changePocketAmount} style={styles.button}>
                <Text style={[styles.buttonText, styles.submitButtonText]}>Done</Text>
              </AnimatedPressable>
            </View>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pocket: {
    flexDirection: 'column',
    gap: 8,
    backgroundColor: colors.temp.gray,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
  },
  pocketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.temp.black,
    fontSize: 15,
  },
  name: {
    fontFamily: font.italic,
  },
  amount: {
    fontFamily: font.bold,
  },
  updateForm: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 10,
  },
  amountInput: {
    backgroundColor: colors.temp.white,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontFamily: font.bold,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: colors.temp.black,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontFamily: font.bold,
  },
  submitButtonText: {
    color: 'green',
  },
  cancelButtonText: {
    color: 'red',
  },
});
