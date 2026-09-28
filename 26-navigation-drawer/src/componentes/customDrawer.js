import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
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
        <Text style={styles.userEmail}>jonathan@icloud.com</Text>
      </View>

      <View style={styles.itemList}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.versionText}>iOS Framework • v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F7',
    flex: 1,
    paddingTop: 10,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  avatarContainer: {
    position: 'relative',
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34c759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 19,
    fontWeight: '600',
    color: '#1D1D1F',
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#86868b',
    letterSpacing: -0.1,
  },
  itemList: {
    flex: 1,
    paddingHorizontal: 4,
  },
  footer: {
    padding: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginBottom: 14,
  },
  versionText: {
    fontSize: 11,
    color: '#86868b',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});