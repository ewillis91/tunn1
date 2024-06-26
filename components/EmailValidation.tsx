import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface EmailValidationProps {
  email: string;
  onEmailChange: (email: string) => void;
  setIsEmailValid: (isValid: boolean) => void;
  placeholder: string;
  placeholderTextColor: string;
}

const EmailValidation: React.FC<EmailValidationProps> = ({email, onEmailChange, setIsEmailValid, placeholder
}) => {
  const handleEmailChange = (text: string) => {
    onEmailChange(text);
    // Use a regular expression to validate the email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailPattern.test(text);
    setIsEmailValid(isValid);
  };
  
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        onChangeText={handleEmailChange}
        value={email}
        style={styles.input}     
      />
      {!setIsEmailValid && (
        <Text style={styles.errorTextEmail}>Please enter a valid email address</Text>
      )}
    </View>
  )};

 const styles = StyleSheet.create({
  input: {
    top: -30,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
  },
  errorTextEmail: {
    color: '#FF00E8',
    fontSize: 12,
    right: -10,
    top: 20
  },
 })

export default EmailValidation;
