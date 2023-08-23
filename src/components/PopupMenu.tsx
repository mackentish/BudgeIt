import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { colors, font, numbers } from '../constants/globalStyle';
import { OverlayContext } from '../state/context';
import { Icon } from '../components';

interface Option {
  label: string;
  icon: string;
  action: () => void;
}

export default function PopupMenu({ options }: { options: Option[] }) {
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
        {options.map((o, i) => (
          <View key={i}>
            <MenuOption onSelect={o.action}>
              <Text style={styles.text}>{o.label}</Text>
              <Icon name={o.icon} style={styles.icon} />
            </MenuOption>
            {i < options.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
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
