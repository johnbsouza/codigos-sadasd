import React, { Component } from "react";
import { View, Text, } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor:'#6cc8f3ff'}}>
        <View style={{ flex: 0.5, backgroundColor: '#fce300ff'}}></View>
        <View style={{ flex: 1, backgroundColor: '#2f8805ff'}}></View>
        <View style={{ flex: 1, backgroundColor: '#0674a7ff'}}></View>
        

      </View>
    );
  }
}
 export default App;