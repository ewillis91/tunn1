import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

const SpotifyLogin: React.FC = () => {
  const handleSpotifyLogin = async () => {
    try {
      const config = {
        clientId: '152ccb8a6553402dab1cdf5098ff0793',
        redirectUrl: 'exp://192.168.55.56:8081',
        scopes: ['user-read-private', 'user-read-email'], // Add the scopes you need
        serviceConfiguration: {
          authorizationEndpoint: 'https://accounts.spotify.com/authorize',
          tokenEndpoint: 'https://accounts.spotify.com/api/token',
        },
      };

    const authResult = await authorize(config);

    // Access the access token from the authResult
    const accessToken = authResult.accessToken;

      // Make a separate HTTP request to the Spotify authorization endpoint
     const response = await axios.get('https://accounts.spotify.com/authorize', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Access the status code from the response
      const statusCode = response.status;

      console.log('Authentication Status Code:', statusCode);

    } catch (error) {
      // Handle authentication error
      console.error(error);
    }
  };

  return (
 <View>
    <View style={styles.container}></View>
      <Text style={styles.text}>Welcome to Spotify Login Page</Text>
      <Button title="Login with Spotify" onPress={handleSpotifyLogin} />
    </View>
  );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingBottom: 5,
      backgroundColor: 'black'
    },
    text: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      fontFamily: 'Source Sans Pro',
    },
  });

export default SpotifyLogin;
