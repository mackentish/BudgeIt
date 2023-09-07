import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ScrollView, LayoutAnimation, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { font, colors, numbers } from '../constants/globalStyle';
import Icon from './Icon';
import { Portal } from '@gorhom/portal';
import { DropdownOption } from '../types';

export default function Dropdown({
  label,
  placeholder,
  options,
  value,
  setValue,
  topOption,
}: {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: DropdownOption | undefined;
  setValue: Dispatch<SetStateAction<DropdownOption | undefined>>;
  topOption?: DropdownOption;
}) {
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

  function isSelected(option: DropdownOption) {
    return value?.value === option.value;
  }

  /**
   * Determines whether or not we have the screen real estate to render the dropdown below the input
   * in it's entirety. If not, we render it above the input.
   */
  function canRenderBelow() {
    return measure.y + measure.height + 8 + 220 < Dimensions.get('window').height - 144;
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
              canRenderBelow()
                ? {
                    top: measure.y + measure.height + 8,
                  }
                : {
                    bottom: Dimensions.get('window').height - measure.y + 8,
                  },
              {
                left: measure.x,
                width: measure.width,
              },
            ]}>
            <ScrollView style={styles.scroll}>
              {topOption && (
                <Pressable
                  onPress={() => {
                    if (isSelected(topOption)) setValue(undefined);
                    else setValue(topOption);
                    setIsOpen(false);
                  }}
                  style={[styles.topOption, isSelected(topOption) && styles.selected]}>
                  <Text style={styles.selectableText}>{topOption.label}</Text>
                  {isSelected(topOption) && <Icon name="check" style={styles.checkIcon} />}
                </Pressable>
              )}
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
            </ScrollView>
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
    overflow: 'hidden',
  },
  scroll: {
    maxHeight: 220,
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
  topOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 3,
    borderBottomColor: colors.temp.midGray,
  },
});
