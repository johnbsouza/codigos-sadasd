import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function App() {
  return (
    <View style={estilos.container}>
      <Animatable.View 
        animation="rubberBand"
        duration={5000}
        iterationCount={Infinity}
        style={estilos.animacaoContainer}
      >
        <Text style={estilos.textoOriginal}>TESTE</Text>
        <View style={estilos.linha} />
        <Text style={estilos.textoReflexo}>TESTE</Text>
      </Animatable.View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffff'
  },
  animacaoContainer: {
    alignItems: 'center',
  },
  textoOriginal: {
    color: '#61933a',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    letterSpacing: 35,
    textTransform: 'uppercase',
    writingDirection: 'ltr'
  },
  linha: {
    width: 300,
    height: 1,
    backgroundColor: '#5c0000ff',
    marginBottom: 5,
    marginTop: 5,
  },
  textoReflexo: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    letterSpacing: 35,
    textTransform: 'uppercase',
    writingDirection: 'ltr',
    transform: [{ scaleY: -1 }],
    color: 'transparent',
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8.5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ff0000ff',
    textAlign: 'center',
    marginBottom: 10
  }
});