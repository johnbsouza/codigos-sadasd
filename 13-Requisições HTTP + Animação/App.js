import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import api from './src/services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);

  const handleSearch = async () => {
    Keyboard.dismiss();

    if (cep.trim() === '') {
      Alert.alert('Campo Vazio', 'Por favor, digite um CEP antes de buscar.');
      return;
    }

    if (cep.length !== 8) {
      Alert.alert('CEP Incompleto', 'O CEP deve conter exatamente 8 dígitos.');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json/`);

      if (response.data.erro) {
        Alert.alert('CEP Não Encontrado', 'O CEP informado não existe na base de dados.');
        setDados(null);
        return;
      }

      setDados(response.data);

    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível buscar o CEP. Verifique sua internet.');
      setDados(null);
    }
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setCep('');
    setDados(null);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>

          <View style={styles.headerContainer}>
            <Text style={styles.title}>Buscador de CEP</Text>
            <Text style={styles.subtitle}>Digite o CEP desejado abaixo:</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ex: 01001000"
              placeholderTextColor="#94a3b8"
              value={cep}
              onChangeText={(texto) => setCep(texto)}
              keyboardType="numeric"
              maxLength={8}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Buscar CEP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
              <Text style={styles.buttonText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {/* Janela Flutuante de Resultado */}
          {dados && (
            <View style={styles.overlay}>
              <View style={styles.resultadoCard}>
                <Text style={styles.resultadoTitle}>📍 Endereço Encontrado</Text>
                
                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>CEP:</Text>
                  <Text style={styles.itemText}>{dados.cep}</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>Logradouro:</Text>
                  <Text style={styles.itemText}>{dados.logradouro || 'Não informado'}</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>Bairro:</Text>
                  <Text style={styles.itemText}>{dados.bairro || 'Não informado'}</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemLabel}>Cidade/UF:</Text>
                  <Text style={styles.itemText}>{dados.localidade} - {dados.uf}</Text>
                </View>

                <TouchableOpacity style={styles.closeButton} onPress={() => setDados(null)}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03352eff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#000000ff',
    borderWidth: 1.5,
    borderColor: '#426cf7ff',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonClear: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 1000,
  },
  resultadoCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#426cf7ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: '#94a3b8',
    width: 100,
  },
  itemText: {
    color: '#f8fafc',
    flex: 1,
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});