import { useRef } from 'react';
import { Animated, Pressable, PressableProps, RegisteredStyle, ViewStyle } from 'react-native';
import React from 'react';

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable = (props: PressableProps) => {
  const widthAnim = useRef(new Animated.Value(100)).current; // Initial value for width multiplier

  const growAnimation = Animated.spring(widthAnim, {
    toValue: 100,
    useNativeDriver: false,
  });

  const shrinkAnimation = Animated.spring(widthAnim, {
    toValue: 98,
    useNativeDriver: false,
  });
  return (
    <AnimatedPressableWrapper
      style={[
        props.style as RegisteredStyle<ViewStyle>,
        {
          transform: [
            {
              scaleX: widthAnim.interpolate({
                inputRange: [98, 100],
                outputRange: [0.98, 1],
              }),
            },
            {
              scaleY: widthAnim.interpolate({
                inputRange: [98, 100],
                outputRange: [0.98, 1],
              }),
            },
          ],
        },
      ]}
      onPress={props.onPress}
      onPressIn={e => {
        shrinkAnimation.start();
        props.onPressIn && props.onPressIn(e);
      }}
      onPressOut={e => {
        growAnimation.start();
        props.onPressOut && props.onPressOut(e);
      }}>
      {props.children}
    </AnimatedPressableWrapper>
  );
};

export default AnimatedPressable;
