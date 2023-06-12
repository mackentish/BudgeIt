/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {colors, font} from '../constants/globalStyle';
import {UserContext} from '../state/context/UserProvider';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useContext(UserContext);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<View | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measure((x, y, width, height) => {
        setHeaderHeight(height);
      });
    }
  }, []);

  return (
    <View style={{zIndex: 1}}>
      <View ref={headerRef} style={styles.header}>
        {!!user && (
          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuOpen(!menuOpen)}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </Pressable>
        )}
        <Text style={styles.headerText}>budge-it</Text>
      </View>
      <View
        style={[
          {top: headerHeight},
          menuOpen ? styles.menuOpen : styles.menuClosed,
        ]}>
        <Text style={styles.menuItem}>Menu</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.26,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: font.bold,
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 10,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 30,
    height: 3,
    backgroundColor: colors.white,
  },
  menuOpen: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 8,
    zIndex: 20,
  },
  menuClosed: {
    display: 'none',
  },
  menuItem: {
    padding: 10,
    color: colors.white,
    fontFamily: font.semiBold,
  },
});
