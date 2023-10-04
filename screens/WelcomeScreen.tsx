import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

interface Track {
  name: string;
  artists: { name: string }[];
  id: string;
}

interface Playlist {
  name: string;
  artists: { name: string }[];
  id: string;
}
type RouteParams = {
  accessToken: string;
};

const WelcomeScreen: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const route = useRoute();
  const { accessToken }: RouteParams = (route.params || {}) as RouteParams; // Provide a default value and cast

  useEffect(() => {
    // Make a GET request to Spotify API to get the user's latest added tracks
    axios
      .get('https://api.spotify.com/v1/playlists/3wY8RPW4A2R7vBx6Dv9LUd/tracks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 4,
        },
      })
      .then((response) => {
        const topTracks = response.data.items.map((item: any) => ({ name: item.track.name }));
        setTopTracks(topTracks);
      })
      .catch((error) => {
        console.error('Error fetching top tracks:', error.response?.data);
      });
  }, [accessToken]);


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/tunnl.png')} style={styles.logo} />
      <Image source={require('../assets/images/rocknroll.png')} style={styles.rocknroll} />
      <Text style={styles.text}>
        You're in! {'\n'} Welcome to tunnl, your new home for discovering new music.
      </Text>
      <Text style={styles.heading}>Tracks of GG's playlist</Text>
      <FlatList
        data={topTracks}
        keyExtractor={(item) => item.id} // Adjust this based on the actual structure of the data
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
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
    top: 20,
    width: 126,
    height: 59,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
  },
  rocknroll: {
    top: 20,
    width: 30,
    height: 25,
    justifyContent: 'center',
  },
  heading: {
    top: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  trackItem: {
    top: 20,
    width: 300,
    height: 50,
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  playlistItem: {
  top: 20,
  width: 300,
  height: 50,
  color: '#FFFFFF',
  textAlign: 'center',
  fontFamily: 'Source Sans Pro',
  backgroundColor: '#FFFFFF',
  },
});

export default WelcomeScreen;
