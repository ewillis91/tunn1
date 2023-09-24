import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
      <Image source={require('../assets/images/rocknroll.png')} style={styles.rocknroll} />
      <Text style={styles.text}>You're in! {'\n'} Welcome to tunnl, your new home for discovering new music.</Text>
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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  rocknroll: {
    top: -100,
    width: 80,
    height: 85,
    justifyContent: 'center'
  },
});

export default WelcomeScreen;
