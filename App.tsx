import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import SignUpScreen from './screens/SignUpScreen';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SpotifyAuth from './components/SpotifyAuth';
import ConfirmSignUp from './screens/ConfirmSignUpScreen';
import { useFonts } from 'expo-font';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CreateNewPasswordScreen from './screens/CreateNewPasswordScreen';

Amplify.configure(awsExports);

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Source Sans Pro': require('./assets/fonts/source-sans-pro.regular.ttf'),
    'MaterialCommunityIcons': require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
  });

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
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="CreateNewPasswordScreen"
          component={CreateNewPasswordScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

