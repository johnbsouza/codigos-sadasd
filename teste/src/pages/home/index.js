import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Olá, Bem-vindo!</Text>
        <Text style={styles.subWelcomeText}>O que você gostaria de acessar hoje?</Text>

        <View style={styles.cardsRow}>
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Sobre')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle" size={32} color="#00ADB5" />
            </View>
            <Text style={styles.cardTitle}>Sobre Nós</Text>
            <Text style={styles.cardSubtitle}>Conheça o projeto</Text>
          </TouchableOpacity>

          {/* Card Contato */}
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Contato')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={32} color="#00ADB5" />
            </View>
            <Text style={styles.cardTitle}>Contato</Text>
            <Text style={styles.cardSubtitle}>Fale com a equipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  subWelcomeText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra os cartões horizontalmente no ecrã
    alignItems: 'center',
    gap: 16, // Cria um espaçamento moderno e uniforme entre eles
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    width: 160, // Largura fixa para manter ambos perfeitamente alinhados
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 173, 181, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 173, 181, 0.3)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});