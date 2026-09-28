import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/home/index';
import Sobre from './src/pages/sobre/index';
import Contato from './src/pages/contato/index';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#181A20', flex: 1 }}>
      {/* Cabeçalho de Perfil */}
      <View style={styles.drawerHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }} 
            style={styles.avatar} 
          />
          <View style={styles.onlineBadge} />
        </View>
        <Text style={styles.drawerUser}>Jonathan</Text>
        <Text style={styles.drawerEmail}>usuario@email.com</Text>
      </View>

      {/* Lista de Opções do Menu */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Rodapé do Menu */}
      <View style={styles.drawerFooter}>
        <View style={styles.divider} />
        <Text style={styles.versionText}>Versão 1.0.0 • React Native</Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#121212',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#2A2A2A',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          drawerStyle: {
            backgroundColor: '#181A20',
            width: 280,
          },
          drawerActiveBackgroundColor: 'rgba(0, 173, 181, 0.12)',
          drawerActiveTintColor: '#00ADB5',
          drawerInactiveTintColor: '#94A3B8',
          drawerItemStyle: {
            borderRadius: 12,
            marginHorizontal: 12,
            marginVertical: 4,
          },
          drawerLabelStyle: {
            marginLeft: -10,
            fontWeight: '600',
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            title: 'Início',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
          }} 
        />
        <Drawer.Screen 
          name="Sobre" 
          component={Sobre} 
          options={{ 
            title: 'Sobre Nós',
            drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />
          }} 
        />
        <Drawer.Screen 
          name="Contato" 
          component={Contato} 
          options={{ 
            title: 'Fale Conosco',
            drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" size={size} color={color} />
          }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#00ADB5',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#121212',
  },
  drawerUser: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  drawerEmail: {
    fontSize: 13,
    color: '#94A3B8',
  },
  drawerFooter: {
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});