import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text } from 'react-native';
import { Auth } from 'aws-amplify';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  };

  console.log('Sign up:', email, password);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Tune in</Text>
      <Text style={styles.subtitle}>Let's get you tuned in to great music around you. Create an account to get discovering and sharing.</Text>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    top: -200,
    width: 126,
    height: 59,
    left: 100
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  }
});

export default SignUpScreen;
