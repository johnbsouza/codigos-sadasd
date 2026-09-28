import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#121212' }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <Routes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}