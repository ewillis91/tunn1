
import React from "react";
import { View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';

const CreateNewPasswordScreen: React.FC = () => {

// Collect confirmation code and new password
async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
    try {
      const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <View>
        <TextInput
          placeholder="Confirmation code"
          placeholderTextColor={'gray'}
          secureTextEntry/>
        <TextInput  
          placeholder="New password"
          placeholderTextColor={'gray'}
          secureTextEntry/>
    </View>
  )
};

export default CreateNewPasswordScreen;