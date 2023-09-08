import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../components/SplashScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import { expect } from '@jest/globals';

describe('SplashScreen', () => {
  it('renders the logo correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  
    const logo = getByTestId('splash-logo');
  
    expect(logo).toBeTruthy();
  })});