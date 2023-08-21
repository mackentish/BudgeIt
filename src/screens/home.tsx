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
          <Button type="tertiary" onPress={() => console.log('TODO: add transaction press')}>
            <Text style={styles.smBtnTxt}>Add Transaction</Text>
            <Icon name="plus" style={styles.icon} />
          </Button>
          <Button type="tertiary" onPress={() => console.log('TODO: use template press')}>
            <Text style={styles.smBtnTxt}>Use Template</Text>
            <Icon name="template" style={styles.icon} />
          </Button>
        </View>
      </View>
      <ScrollView>
        <View style={styles.pocketContainer}>
          <View style={styles.pocketTitleRow}>
            <Text style={styles.pocketTitle}>Pockets</Text>
            <Icon name="dot-3" style={styles.icon} />
          </View>
          {pockets.map(p => (
            <Pocket key={p._id} _id={p._id} name={p.name} amount={p.amount} />
          ))}
          <Button
            label="View All Pockets"
            size="medium"
            type="secondary"
            onPress={() => console.log('TODO: view all pockets press')}
          />
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
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: 30,
    paddingBottom: 10,
    shadowColor: colors.temp.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerDate: {
    fontSize: 30,
    fontFamily: font.bold,
    alignSelf: 'stretch',
  },
  headerButtons: {
    flexDirection: 'row',
    paddingVertical: 15,
    gap: 15,
    alignItems: 'center',
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
  smBtnTxt: {
    fontSize: 12,
    fontFamily: font.regular,
  },
  icon: {
    fontSize: 24,
  },
});
