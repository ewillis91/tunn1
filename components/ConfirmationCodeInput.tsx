import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface ConfirmCodeInputProps {
  onConfirm: (code: string) => void;
  onResend: () => void;
  placeholder?: string;
  style?: any;
}

const ConfirmCodeInput: React.FC<ConfirmCodeInputProps> = ({
  onConfirm,
  onResend,
  placeholder = 'Confirmation Code',
  style,
}) => {
  const [code, setCode] = useState('');

  const handleCodeChange = (text: string) => {
    setCode(text);
  };

  const handleConfirm = () => {
    onConfirm(code);
  };

  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Confirm" onPress={handleConfirm} />
      <Button title="Resend Code" onPress={onResend} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default ConfirmCodeInput;
