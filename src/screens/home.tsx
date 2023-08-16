import { View, StyleSheet, ScrollView, Text } from 'react-native';
import React, { useContext } from 'react';
import { colors, font } from '../constants/globalStyle';
import Pocket from '../components/Pocket';
import { UserContext } from '../state/context/UserProvider';
import { usePockets } from '../state/queries';
import { Button, LoadingSpinner } from '../components';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
const Icon = createIconSetFromFontello(fontelloConfig);

export default function Home() {
  const { user } = useContext(UserContext);
  const { fetchPockets } = usePockets(user._id);
  const pockets = fetchPockets.data || [];

  if (fetchPockets.isError) return <Text>Error loading pockets</Text>;

  if (fetchPockets.isLoading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerDate}>
          {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Text>
        <View style={styles.headerButtons}>
          <Button title="Add Transaction" onPress={() => console.log('TODO: add transaction press')} />
          <Button title="Use Template" onPress={() => console.log('TODO: use template press')} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.pocketContainer}>
          <View style={styles.pocketTitleRow}>
            <Text style={styles.pocketTitle}>Pockets</Text>
            <Icon name="ellipsis" style={styles.icon} />
          </View>
          {pockets.map(p => (
            <Pocket key={p._id} _id={p._id} name={p.name} amount={p.amount} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.temp.gray,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: colors.temp.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 30,
    shadowColor: colors.temp.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerDate: {
    fontSize: 30,
    fontFamily: font.bold,
  },
  headerButtons: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 15,
    alignSelf: 'stretch',
  },
  pocketContainer: {
    marginTop: 15,
    padding: 20,
    flexDirection: 'column',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
  },
  pocketTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pocketTitle: {
    fontFamily: font.bold,
    fontSize: 22,
  },
  icon: {
    fontSize: 4,
  },
});
