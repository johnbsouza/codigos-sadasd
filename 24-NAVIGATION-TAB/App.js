import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/home/index';
import Sobre from './src/pages/sobre/index';
import Contato from './src/pages/contato/index';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#00d2ddff',
            elevation: 5,
            shadowOpacity: 15,
            borderBottomWidth: 5,
            borderBottomColor: '#2A2A2A',
            borderColor: '#467595',
            borderTopWidth: 0
            
          },
          headerTintColor: '#000000ff',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          tabBarStyle: {
            backgroundColor: '#1E1E1E',
            borderTopWidth: 1,
            borderTopColor: '#2A2A2A',
            height: 120,        // Altura ajustada
            paddingBottom: 35, // Espaço extra para escapar dos botões do Android
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#00d2ddff',
          tabBarInactiveTintColor: '#898989',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sobre') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Contato') {
              iconName = focused ? 'mail' : 'mail-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Início' }} 
        />
        <Tab.Screen 
          name="Contato" 
          component={Contato} 
          options={{ title: 'Fale Conosco' }} 
        />
        <Tab.Screen 
          name="Sobre" 
          component={Sobre} 
          options={{ title: 'Sobre Nós' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}