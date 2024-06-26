
import React, {useState} from "react";
import { View, Button, StyleSheet, Image, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  email: string;
};

const CreateNewPasswordScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email }: RouteParams = (route.params || {}) as RouteParams; // Provide a default value and cast
  
  const handleResendCode = async () => {
    try {
        await Auth.forgotPassword(email);
        console.log('Confirmation code resent successfully');
      } catch (error) {
        console.error('Error resending confirmation code', error);
      }
    };
  

  const forgotPasswordSubmit = async () => {
  try {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    await Auth.forgotPasswordSubmit(email, code, password);
    Alert.alert('Password updated successfully');
    // @ts-ignore
    navigation.navigate('Login');
  } catch (err) {
    console.log('Error updating password...', err);
  }};

  const handlePasswordChange = (password: string, isValid: boolean) => {
    setPassword(password);
    setIsPasswordValid(isValid);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.subtitle}>Create a new password</Text>
        <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
         <TextInput style={styles.input}
          placeholder="Confirmation code"
          placeholderTextColor={'gray'}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          />
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
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={handleResendCode}>
        <Text style={styles.resendcodeText}>Resend code </Text>
        </TouchableOpacity>
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
    top: -160,
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
  resendcodeText: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 30,
  }});

export default CreateNewPasswordScreen;