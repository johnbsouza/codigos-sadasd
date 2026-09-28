import React from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <View style={styles.card}>
        <View style={styles.iconHeader}>
          <Ionicons name="logo-apple" size={36} color="#1D1D1F" />
        </View>

        <Text style={styles.title}>Sobre o Projeto</Text>
        
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Design System Light 2026</Text>
        </View>

        <Text style={styles.description}>
          Criado com foco absoluto na experiência do usuário, seguindo rigorosos padrões de minimalismo, tipografia refinada e transições fluidas inspiradas na filosofia Apple.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
  },
  iconHeader: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: 'rgba(41, 151, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#2997ff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: -0.1,
  },
  description: {
    fontSize: 15,
    color: '#86868b',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
});