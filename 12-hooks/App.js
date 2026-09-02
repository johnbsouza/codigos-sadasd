import React, { use, useState, useEffect, useMemo, useRef } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Keyboard } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [input, setInput] = useState('');
  const nomeInput = useRef(null);

  function alterarNome() {
    if (input.trim === '') return;  // Evita salvar nomes vazios
    setNome(input);
    setInput('');
    Keyboard.dismiss(); //Fecha teclado automaticamente ao clicar no botão 
  }

  useEffect(() => {
    async function getStorage() {
      try {
        const nomeStorage = await AsyncStorage.getItem('nomes');
        if (nomeStorage !== null) {
          setNome(nomeStorage)
        }
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    }

    getStorage();
  }, []);

  useEffect(() => {
    async function saveStorage() {
      try {
        if (nome !== '') {
          await AsyncStorage.setItem('nomes', nome);
        }
      } catch (error) {
        console.log("Erro ao salvar dados:", error);
      }
    }

    saveStorage();
  }, [nome]);

  const letrasNome = useMemo(() => {
    console.log("Mudou o texto");
    return nome.length;
  }, [nome]);

  function novoNome() {
    nomeInput.current.focus();
  }

  return (
    <View style={styles.container}>

      <TextInput
        placeholder='Digite seu nome aqui'
        value={input}
        onChangeText={(texto) => setInput(texto)}
        ref={nomeInput}
      />

      <Text style={styles.texto}>
        {nome}
      </Text>

      <Text style={styles.texto}>
        Tem {letrasNome} caracteres.
      </Text>
<TouchableOpacity style={styles.btn} onPress={alterarNome}>
        <Text style={styles.btnText}>Mudar de nome</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnNovo} onPress={novoNome}>
        <Text style={styles.btnText}>Novo Nome</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  },
  texto: {
    color: "purple",
    fontSize: 20,
    textAlign: 'center',
    padding: '5'
  },
  btn: {
    backgroundColor: '#007bff',
    paddingVertical: '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: 400


  },
  btnText: {
    color: '#000'
  },
  btnNovo: {
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 400,
    padding: 10
  }

}
)