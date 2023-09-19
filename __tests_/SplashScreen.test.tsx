import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../screens/SplashScreen'; 
import { NavigationContainer } from '@react-navigation/native';

describe('SplashScreen', () => {
  it('renders the logo correctly', () => { // Remove the extra parenthesis here
    const { getByTestId } = render(
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  
    const logo = getByTestId('splash-logo');
  
    expect(logo).toBeTruthy();
  });
});
