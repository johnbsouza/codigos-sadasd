import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      input: ''
    };
    //this.pegarNome = this.pegarNome.bind(this)
    this.entrar = this.entrar.bind(this);
  }
  /*
    pegarNome(texto) {
      if (texto.length > 0) {
        this.setState({ nome: 'Boas vindas: ' + texto })
      } else {
        this.setState({ nome: '' })
      }
    }
  */
entrar(){
  if (this.state.input === ""){
    alert("Digite o seu nome!")
    return;
  }
  this.setState({nome: "Welcome " + this.state.input})
}


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          styles={styles.input}
          placeholder='Digite o seu nome'
          underlineColorAndroid={'transparent'}
          onChangeText={(texto) => this.setState({ input: texto })}
        >
        </TextInput>
        <Button title="enviar" onPress={this.entrar} />
        <Text style={styles.texto}>{this.state.nome}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    alignItems: 'center'

  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#0072bb',
    margin: 10,
    fontSize: 20,
    padding: 10
  },
  texto: {
    textAlign: 'center',
    fontSize: 25,
    color: '#0072bb'
  }
})

export default App;