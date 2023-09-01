import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import SignUpScreen from './components/SignUp';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';


Amplify.configure(awsExports);

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for the splash screen
        />
        {/* Add other screens here */}
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }} // Hide header for the splash screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

