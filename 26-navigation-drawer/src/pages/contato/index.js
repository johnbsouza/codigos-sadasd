import React from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Contato() {
  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>Fale Conosco</Text>
              <Text style={styles.subtitle}>Envie sua mensagem. Responderemos com brevidade.</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={handleHome} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={16} color="#2997ff" style={{ marginRight: 6 }} />
              <Text style={styles.backButtonText}>Voltar ao Início</Text>
            </TouchableOpacity>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#86868b"
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#86868b"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Escreva sua mensagem..."
                placeholderTextColor="#86868b"
                multiline={true}
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Enviar Mensagem</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F2F2F7' 
  },
  scrollContent: { 
    flexGrow: 1, 
    padding: 20, 
    justifyContent: 'center' 
  },
  card: {
    backgroundColor: '#FFFFFF', 
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  header: { 
    marginBottom: 20, 
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#1D1D1F', 
    marginBottom: 6, 
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 14, 
    color: '#86868b', 
    lineHeight: 20, 
    letterSpacing: -0.1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 151, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(41, 151, 255, 0.2)',
  },
  backButtonText: {
    color: '#2997ff',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: -0.2,
  },
  form: { 
    width: '100%' 
  },
  input: {
    backgroundColor: '#F9F9FB', 
    color: '#1D1D1F',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA', 
    letterSpacing: -0.2,
  },
  textArea: { 
    height: 110, 
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  button: {
    backgroundColor: '#0071e3',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 15, 
    fontWeight: '600', 
    letterSpacing: -0.2,
  },
});