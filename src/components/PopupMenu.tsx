import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { colors, font, numbers } from '../constants/globalStyle';
import { OverlayContext } from '../state/context';
const Icon = createIconSetFromFontello(fontelloConfig);

export default function PopupMenu() {
  const { setShowOverlay } = useContext(OverlayContext);

  return (
    <Menu onClose={() => setShowOverlay(false)} onOpen={() => setShowOverlay(true)}>
      <MenuTrigger>
        <Icon name="dot-3" style={styles.icon} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: colors.temp.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: numbers.borderRadius.medium,
          },
          optionWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}>
        <MenuOption onSelect={() => console.log('TODO: new pocket press')}>
          <Text style={styles.text}>New Pocket</Text>
          <Icon name="plus" style={styles.icon} />
        </MenuOption>
        <View style={styles.divider} />
        <MenuOption onSelect={() => console.log('TODO: new group press')}>
          <Text style={styles.text}>New Group</Text>
          <Icon name="group" style={styles.icon} />
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: font.regular,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.temp.gray,
  },
  icon: { fontSize: 24 },
});
