
import React, {useState} from "react";
import { View, Button, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  email: string;
};

const CreateNewPasswordScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const route = useRoute();
  const { email }: RouteParams = (route.params || {}) as RouteParams; // Provide a default value and cast


const forgotPasswordSubmit = async () => {
  try {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    await Auth.forgotPasswordSubmit(email, code, password);
    console.log('Password updated successfully');
  } catch (err) {
    console.log('Error updating password...', err);
  }};

  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
         <TextInput style={styles.input}
          placeholder="Confirmation code"
          placeholderTextColor={'gray'}
          value={code}
          onChangeText={setCode}
          secureTextEntry/>
        <TextInput  style={styles.input}
          placeholder="New password"
          placeholderTextColor={'gray'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry/>
        <TextInput  style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor={'gray'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry/>
        <Button 
          title="Reset Password"
          onPress={forgotPasswordSubmit}
          color={'#FF00E8'}
        />  
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: 'black'
  },
  input: {
    top: -50,
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white'
  },
  logo: {
    top: -190,
    width: 126,
    height: 59,
    left: 100
  },  
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  errorTextEmail: {
    color: '#FF00E8',
    fontSize: 12,
    right: -10,
    top: 20
  },
   errorTextPassword: {
    color: '#FF00E8',
    fontSize: 12,
    right: -10,
    top: 30
  }});

export default CreateNewPasswordScreen;