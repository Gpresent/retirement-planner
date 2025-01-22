import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';

const DateInput = ({
  value = '',
  onChange,
}: {
  value: string;
  onChange: (date: string) => void;
}) => {
  const [date, setDate] = useState(value);

  const handleInputChange = (text: string) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');

    // Format as MM/DD/YYYY
    let formatted = '';
    if (numericText.length <= 2) {
      formatted = numericText;
    } else if (numericText.length <= 4) {
      formatted = `${numericText.slice(0, 2)}/${numericText.slice(2)}`;
    } else {
      formatted = `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4, 8)}`;
    }

    setDate(formatted);
    onChange(formatted);
  };

  const getDisplayValue = () => {
    const parts = date.split('/');
    const placeholders = ['--', '--', '----'];
    return placeholders
      .map((placeholder, index) => parts[index]?.padEnd(placeholder.length, placeholder) || placeholder)
      .join('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>{getDisplayValue()}</Text>
        <TextInput
          style={[styles.input, styles.transparentInput]}
          value={date}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#AEC7C3',
    alignItems: 'center',
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  inputContainer: {
    position: 'relative',
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 40, // Add fixed height
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#000',
    pointerEvents: 'none', // Ensure placeholder doesn't interfere with input
    fontFamily: Platform.select({
        android: 'monospace',
        default: 'monospace',
      }),
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'transparent',
    padding: 0, // Remove default padding
    fontFamily: Platform.select({
        android: 'monospace',
        default: 'monospace',
      }),
  },
  transparentInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1, // Ensure input is above placeholder
  },
});

export default DateInput;