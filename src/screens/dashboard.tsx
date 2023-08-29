import { View, StyleSheet, ScrollView, Text, SafeAreaView, Alert } from 'react-native';
import React, { useRef } from 'react';
import { colors, font } from '../constants/globalStyle';
import { useGroups, usePockets } from '../state/queries';
import { Icon, Button, LoadingSpinner, Pocket, PocketGroup, PopupMenu, Sheet } from '../components';
import { AddGroup, AddPocket } from './sheets';
import BottomSheet from '@gorhom/bottom-sheet';
import { DashboardStacks } from '../constants/navigation';

export default function Dashboard({ navigation }: { navigation: any }) {
  const { fetchGroups } = useGroups();
  const { fetchPockets } = usePockets();
  const groups = fetchGroups.data || [];
  // only show 6 items on the dashboard, counting groups and pockets
  const pockets = (fetchPockets.data || []).filter(p => !p.groupId).splice(0, 6 - groups.length);
  const isLoading = fetchPockets.isLoading || fetchGroups.isLoading;
  // BottomSheets
  const addPocketSheet = useRef<BottomSheet>(null);
  const addGroupSheet = useRef<BottomSheet>(null);

  if (fetchPockets.isError || fetchGroups.isError) {
    return (
      <SafeAreaView style={styles.safeView}>
        <Text>Error loading pockets or groups</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeView}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  const pocketMenuOptions = [
    {
      label: 'New Pocket',
      icon: 'plus',
      action: () => addPocketSheet.current?.expand(),
    },
    {
      label: 'New Group',
      icon: 'group',
      action: () => addGroupSheet.current?.expand(),
    },
  ];

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerDate}>
            {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
          <View style={styles.headerButtons}>
            <Button type="tertiary" onPress={() => Alert.alert('TODO: add transaction press')}>
              <Text style={styles.smBtnTxt}>Add Transaction</Text>
              <Icon name="plus" style={styles.icon} />
            </Button>
            <Button type="tertiary" onPress={() => Alert.alert('TODO: use template press')}>
              <Text style={styles.smBtnTxt}>Use Template</Text>
              <Icon name="template" style={styles.icon} />
            </Button>
          </View>
        </View>
        <ScrollView>
          <View style={styles.pocketContainer}>
            <View style={styles.pocketTitleRow}>
              <Text style={styles.pocketTitle}>Pockets</Text>
              <PopupMenu options={pocketMenuOptions} />
            </View>
            {groups.map(g => (
              <PocketGroup key={g._id} {...g} />
            ))}
            {pockets.map(p => (
              <Pocket key={p._id} {...p} />
            ))}
            <Button
              label="View All Pockets"
              size="medium"
              type="secondary"
              onPress={() => navigation.navigate(DashboardStacks.ALL_POCKETS)}
            />
          </View>
        </ScrollView>
        <Sheet bottomSheetRef={addPocketSheet}>
          <AddPocket />
        </Sheet>
        <Sheet bottomSheetRef={addGroupSheet}>
          <AddGroup pockets={pockets} />
        </Sheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.temp.white,
  },
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