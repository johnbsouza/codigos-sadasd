import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={styles.area}>
        <Text style={styles.textoPrincipal}>Primeiro Texto</Text>
        <Text style={styles.alinhaTexto}>Segundo Texto</Text>
        <Text>Terceiro Texto</Text>
        <Text style={styles.textoPrincipal}>Quarto Texto</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    marginTop: 40,
  },
  textoPrincipal: {
    fontSize: 25,
    color: '#B22222',
    textDecorationLine: 'underline',    
  },
  alinhaTexto: {
    textAlign: 'center'
  }

})

export default App;