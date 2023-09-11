import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Icon } from '.';
import { colors, font, numbers } from '../constants/globalStyle';

export default function TagSelector({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}) {
  function filterTags(searchText: string) {
    setTags(tags.filter(tag => tag.toLowerCase().includes(searchText.toLowerCase())));
  }

  function removeTag(tag: string) {
    setTags(tags.filter(t => t !== tag));
  }

  return (
    <View style={styles.selectedContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {tags.map((t, i) => (
          <Pressable key={i} style={styles.tag} onPress={() => removeTag(t)}>
            <Text style={styles.tagText}>{t}</Text>
            <Icon name="x" style={styles.deleteIcon} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
    paddingVertical: 10,
  },
  scroll: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  tag: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.temp.black,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: numbers.borderRadius.small,
  },
  tagText: {
    color: colors.temp.white,
    fontSize: 14,
    fontFamily: font.semiBold,
  },
  deleteIcon: {
    fontSize: 10,
    color: colors.temp.white,
  },
});
