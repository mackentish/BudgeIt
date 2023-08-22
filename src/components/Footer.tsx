import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, font } from '../constants/globalStyle';
import { Icon } from '../components';

const getIcon = (name: string, isFocused: boolean) => {
  let iconName = 'home';
  let tabName = 'Home';
  switch (name) {
    case 'home':
      iconName = 'home';
      tabName = 'Home';
      break;
    case 'templates':
      iconName = 'template';
      tabName = 'Templates';
      break;
    case 'summary':
      iconName = 'summary';
      tabName = 'Summary';
      break;
    case 'profile':
      iconName = 'user';
      tabName = 'Profile';
      break;
  }
  return (
    <View style={styles.iconContainer}>
      <Icon name={iconName} style={[styles.icon, isFocused && styles.focused]} />
      <Text style={[styles.iconText, isFocused && styles.focused]}>{tabName}</Text>
    </View>
  );
};

export default function Footer({ state, descriptors, navigation }: { state: any; descriptors: any; navigation: any }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: { key: string | number; name: any }, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}>
            {getIcon(label, isFocused)}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 0,
    backgroundColor: colors.temp.white,
  },
  icon: {
    color: colors.temp.gray,
    fontSize: 30,
  },
  iconText: {
    color: colors.temp.gray,
    fontFamily: font.regular,
    fontSize: 14,
    fontWeight: '600',
  },
  iconContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focused: {
    color: colors.temp.black,
  },
});
