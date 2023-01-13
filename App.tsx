import React from 'react';
import { StatusBar } from 'react-native';
// console.disableYellowBox = true;
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import {
  useFonts, 
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import Loading from './src/components/Loading';

export default function App() {

  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  return (
    <NavigationContainer>
        <AuthProvider>
          <ThemeProvider theme={theme}>         
              <StatusBar translucent={false} />
              {
                fontsLoader ? <Routes /> : <Loading />
              }
          </ThemeProvider>
        </AuthProvider>
    </NavigationContainer>
  );
}
