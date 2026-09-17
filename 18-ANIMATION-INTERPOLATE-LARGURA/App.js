import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function App() {
  const larguraAnimada = useRef(new Animated.Value(0)).current;
  const alturaAnimada = useRef(new Animated.Value(30)).current;
 // const opacidadeAnimada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(larguraAnimada, {
      toValue: 100,
      duration: 4000,
      useNativeDriver: false
    }).start();
  }, [])

  let porcentagemLargura = larguraAnimada.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  })

 
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: porcentagemLargura,
          height: alturaAnimada,
          backgroundColor: '#ffee00ff',
          justifyContent: 'center',
          borderColor: '#ff0000ff',
         // borderWidth: 2,
         // borderRadius: 30,
          //  opacity: opacidadeAnimada

        }}
      >
        { /* <Text style={{ textAlign: 'center', fontSize: 20, color: '#ffffffff' }}>
          Testando efeito...
        </Text> */}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})