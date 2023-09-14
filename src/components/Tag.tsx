import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '.';
import { colors, font, numbers } from '../constants/globalStyle';

function Selected({ tagName, onPress }: { tagName: string; onPress: () => void }) {
  return (
    <Pressable style={styles.tag} onPress={onPress}>
      <Text style={styles.tagName}>{tagName}</Text>
      <Icon name="x" style={styles.x} />
    </Pressable>
  );
}

function Available({ tagName, onPress }: { tagName: string; onPress: () => void }) {
  return (
    <Pressable style={styles.tag} onPress={onPress}>
      <Text style={styles.tagName}>{tagName}</Text>
      <Icon name="plus" style={styles.plus} />
    </Pressable>
  );
}

function Add({
  isCreating,
  createFn,
  cancelFn,
  onPress,
}: {
  isCreating: boolean;
  createFn: (tag: string) => void;
  cancelFn: () => void;
  onPress: () => void;
}) {
  const [newTagName, setNewTagName] = useState<string>('');

  if (isCreating) {
    return (
      <View style={styles.createTag}>
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
          <Pressable
            onPress={() => {
              createFn(newTagName);
              setNewTagName('');
            }}>
            <Icon name="check" style={styles.check} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              cancelFn();
              setNewTagName('');
            }}>
            <Icon name="x" style={styles.xBlack} />
          </Pressable>
        )}
      </View>
    );
  }
  return (
    <Pressable style={styles.createTag} onPress={onPress}>
      <Text style={styles.createTagText}>New Tag</Text>
      <Icon name="edit" style={styles.edit} />
    </Pressable>
  );
}

export default { Selected, Available, Add };

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.temp.black,
    borderStyle: 'dashed',
    borderRadius: numbers.borderRadius.small,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  createTagText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  x: {
    fontSize: 12,
    color: colors.temp.white,
  },
  xBlack: {
    fontSize: 14,
    color: colors.temp.black,
  },
  plus: {
    fontSize: 16,
    color: colors.temp.white,
  },
  edit: {
    fontSize: 16,
    color: colors.temp.black,
  },
  check: {
    fontSize: 14,
    color: colors.temp.black,
  },
});
