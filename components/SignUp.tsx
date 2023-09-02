import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import EmailValidation from './EmailValidation';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

interface EmailValidationProps {
  email: string;
  onEmailChange: (email: string) => void;
  isEmailValid: boolean;
}

const SignUpScreen: React.FC = () => {
  const [email, setEmail,] = useState('');
  const [password, setPassword,] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        }
      });
      console.log('Sign up successful');
      // You can navigate to a new screen after successful signup if needed.
    } catch (error) {
      console.log('Error signing up:', error);
    }
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }
  };

  const validateEmail = (text: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(text);
    setEmail(text);
    setIsValidEmail(isValid);
  };
   
  console.log('Sign up:', email, password);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Tune in</Text>
      <Text style={styles.text}>Let's get you tuned in to great music around you. Create an account to get discovering and sharing.</Text>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
      <EmailValidation 
        email={email} 
        onEmailChange={validateEmail} 
        setIsEmailValid={setIsValidEmail} 
      />
        {(!isEmailValid && email) && (
        <Text style={styles.errorText}>Invalid email address</Text>
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button  
      title="Sign Up" 
      color="#f194ff"
      onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
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
    top: -240,
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
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    right: -10
}});

export default SignUpScreen;
