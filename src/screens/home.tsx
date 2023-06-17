/* home screen with header */
import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { colors } from '../constants/globalStyle';
import Banner from '../components/Banner';
import Pocket from '../components/Pocket';
import { UserContext } from '../state/context/UserProvider';
import { usePockets } from '../state/queries';

export default function Home() {
  const { user } = useContext(UserContext);
  const { fetchPockets } = usePockets(user._id);
  const pockets = fetchPockets.data || [];

  return (
    <View style={styles.container}>
      <Banner />
      <ScrollView>
        <View style={styles.content}>
          {pockets.map((d, i) => (
            <Pocket key={d._id} _id={d._id} name={d.name} amount={d.amount} color={colors.pocketColors[i]} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    flex: 1,
    gap: 20,
  },
});
