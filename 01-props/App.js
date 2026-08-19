import React, { Component } from "react";
import { View, Text, Image } from "react-native";

class App extends Component {
  render() {

    let nome = 'Bob';

    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Hello World!</Text>
        <Text style={{ color: '#004b7cff', fontSize: 25, margin: 30 }}>OLA </Text>

        <Text style={{ color: '#669a48', fontSize: 40 }}>{nome}</Text>

        <Bob largura={300} altura={250} nomeando="Bob Esponja" />
      </View>
    );
  }
}



export default App;

class Bob extends Component {
  render() {
    let image = 'https://pngimg.com/uploads/spongebob/spongebob_PNG48.png';

    return (
      <View>
        <Image
          source={{ uri: image }}
          style={{ width: this.props.largura, height: this.props.altura, alignItems: 'center' }}
        />

        <Text>{this.props.nomeando}</Text>
      </View>
    );
  }
}