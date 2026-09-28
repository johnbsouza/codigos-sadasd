import React from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
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
        <View style={styles.content}>
          
          <View style={styles.card3D}>
            
            <View style={styles.header}>
              <Text style={styles.title}>Fale Conosco</Text>
              <Text style={styles.subtitle}>Tem alguma dúvida? Envie uma mensagem e retornaremos.</Text>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={handleHome} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={18} color="#00ADB5" style={{ marginRight: 6 }} />
              <Text style={styles.backButtonText}>Voltar para o Início</Text>
            </TouchableOpacity>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                placeholderTextColor="#94A3B8"
                textAlign="center" 
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Seu E-mail"
                placeholderTextColor="#94A3B8"
                textAlign="center" 
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Sua Mensagem..."
                placeholderTextColor="#94A3B8"
                textAlign="center" 
                multiline={true}
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>ENVIAR MENSAGEM</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  content: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center' 
  },
  card3D: {
    backgroundColor: '#1E1E1E', 
    padding: 24,
    borderRadius: 24,
    alignItems: 'center', 
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 15,
  },
  header: { 
    marginBottom: 20, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#94A3B8', 
    lineHeight: 20, 
    textAlign: 'center' 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 173, 181, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 173, 181, 0.3)',
  },
  backButtonText: {
    color: '#00ADB5',
    fontWeight: '600',
    fontSize: 14,
  },
  form: { 
    width: '100%' 
  },
  input: {
    backgroundColor: '#000000', 
    color: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A', 
  },
  textArea: { 
    height: 90, 
    textAlignVertical: 'center' 
  },
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#00ADB5',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
});