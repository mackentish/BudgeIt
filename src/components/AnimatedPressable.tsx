import {useRef} from 'react';
import {Animated, Pressable, View, StyleSheet} from 'react-native';
import React from 'react';

const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

const AnimatedPressable = (props: any) => {
  const widthAnim = useRef(new Animated.Value(100)).current; // Initial value for width multiplier

  const growAnimation = Animated.spring(widthAnim, {
    toValue: 100,
    useNativeDriver: false,
  });

  const shrinkAnimation = Animated.spring(widthAnim, {
    toValue: 95,
    useNativeDriver: false,
  });
  return (
    <View style={styles.wrapper}>
      <AnimatedPressableWrapper
        {...props}
        style={[
          props.style,
          {
            width: widthAnim.interpolate({
              inputRange: [95, 100],
              outputRange: ['95%', '100%'],
            }),
          },
        ]}
        onPressIn={() => {
          shrinkAnimation.start();
          props.onPressIn && props.onPressIn();
        }}
        onPressOut={() => {
          growAnimation.start();
          props.onPressOut && props.onPressOut();
        }}>
        {props.children}
      </AnimatedPressableWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
});

export default AnimatedPressable;
