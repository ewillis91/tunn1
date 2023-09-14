import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import SignUpScreen from './components/SignUp';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import LoginScreen from './components/LoginScreen';
import WelcomeScreen from './components/WelcomeScreen';
import SpotifyAuth from './components/SpotifyAuth';
import ConfirmSignUp from './components/ConfirmSignUp';

Amplify.configure(awsExports);

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ConfirmSignUp"
          component={ConfirmSignUp}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SpotifyLogin"
          component={SpotifyAuth} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

