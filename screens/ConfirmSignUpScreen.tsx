import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

type RouteParams = {
  email: string;
};

const ConfirmSignUp: React.FC = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email }: RouteParams = (route.params || {}) as RouteParams; // Provide a default value and cast
  
  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, code);
      console.log('Sign up successful');
      // @ts-ignore
      navigation.navigate('SpotifyLogin');
    } catch (error: any) {
      console.log('Error signing up:', error);
      if (error.code === 'CodeMismatchException') {
        Alert.alert('Hmm, that code doesn\'t look right. Check it and try again. (Or resend a new code)');
      } else if (!code) {
        Alert.alert('Confirmation code cannot be empty')
        console.log(error);
      } else console.log(error)
    }
};

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert('Confirmation code resent successfully');
      console.log(email)
    } catch (error) {
      console.error('Error resending confirmation code:', error);
      Alert.alert('Error resending confirmation code', error.message || 'An error occurred');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Verify your e-mail</Text>
      <Text style={styles.text}>Almost there! Like all good gigs, we just need to check your details. Enter the code we just sent to your email. </Text>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
      <TextInput
        placeholder="Confirmation code"
        placeholderTextColor={'gray'}
        value={code}
        onChangeText={setCode}
        secureTextEntry
        style={styles.input}
      />
      <Button 
      title="Submit Code" 
      onPress={confirmSignUp} 
      color="#FF00E8"/>
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={resendConfirmationCode}>
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
    top: 0,
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
    top: -10,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 30,
  },
  resendcodeText: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
}});

export default ConfirmSignUp;