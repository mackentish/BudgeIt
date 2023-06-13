import React from 'react';
import { Text, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import AnimatedPressable from './AnimatedPressable';

export default function Button({
  title,
  onPress,
  ...props
}: {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
} & PressableProps) {
  return (
    <AnimatedPressable onPress={onPress} style={[defaultStyles.button, props.style]}>
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </AnimatedPressable>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.tertiary,
    padding: 8,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontFamily: font.bold,
    textAlign: 'center',
  },
});
