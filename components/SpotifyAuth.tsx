import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };
  
  const SpotifyAuth: React.FC = () => {
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: '152ccb8a6553402dab1cdf5098ff0793',
        scopes: ['user-read-email', 'playlist-modify-public'],
        usePKCE: false,
        redirectUri: makeRedirectUri({
          scheme: 'exp://192.168.55.56:8081',
        }),
      },
      discovery
    );
    
    React.useEffect(() => {
      if (response?.type === 'success') {
        const { code } = response.params;
      }
    }, [response]);
  
    return (
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    );
  }

  export default SpotifyAuth;
