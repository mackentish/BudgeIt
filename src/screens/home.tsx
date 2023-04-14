/* home screen with header */
import {View, StyleSheet} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {colors} from '../constants/globalStyle';
import Banner from '../components/Banner';
import data from '../constants/data';
import Pocket from '../components/Pocket';
import Button from '../components/Button';

export default function Home() {
  const total = data.pockets.reduce((acc, d) => acc + d.amount, 0);
  return (
    <View style={styles.container}>
      <Header />
      <Banner total={total} />
      <View style={styles.content}>
        {data.pockets.map(d => (
          <Pocket key={d.id} name={d.name} amount={d.amount} />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Transfer Funds" onPress={() => console.log('Press')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.gray,
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
