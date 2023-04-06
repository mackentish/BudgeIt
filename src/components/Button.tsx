import React from 'react';
import {
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '../constants/colors';
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
    <AnimatedPressable
      onPress={onPress}
      style={[defaultStyles.button, props.style]}>
      <Text style={defaultStyles.buttonText}>{title}</Text>
    </AnimatedPressable>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    padding: 20,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
