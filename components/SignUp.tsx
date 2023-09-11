import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import EmailValidation from './EmailValidation';
import PasswordValidation from './PasswordValidation';
import { useNavigation } from '@react-navigation/native';

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
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log('Sign up successful');
       // @ts-ignore
      navigation.navigate('Welcome');
    } catch (error: any) {
      if (error.message === 'An account with the given email already exists.') {
        Alert.alert('Email is already registered');
      } else {
        console.log(error);
      }
    }
  };

  const validateEmail = (text: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(text);
    setEmail(text);
    setIsValidEmail(isValid);
  };

  const handlePasswordChange = (password: string, isValid: boolean) => {
    setPassword(password);
    setIsPasswordValid(isValid);
  };

  const handleLogin = () => {
    // @ts-ignore
    navigation.navigate('Login');
  }

  console.log('Sign up:', email, password);
  console.log(isPasswordValid)

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
      {!isPasswordValid && (
        <Text style={styles.errorText}>Password must be at least 8 characters long.</Text>
      )}
      <PasswordValidation
        onPasswordChange={handlePasswordChange}
      />
      <Button  
        title="Sign Up" 
        color="#f194ff"
        onPress={handleSignUp} />
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={handleLogin}>
      <Text style={styles.text}>Already have an account? <Text style={styles.boldText}>Log in</Text></Text>
      </TouchableOpacity>
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
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 30,
  },
  boldText: {
    fontWeight: 'bold',
  }});

export default SignUpScreen;
