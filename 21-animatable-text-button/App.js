import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

export default function App() {
  const ButtonAnimation = Animatable.createAnimatableComponent(TouchableOpacity);
  const buttonRef = useRef(null);

  function handlePress() {
    if (buttonRef.current) {
      // Efeito elástico ao clicar
      buttonRef.current.animate("rubberBand", 500);
    }
  }

  return (
    <View style={estilos.container}>
      <Animatable.View
        animation="fadeIn"
        duration={800}
        style={estilos.animacaoContainer}
      >
        
        {/* Animação 1: Texto surgindo de cima */}
        <Animatable.Text 
          animation="fadeInDown" 
          duration={1200} 
          style={estilos.textoOriginal}
        >
          TESTE
        </Animatable.Text>

        {/* Animação 2: Linha expandindo do centro */}
        <Animatable.View 
          animation="zoomIn" 
          delay={600} 
          duration={800} 
          style={estilos.linha} 
        />
        
        {/* Animação 3: Botão saltando de baixo */}
        <ButtonAnimation 
          ref={buttonRef}
          onPress={handlePress}
          style={estilos.Button} 
          animation="bounceInUp" 
          delay={1100}
          duration={1500}
        >
          <Text style={estilos.ButtonText}>Clique aqui</Text>
        </ButtonAnimation>

      </Animatable.View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  animacaoContainer: {
    alignItems: 'center',
  },
  textoOriginal: {
    color: '#61933a',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'tahoma',
    fontWeight: 'bold',
    letterSpacing: 15,
    textTransform: 'uppercase',
  },
  linha: {
    width: 250,
    height: 1.5,
    backgroundColor: '#8B7D7B',
    marginBottom: 20,
    marginTop: 5,
  },
  Button: {
    width: 200,
    height: 50,
    backgroundColor: '#C58D6E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});