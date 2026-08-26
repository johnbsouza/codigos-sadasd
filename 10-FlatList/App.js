import { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Pessoa from './src/Pessoas/index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    feed: [
      { id: "1", nome: "Ana", idade: 36, email: "ana@senac.com" },
      { id: "2", nome: "Flavia ", idade: 25, email: "flavia@senac.com" },
      { id: "3", nome: "Carlos", idade: 70, email: "carlos@senac.com" },
      { id: "4", nome: "Marcelo", idade: 21, email: "marcelo@senac.com" },
      { id: "5", nome: "Bianca", idade: 27, email: "bianca@senac.com" },
      { id: "6", nome: "Karen", idade: 56, email: "karen@senac.com" }
    ]
  }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Pessoa data={item} />}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
})


export default App;