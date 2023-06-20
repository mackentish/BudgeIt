import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../constants/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const getIcon = (name: string) => {
  switch (name) {
    case 'home':
      return <Icon name="home" style={styles.icon} />;
    case 'userSettings':
      return <Icon name="user" style={styles.icon} />;
    case 'reports':
      return <Icon name="bar-chart" style={styles.icon} />;
    case 'projections':
      return <Icon name="signal" style={styles.icon} />;
    default:
      return <Icon name="home" style={styles.icon} />;
  }
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
            onLongPress={onLongPress}
            style={[styles.iconPressable, isFocused && styles.focused]}>
            {getIcon(label)}
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
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  icon: {
    color: colors.secondary,
    fontSize: 30,
  },
  iconPressable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: '15%',
  },
  focused: {
    backgroundColor: colors.tertiary,
  },
});
