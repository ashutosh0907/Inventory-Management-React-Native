import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App'; // Replace with your main app component file
import { name as appName } from './app.json';

const theme = {
  ...DefaultTheme,
  // Customize theme options as needed
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue', // Change the primary color
    accent: 'green', // Change the accent color
  },
};

const Main = () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
