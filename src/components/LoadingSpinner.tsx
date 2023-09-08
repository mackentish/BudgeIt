import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '../constants/globalStyle';

export default function LoadingSpinner() {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
  },
});
