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
  const [email, setEmail,] = useState('');
  const [password, setPassword,] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
        autoSignIn: {
          enabled: true,
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

  const handlePasswordChange = (password: string, isValid: boolean) => {
    setPassword(password);
    setIsPasswordValid(isValid);
  };

  const navigation = useNavigation();

  const handleLoginPress = () => {

    // @ts-ignore
    navigation.navigate('Login');
  };

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
      <Text style={styles.label}>Email address</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        style={styles.input}
      />
      <PasswordValidation
        onPasswordChange={handlePasswordChange}
      />
      <Button  
        title="Sign Up" 
        color="#f194ff"
        onPress={handleSignUp} />
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={handleLoginPress}>
      <Text style={styles.text}>Already have an account?<Text style={styles.boldText}> Log in</Text></Text>
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
  label: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 100,
    textAlign: 'center',
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
