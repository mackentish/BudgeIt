import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button, Icon } from '../../components';
import { colors, font, numbers } from '../../constants/globalStyle';
import { TransactionStackParams } from '../../navigation/TransactionNavigator';

export default function SelectTags({ navigation }: StackScreenProps<TransactionStackParams, 'selectTags'>) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" style={styles.chevron} />
      </Pressable>

      <Text style={styles.header}>Tags</Text>

      <View style={styles.tagGroup}>
        <Text style={styles.label}>Selected Tags</Text>
        <View style={styles.tagContainer}>
          <Text>TODO: selected tags go here</Text>
        </View>
      </View>

      <View style={styles.tagGroup}>
        <Text style={styles.label}>Available Tags</Text>
        <View style={styles.tagContainer}>
          <Text>TODO: available tags go here</Text>
        </View>
      </View>

      <View style={styles.flex} />
      <Button
        label="Save Tags"
        onPress={() => {
          Alert.alert('TODO: save tags & update transaction');
          navigation.goBack();
        }}
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
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  chevron: {
    fontSize: 22,
    color: colors.temp.black,
  },
  flex: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontFamily: font.bold,
    alignSelf: 'center',
  },
  tagGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: font.bold,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 10,
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
  },
});
