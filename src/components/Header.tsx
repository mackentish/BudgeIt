/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors, font} from '../constants/globalStyle';
import {UserContext} from '../state/context/UserProvider';

const MenuItem = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.menuItem}>{text}</Text>
    </Pressable>
  );
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user, signOut} = useContext(UserContext);
  const [menuHeight, setMenuHeight] = useState(0);

  return (
    <View style={{zIndex: 1}}>
      <View
        style={styles.header}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setMenuHeight(height);
        }}>
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
          {top: menuHeight},
          menuOpen ? styles.menuOpen : styles.menuClosed,
        ]}>
        <MenuItem text="Add Funds" onPress={() => setMenuOpen(false)} />
        <Pressable
          onPress={() => {
            setMenuOpen(false);
            signOut();
          }}>
          <Text style={[styles.menuItem, styles.signOut]}>Sign Out</Text>
        </Pressable>
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
    gap: 8,
    position: 'absolute',
    left: 0,
    borderBottomRightRadius: 10,
    backgroundColor: colors.primary,
    padding: 24,
    zIndex: 20,
  },
  menuClosed: {
    display: 'none',
  },
  menuItem: {
    width: '100%',
    color: colors.white,
    fontFamily: font.semiBold,
  },
  signOut: {
    color: colors.red,
  },
});
