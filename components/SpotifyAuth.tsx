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
      } else if (response?.type === 'error') {
        console.log('Something went wrong');
      }
    }, [response]);

    console.log(response?.type);

    const handleLogout = async () => {
      // Revoke the Spotify access token by sending a POST request to the Spotify token endpoint
      try {
        await fetch('https://accounts.spotify.com/api/token/revoke', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `token=${response.accessToken}`,
        });
  
        // Clear any stored authentication data (e.g., AsyncStorage or other storage mechanisms)
        // Replace this with your actual implementation to clear the stored tokens and user data
  
        // Navigate the user to a different screen or perform any other post-logout actions
        // For simplicity, we'll just reset the response state here.
        promptAsync(); // This will trigger a new authentication request.
      } catch (error) {
        console.error('Error revoking token:', error);
      }
    };
    
    return (
     <View style={styles.container}>   
     {response?.type === 'success' ? (
        <Button title="Log Out" onPress={handleLogout} color="#f194ff" />
      ) : (
        <Text style={styles.text}>You are not logged in</Text>
      )}
      <Button
        disabled={!request}
        title="Spotify Login"
        color="#f194ff"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>   
    )};

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
        top: -10,
      }});

  export default SpotifyAuth;
