import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import axios from 'axios';
import { encode as base64Encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const credentials = `152ccb8a6553402dab1cdf5098ff0793:11266f046f434acba1c057c125231fb4`;
const base64Credentials = base64Encode(credentials);

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

const SpotifyAuth = () => {
  const navigation = useNavigation(); 
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '152ccb8a6553402dab1cdf5098ff0793',
      scopes: ['user-read-email', 'user-read-private'],
      responseType: 'code',
      redirectUri: 'exp://192.168.55.56:8081',
      usePKCE: false,
    },
    discovery
  );

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      // Extract the authorization code from the response
      const { code } = response.params;

      // Exchange the authorization code for an access token
     axios
  .post(
    'https://accounts.spotify.com/api/token',
    `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent('exp://192.168.55.56:8081')}`,
    {
      headers: {
        'Authorization': 'Basic ' + base64Credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  .then((response) => {
    const { access_token } = response.data;
    setAccessToken(access_token);
    console.log('access_token', access_token);
    // @ts-ignore
    navigation.navigate('WelcomeScreen');
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received. Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up the request:', error.message);
    }
  });

    }
  }, [response]);

  const handleSpotifyLogout = async () => {
    try {
      // Clear the access token from the component state
      setAccessToken(null);
  
      // Clear the access token from storage (if used)
      await AsyncStorage.removeItem('access_token');
  
      // Implement any additional logout logic here (e.g., clearing user data, resetting app state)
  
      // Redirect or navigate to the login screen or home screen
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle any errors that occur during the logout process
    }
  };
  

  return (
    <View style={styles.container}>
      {accessToken ? (
        <Button title="Log Out" onPress={handleSpotifyLogout} color="#f194ff" />
      ) : (
        <Button
          disabled={!request}
          title="Spotify Login"
          color="#f194ff"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: 'black',
  },
});

export default SpotifyAuth;
