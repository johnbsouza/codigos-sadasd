import React, { Component, component } from 'react';
import { View, Text, Button } from 'react-native';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: ''
    };

    //deixando a função acessar as propriedades
    this.entrar = this.entrar.bind(this)
  }
  entrar() {
    this.setState({
      nome: 'Ana Claudia'

    })


  }
  render() {
    return (
      <View style={{ marginTop: 350 }}>



        <Button title="Entrar" color="#a50570ff" onPress={this.entrar} />
        <Text style={{ textDecorationLine: 'underline', fontSize: 55, color: '#61933A', textAlign: 'center' }}>
  {this.state.nome}
</Text>
      </View>

    );
  }
}

export default App;