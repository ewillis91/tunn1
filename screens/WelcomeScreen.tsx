import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
      <Image source={require('../assets/images/rocknroll.png')} style={styles.logo} />
      <Text style={styles.text}>You\'re in! Welcome to tunnl, your new home for discovering new music.'.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
  },
  logo: {
    top: -190,
    width: 126,
    height: 59,
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  }
});

export default WelcomeScreen;
