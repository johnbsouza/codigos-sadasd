import React, {useRef, useEffect} from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
 
export default function App(){
 
const larguraAnimada = useRef(new Animated.Value(0)).current;
const alturaAnimada = useRef(new Animated.Value(50)).current;
//const opacidadeAnimada = useRef(new Animated.Value(1)).current;
 
  useEffect(() => {
    Animated.sequence([
      Animated.timing(larguraAnimada, {
        toValue: 200,
        duration: 4000,
        useNativeDriver: false
      }),

      Animated.timing(alturaAnimada, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false
    })
    ]).start();
  }, [])

  let porcentagemLargura = larguraAnimada.interpolate({
    //Entrada
    inputRange: [0, 100],
 
    //Vai sair de 0% até 100% da largura do elemento
    outputRange: ['0%', '100%']
  })

  let porcentagemAltura = alturaAnimada.interpolate({
    //Entrada
    inputRange: [50, 100],
 
    //Vai sair de 0% até 100% da largura do elemento
    outputRange: ['5%', '100%']
  })
 
  return(
    <View style= {estilos.container}>
      <Animated.View
      style={{
        width: porcentagemLargura,
        height: porcentagemAltura,
        backgroundColor: '#f54927a4',
        justifyContent: 'center',
      //  borderRadius: 20,
      //  borderColor: '#aae700ff',
       // borderWidth: 4,
        //opacity: opacidadeAnimada
      }}>

        <Text style={estilos.texto}>
          TESTE
        </Text>
        
 
      </Animated.View>
    </View>
  )
}
 
const estilos = StyleSheet.create({
  texto: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000ff'
    
  }
})