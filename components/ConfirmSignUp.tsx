import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.log('Error signing up:', error);
    };
};

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Verify your e-mail</Text>
      <Text style={styles.text}>Check your email for a confirmation code </Text>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
      <TextInput
        placeholder="Confirmation code"
        value={code}
        onChangeText={setCode}
        secureTextEntry
        style={styles.input}
      />
      <Button 
      title="Login" 
      onPress={confirmSignUp} 
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
});

export default ConfirmSignUp;