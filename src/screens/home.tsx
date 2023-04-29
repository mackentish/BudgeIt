/* home screen with header */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import Header from '../components/Header';
import {colors} from '../constants/globalStyle';
import Banner from '../components/Banner';
import Pocket from '../components/Pocket';
import Button from '../components/Button';
import {UserContext} from '../state/context/UserProvider';

export default function Home() {
  const {pockets} = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Header />
      <Banner />
      <ScrollView>
        <View style={styles.content}>
          {pockets.map((d, i) => (
            <Pocket
              key={d._id}
              _id={d._id}
              name={d.name}
              amount={d.amount}
              color={colors.pocketColors[i]}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Transfer Funds" onPress={() => console.log('Press')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    flexDirection: 'column',
    flex: 1,
    gap: 20,
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'flex-end',
  },
});
