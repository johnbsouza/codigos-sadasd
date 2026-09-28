import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StackRoutes from './stack';
import Sobre from '../pages/sobre';
import Contato from '../pages/contato';
import CustomDrawer from '../componentes/customDrawer'; // Importa o componente limpo

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#161922',
          width: 280,
        },
        drawerActiveBackgroundColor: 'rgba(0, 173, 181, 0.15)',
        drawerActiveTintColor: '#00ADB5',
        drawerInactiveTintColor: '#94A3B8',
        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 12,
          marginVertical: 4,
          paddingVertical: 2,
        },
        drawerLabelStyle: {
          marginLeft: -10,
          fontWeight: '600',
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen 
        name="StackHome" 
        component={StackRoutes} 
        options={{ 
          title: 'Início',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Sobre" 
        component={Sobre} 
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: '#121212', borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
          headerTintColor: '#FFFFFF',
          title: 'Sobre Nós',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Contato" 
        component={Contato} 
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: '#121212', borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
          headerTintColor: '#FFFFFF',
          title: 'Fale Conosco',
          drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}