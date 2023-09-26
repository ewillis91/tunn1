import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import EmailValidation from '../components/EmailValidation';

type RouteParams = {
  email: string;
};


const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsValidEmail] = useState(true); 
  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const validateEmail = (text: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailPattern.test(text);
    setEmail(text);
    setIsValidEmail(isValid);
  };

// Send confirmation code to user's email
  const forgotPassword = async () => {
    try {
      const data = await Auth.forgotPassword(email);
      console.log(data);
      // @ts-ignore
      navigation.navigate('CreateNewPasswordScreen', { email });;
    } catch(err) {
      console.log(err);
      if (err.code === 'UserNotFoundException') {
        Alert.alert('Have you signed up yet? If not, please sign up first.');
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reset Password</Text>
      <Text style={styles.text}>Enter your email address associated with your account and we'll send you a confirmation code to reset your password.</Text>
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
      <Button 
        title="Send Confirmation Code" 
        onPress={forgotPassword} 
        color="#FF00E8"/>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={forgotPassword}>
        <Text style={styles.resendcodeText}>Resend code </Text>
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
    top: -20,
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
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 30,
  },
  passwordResetText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  resendcodeText: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
}});

export default ResetPasswordScreen;
