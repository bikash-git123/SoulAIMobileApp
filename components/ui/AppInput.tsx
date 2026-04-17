import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Typography } from '@/constants/Typography';

export interface AppInputProps extends TextInputProps {
  iconName?: keyof typeof Feather.glyphMap;
  rightIcon?: React.ReactNode;
}

export const AppInput = ({ iconName, rightIcon, style, ...props }: AppInputProps) => {
  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <Feather name={iconName} size={20} color="#555555" style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="#8A8A8E"
        {...props}
      />
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 0, // Using fixed height instead of vertical padding to ensure centering
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 8,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
    color: '#333333',
    height: '100%',
  },
  rightIcon: {
    marginLeft: 10,
  }
});
