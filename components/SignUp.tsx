import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text } from 'react-native';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log('Sign up:', email, password);
  };

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
