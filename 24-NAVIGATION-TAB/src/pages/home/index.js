import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' }} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Olá, Bem-vindo!</Text>
            <Text style={styles.subtitle}>O que você gostaria de acessar hoje?</Text>
          </View>

          <View style={styles.shortcutsContainer}>
            <TouchableOpacity 
              style={styles.card3D} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Sobre')}
            >
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>💡</Text>
              </View>
              <Text style={styles.cardTitle}>Sobre Nós</Text>
              <Text style={styles.cardDesc}>Conheça o projeto</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.card3D} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Contato')}
            >
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>✉️</Text>
              </View>
              <Text style={styles.cardTitle}>Contato</Text>
              <Text style={styles.cardDesc}>Fale com a equipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  backgroundImage: { flex: 1, width: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(18, 18, 18, 0.85)' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { 
    marginBottom: 40, 
    alignItems: 'center' 
  },
  greeting: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#FFFFFF', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#A0A0A0', 
    lineHeight: 24, 
    textAlign: 'center' 
  },
  shortcutsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  
  card3D: {
    backgroundColor: '#292C33',
    width: '48%', 
    padding: 20,
    borderRadius: 20,
    alignItems: 'center', 
    
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)', 
    
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15, 
  },
  
  iconWrapper: {
    backgroundColor: 'rgba(0, 173, 181, 0.2)', 
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 26 },
  cardTitle: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 6, 
    textAlign: 'center' 
  },
  cardDesc: { 
    fontSize: 12, 
    color: '#999999', 
    textAlign: 'center' 
  },
});