import React from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';

export default function Contato() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          
          <View style={styles.card3D}>
            
            <View style={styles.header}>
              <Text style={styles.title}>Fale Conosco</Text>
              <Text style={styles.subtitle}>Tem alguma dúvida? Envie uma mensagem e retornaremos.</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                placeholderTextColor="#ffffffff"
                textAlign="center" 
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Seu E-mail"
                placeholderTextColor="#ffffffff"
                textAlign="center" 
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Sua Mensagem..."
                placeholderTextColor="#ffffffff"
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
  container: { flex: 1, backgroundColor: '#121212' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  
  card3D: {
    backgroundColor: '#1e1e1e', 
    padding: 24,
    borderRadius: 24,
    alignItems: 'center', 
    
    // Efeito de Luz
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    
    // Efeito de Sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 15,
  },
  
  header: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#ffffffff', lineHeight: 22, textAlign: 'center' },
  
  form: { width: '100%' },
  input: {
    backgroundColor: '#000000ff', 
    color: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)', 
  },
  textArea: { height: 100, textAlignVertical: 'center' },
  
  button: {
    backgroundColor: '#00ADB5',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00ADB5',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },
});