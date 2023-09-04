import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SplashScreen from './SplashScreen'; // Adjust the import path as needed

describe('SplashScreen', () => {
  it('should render the splash screen', async () => {
    const { getByTestId } = render(<SplashScreen />);
    
    // You can use queryByTestId to find elements by test ID
    const logo = getByTestId('splash-logo');

    // Assert that the logo is rendered
    expect(logo).toBeTruthy();

    // Wait for a certain period to simulate the timeout
    await waitFor(() => {
      // Here, you can assert that the navigation has occurred,
      // or that a specific message has been logged (using a mocked console.log)
    });
  });
});
