import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a delay for the splash screen (e.g., 2 seconds)
    const splashTimeout = setTimeout(() => {
      // Navigate to the SignUp screen
      // @ts-ignore
      navigation.navigate('SignUp');
     
      console.log('Splash screen timeout complete');
    }, 2000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/tunnl.png')} style={styles.logo} testID="splash-logo"/>
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
    width: 200,
    height: 80,
  },
});

export default SplashScreen;

