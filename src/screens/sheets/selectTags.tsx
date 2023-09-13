import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button, Icon } from '../../components';
import { colors, font, numbers } from '../../constants/globalStyle';
import { TransactionStackParams } from '../../navigation/TransactionNavigator';
import { TransactionContext } from '../../state/context';

type Props = {
  navigation: NavigationProp<TransactionStackParams, 'selectTags'>;
};

export default function SelectTags({ navigation }: Props) {
  const { transactionTags, setTransactionTags } = useContext(TransactionContext);
  // TODO: get this from the database (where to store it? On the user? Or as it's own collection?)
  const mockTags = ['Katie', 'Food', 'Groceries', 'Target'];
  const [availableTags, setAvailableTags] = useState<string[]>(mockTags.filter(tag => !transactionTags.includes(tag)));
  const [tempTags, setTempTags] = useState<string[]>(transactionTags);
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');

  function createTag() {
    // check if there is already a tag with this name
    if ([...availableTags, ...tempTags].find(tag => tag.toLowerCase() === newTagName.toLowerCase())) {
      Alert.alert('Tag already exists');
      return;
    } else {
      Alert.alert('TODO: create tag in database');
      setTempTags([...tempTags, newTagName]);
    }
    setIsCreating(false);
    setNewTagName('');
  }

  function cancelCreate() {
    setIsCreating(false);
    setNewTagName('');
  }

  function saveTags() {
    setTransactionTags(tempTags);
    navigation.navigate('addTransaction');
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" style={styles.chevron} />
      </Pressable>

      <Text style={styles.header}>Tags</Text>

      <View style={styles.tagGroup}>
        <Text style={styles.label}>Selected Tags</Text>
        <View style={styles.tagContainer}>
          {tempTags.map(tag => (
            <Pressable
              key={tag}
              style={styles.tag}
              onPress={() => {
                setTempTags(tempTags.filter(t => t !== tag));
                setAvailableTags([...availableTags, tag]);
              }}>
              <Text style={styles.tagName}>{tag}</Text>
              <Icon name="x" style={styles.x} />
            </Pressable>
          ))}
          {isCreating ? (
            <View style={[styles.tag, styles.createTag]}>
              <TextInput
                style={styles.createTagText}
                placeholder="Enter Name"
                value={newTagName}
                onChangeText={setNewTagName}
                autoFocus
                autoCorrect={false}
                spellCheck={false}
              />
              {newTagName ? (
                <Pressable onPress={createTag}>
                  <Icon name="check" style={styles.check} />
                </Pressable>
              ) : (
                <Pressable onPress={cancelCreate}>
                  <Icon name="x" style={styles.xBlack} />
                </Pressable>
              )}
            </View>
          ) : (
            <Pressable style={[styles.tag, styles.createTag]} onPress={() => setIsCreating(true)}>
              <Text style={styles.createTagText}>New Tag</Text>
              <Icon name="edit" style={styles.edit} />
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.tagGroup}>
        <Text style={styles.label}>Available Tags</Text>
        <View style={styles.tagContainer}>
          {availableTags.length ? (
            availableTags.map(tag => (
              <Pressable
                key={tag}
                style={styles.tag}
                onPress={() => {
                  setAvailableTags(availableTags.filter(t => t !== tag));
                  setTempTags([...tempTags, tag]);
                }}>
                <Text style={styles.tagName}>{tag}</Text>
                <Icon name="plus" style={styles.plus} />
              </Pressable>
            ))
          ) : (
            <Text style={styles.noTagsText}>No available tags, create one to add it to your transaction.</Text>
          )}
        </View>
      </View>

      <View style={styles.flex} />
      <Button label="Save Tags" onPress={saveTags} />
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
  plus: {
    fontSize: 16,
    color: colors.temp.white,
  },
  x: {
    fontSize: 12,
    color: colors.temp.white,
  },
  xBlack: {
    fontSize: 14,
    color: colors.temp.black,
  },
  edit: {
    fontSize: 16,
    color: colors.temp.black,
  },
  check: {
    fontSize: 14,
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
  tag: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.temp.black,
    borderWidth: 1,
    borderColor: colors.temp.black,
    borderRadius: numbers.borderRadius.small,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagName: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: colors.temp.white,
  },
  createTag: {
    backgroundColor: 'transparent',
    borderColor: colors.temp.black,
    borderStyle: 'dashed',
  },
  createTagText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  noTagsText: {
    fontSize: 14,
    fontFamily: font.italic,
    color: colors.temp.darkGray,
  },
});
