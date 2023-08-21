import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { currencyFormatter } from '../utils';
import AnimatedPressable from './AnimatedPressable';
import { colors, numbers, font } from '../constants/globalStyle';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export default function Pocket({ _id, name, amount }: { _id: string; name: string; amount: number }) {
  /*
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
  */

  return (
    <AnimatedPressable onPress={() => /*setIsOpen(true)*/ console.log('pressed')}>
      <View style={styles.pocket}>
        <View style={styles.pocketRow}>
          <View style={styles.pocketInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.amount, amount < 0 && styles.negativeAmount]}>{currencyFormatter.format(amount)}</Text>
          </View>
          <Icon name="dot-3" style={styles.icon} />
        </View>
        {/*isOpen && (
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
        )*/}
      </View>
    </AnimatedPressable>
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
  /*
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
  */
});
