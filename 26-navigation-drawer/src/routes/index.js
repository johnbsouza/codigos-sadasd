import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StackRoutes from './stack';
import Sobre from '../pages/sobre';
import Contato from '../pages/contato';
import CustomDrawer from '../componentes/customDrawer';

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#F2F2F7',
          width: 290,
        },
        drawerActiveBackgroundColor: 'rgba(41, 151, 255, 0.1)',
        drawerActiveTintColor: '#2997ff',
        drawerInactiveTintColor: '#86868b',
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 12,
          marginVertical: 4,
          paddingHorizontal: 8,
        },
        drawerLabelStyle: {
          marginLeft: -10,
          fontWeight: '500',
          fontSize: 15,
          letterSpacing: -0.2,
        },
      }}
    >
      <Drawer.Screen 
        name="StackHome" 
        component={StackRoutes} 
        options={{ 
          title: 'Início',
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Sobre" 
        component={Sobre} 
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
          headerTintColor: '#1D1D1F',
          headerTitleStyle: { fontWeight: '600', fontSize: 17 },
          title: 'Sobre',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle" size={size} color={color} />
        }} 
      />
      <Drawer.Screen 
        name="Contato" 
        component={Contato} 
        options={{ 
          headerShown: true,
          headerStyle: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
          headerTintColor: '#1D1D1F',
          headerTitleStyle: { fontWeight: '600', fontSize: 17 },
          title: 'Contato',
          drawerIcon: ({ color, size }) => <Ionicons name="mail" size={size} color={color} />
        }} 
      />
    </Drawer.Navigator>
  );
}