import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Cabeçalho de Perfil com a Imagem Local */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../assets/profile.png')} 
            style={styles.avatar} 
            resizeMode="cover"
          />
          <View style={styles.onlineBadge} />
        </View>
        <Text style={styles.userName}>Jonathan</Text>
        <Text style={styles.userEmail}>jonathan@email.com</Text>
      </View>

      {/* Lista de Opções do Menu */}
      <View style={styles.itemList}>
        <DrawerItemList {...props} />
      </View>

      {/* Rodapé Refinado */}
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.versionText}>Versão 1.0.0 • React Native</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161922',
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    marginBottom: 14,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#00ADB5',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#121212',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#94A3B8',
  },
  itemList: {
    flex: 1,
    paddingTop: 6,
  },
  footer: {
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