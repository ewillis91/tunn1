import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import EmailValidation from '../components/EmailValidation';
import PasswordValidation from '../components/PasswordValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  // Store email and password with a 24-hour expiration
  const storeCredentials = async (email, password) => {
    const expirationTimestamp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const data = {
      email,
      password,
      expirationTimestamp,
    };
    await AsyncStorage.setItem('credentials', JSON.stringify(data));
  };

  // Log in and call storeCredentials if the user wants to be remembered
  const handleSignIn = async () => {
    if (checked) {
      try {
        // Store the username and password securely.
        await storeCredentials(email, password);
      } catch (error) {
        console.error('Error storing credentials:', error);
      }
    }
    try {
      await Auth.signIn({
        username: email,
        password: password,
        });
      console.log('Sign in successful with ' + email);
      // @ts-ignore
      navigation.navigate('SpotifyLogin');
    } catch (error: any) {
      console.log('error signing in', error);
      if (error.code === 'NotAuthorizedException' || error.code === 'UserNotFoundException' ) {
        Alert.alert('Hmm, that password doesn\'t look right. Try again.');
      }  else if (!email || !password) {
        Alert.alert('Please make sure an email address and password is added.')
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

  const handleResetClick = () => {
    // @ts-ignore
    navigation.navigate('ResetPasswordScreen');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Log in to get discovering and sharing</Text>
      <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
      <Text>Login</Text>
      {(!isEmailValid && email) && (
        <Text style={styles.errorTextEmail}>Invalid email address</Text>
      )}
      <EmailValidation 
        placeholder='Email'
        placeholderTextColor={'gray'}
        email={email} 
        onEmailChange={validateEmail} 
        setIsEmailValid={setIsValidEmail} 
      />
      {!isPasswordValid && (
        <Text style={styles.errorTextPassword}>Password must be at least 8 characters long.</Text>
      )}
      <PasswordValidation
        onPasswordChange={handlePasswordChange}
      />
      <Text style={styles.rememberMeText}>Remember me</Text>
      <Checkbox 
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
        uncheckedColor='white'
        color='#FF00E8'
      />
      <Button 
        title="Login" 
        onPress={handleSignIn} 
        color="#FF00E8"/>
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={handleResetClick}>
      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
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
    top: -150,
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
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 30,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  rememberMeText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Source Sans Pro',
    bottom: -25,
    marginHorizontal: 40,
  }
});

export default LoginScreen;
