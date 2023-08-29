import React, { useRef } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, LoadingSpinner, Pocket, PocketGroup, PopupMenu, Sheet } from '../components';
import { colors, font } from '../constants/globalStyle';
import { usePockets, useGroups } from '../state/queries';
import BottomSheet from '@gorhom/bottom-sheet';
import { AddPocket, AddGroup } from './sheets';

function Divider() {
  return (
    <View style={dividerStyles.container}>
      <Text style={dividerStyles.text}>items above this line are shown on your home screen</Text>
      <View style={dividerStyles.divider} />
    </View>
  );
}

export default function AllPockets({ navigation }: { navigation: any }) {
  const { fetchPockets } = usePockets();
  const { fetchGroups } = useGroups();
  const pockets = (fetchPockets.data || []).filter(p => !p.groupId);
  const groups = fetchGroups.data || [];
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
        <View style={styles.pocketTitleRow}>
          <View style={styles.title}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" style={styles.icon} />
            </Pressable>
            <Text style={styles.pocketTitle}>Pockets</Text>
          </View>
          <PopupMenu options={pocketMenuOptions} />
        </View>
        <ScrollView>
          <View style={styles.pocketContainer}>
            {groups.map((g, i) => (
              <>
                <PocketGroup key={g._id} {...g} />
                {i === 5 && <Divider />}
              </>
            ))}
            {pockets.map((p, i) => (
              <>
                <Pocket key={p._id} _id={p._id} name={p.name} amount={p.amount} />
                {i === 5 - groups.length && <Divider />}
              </>
            ))}
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
    backgroundColor: colors.temp.gray,
  },
  container: {
    flex: 1,
    backgroundColor: colors.temp.gray,
  },
  icon: {
    fontSize: 14,
    color: colors.temp.black,
  },
  pocketContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    padding: 20,
  },
  pocketTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pocketTitle: {
    fontFamily: font.bold,
    fontSize: 22,
  },
});

const dividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  text: {
    fontFamily: font.regular,
    fontSize: 12,
    color: colors.temp.black,
  },
  divider: {
    height: 5,
    backgroundColor: colors.temp.midGray,
    borderRadius: 5,
  },
});
