import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    // Simulate a delay for the splash screen (e.g., 2 seconds)
    const splashTimeout = setTimeout(() => {
      // Navigate to the next screen or perform any other action
      // For demonstration purposes, let's just log a message
      console.log('Splash screen timeout complete');
    }, 2000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    top: -100,
    width: 250,
    height: 60,
  },
});

export default SplashScreen;

