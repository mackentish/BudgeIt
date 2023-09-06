import React, { useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { font, colors, numbers } from '../constants/globalStyle';
import Icon from './Icon';
import { Portal } from '@gorhom/portal';

interface Option {
  label: string;
  value: string;
  isHeader?: boolean;
}

export default function Dropdown({
  label,
  placeholder,
  options,
}: {
  label: string;
  placeholder: string;
  options: Option[];
}) {
  const [value, setValue] = useState<Option | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<View>(null);
  const [measure, setMeasure] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOpen]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setMeasure({ x, y, width, height });
      });
    }
  }, [measure]);

  function isSelected(option: Option) {
    return value?.value === option.value;
  }

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <Pressable ref={inputRef} onPress={() => setIsOpen(!isOpen)} style={[styles.input, isOpen && styles.open]}>
        <Text style={value ? styles.text : styles.placeholder}>{value?.label || placeholder}</Text>
        <Icon name={`chevron-${isOpen ? 'up' : 'down'}`} style={styles.icon} />
      </Pressable>
      {isOpen && (
        <Portal>
          <View
            style={[
              styles.options,
              {
                top: measure.y + measure.height + 8,
                left: measure.x,
                width: measure.width,
              },
            ]}>
            {options.map((option, i) => {
              return option.isHeader ? (
                <View key={i} style={styles.header}>
                  <Text style={styles.headerText}>{option.label}</Text>
                </View>
              ) : (
                <Pressable
                  key={i}
                  onPress={() => {
                    if (isSelected(option)) setValue(undefined);
                    else setValue(option);
                    setIsOpen(false);
                  }}
                  style={[styles.selectable, isSelected(option) && styles.selected]}>
                  <Text style={styles.selectableText}>{option.label}</Text>
                  {isSelected(option) && <Icon name="check" style={styles.checkIcon} />}
                </Pressable>
              );
            })}
          </View>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontFamily: font.regular,
    color: colors.temp.darkGray,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.temp.white,
    borderWidth: 1,
    borderColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  open: {
    borderColor: colors.temp.darkGray,
  },
  text: {
    fontSize: 14,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  placeholder: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.temp.midGray,
  },
  icon: {
    fontSize: 10,
    color: colors.temp.darkGray,
  },
  checkIcon: {
    fontSize: 14,
    color: colors.temp.midGray,
  },
  options: {
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: colors.temp.white,
    borderRadius: numbers.borderRadius.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  headerText: {
    fontSize: 14,
    fontFamily: font.semiBold,
    color: colors.temp.black,
  },
  selectable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 24,
    paddingRight: 14,
  },
  selected: {
    backgroundColor: colors.temp.lightGray,
  },
  selectableText: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.temp.black,
  },
});
