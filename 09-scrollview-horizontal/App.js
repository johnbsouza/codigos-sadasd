import { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={estilos.container}>,
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={estilos.box1}></View>
        <View style={estilos.box2}></View>
        <View style={estilos.box3}></View>
        <View style={estilos.box4}></View>
        <View style={estilos.box5}></View>
        </ScrollView>        
      </View>
    )
  }
}
const estilos = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    backgroundColor: 'blue',
    height: 150,
    width: 150,
    borderRadius: 500
  },
  box2: {
    backgroundColor: 'orange',
    height: 150,
    width: 150,
    borderRadius: 500
  },
  box3: {
    backgroundColor: 'purple',
    height: 150,
    width: 150,
    borderRadius: 500
  },
   box4: {
    backgroundColor: 'green',
    height: 150,
    width: 150,
    borderRadius: 500
  },
   box5: {
    backgroundColor: 'red',
    height: 150,
    width: 150,
    borderRadius: 500
  },
  
})
export default App;