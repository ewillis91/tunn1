import React, { useState } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';

interface PasswordValidationProps {
  onPasswordChange: (password: string, isValid: boolean) => void;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  onPasswordChange,
}) => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validatePassword = (text: string) => {
    const isValidPassword = text.length >= 8; // Example: Minimum length of 8 characters
    setPassword(text);
    onPasswordChange(text, isValidPassword); // Notify the parent component of the password and its validity
  };

  return (
    <React.Fragment>
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={validatePassword}
        style={styles.input}
      />
      {!isValid && (
        <Text style={{ color: 'red' }}>Password must be at least 8 characters long.</Text>
      )}
    </React.Fragment>
)};

const styles = StyleSheet.create({
  input: {
    top: -50,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white'
  },
})

export default PasswordValidation;
