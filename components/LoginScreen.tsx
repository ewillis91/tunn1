import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import EmailValidation from './EmailValidation';
import PasswordValidation from './PasswordValidation';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      await Auth.signIn({
        username: email,
        password: password,
        });
      console.log('Sign in successful with ' + email);
      // @ts-ignore
      navigation.navigate('Welcome');
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  const validateEmail = (text: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(text);
    setEmail(text);
    setIsValidEmail(isValid);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Log in to get discovering and sharing</Text>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
      <Text>Login</Text>
      {(!isEmailValid && email) && (
        <Text style={styles.errorText}>Invalid email address</Text>
      )}
      <EmailValidation 
        email={email} 
        onEmailChange={validateEmail} 
        setIsEmailValid={setIsValidEmail} 
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button 
      title="Login" 
      onPress={handleSignIn} 
      color="#f194ff"/>
    </View>
  );
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
  errorText: {
    color: 'red',
    fontSize: 12,
    right: -10
  },
});

export default LoginScreen;
