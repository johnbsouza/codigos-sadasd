import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      
      <View style={styles.heroSection}>
        <Text style={styles.heroSuper}>INOVAÇÃO EM CADA DETALHE</Text>
        <Text style={styles.heroTitle}>Sabor e Elegância.</Text>
        <Text style={styles.heroSubtitle}>Descubra experiências gastronômicas exclusivas desenhadas para o seu dia a dia.</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Sobre')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle-outline" size={24} color="#2997ff" />
            </View>
            <Ionicons name="chevron-forward" size={18} color="#86868b" />
          </View>
          <Text style={styles.cardTitle}>Sobre Nós</Text>
          <Text style={styles.cardDescription}>Conheça nossa filosofia de design e compromisso culinário.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Contato')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainerGreen}>
              <Ionicons name="mail-outline" size={24} color="#34c759" />
            </View>
            <Ionicons name="chevron-forward" size={18} color="#86868b" />
          </View>
          <Text style={styles.cardTitle}>Contato</Text>
          <Text style={styles.cardDescription}>Fale diretamente com nossa equipe de atendimento exclusiva.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 36,
    alignItems: 'flex-start',
  },
  heroSuper: {
    fontSize: 12,
    fontWeight: '600',
    color: '#86868b',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1D1D1F',
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#86868b',
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(41, 151, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerGreen: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1D1D1F',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#86868b',
    lineHeight: 20,
    letterSpacing: -0.1,
  },
});