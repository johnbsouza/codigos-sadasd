import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
 
export default function Home() {

    const navigation = useNavigation();

    function navegaSobre(){
        navigation.navigate('Sobre', {nome: 'Brendo', email: 'brendo0809@gmail.com'})
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo</Text>
      <Text style={styles.subtitle}>Este é um aplicativo React Native simples.</Text>
      <Button title="Vá para sobre" onPress={navegaSobre}/>
    </View>
  );
}
 
const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#6f06f8ff",
  },
  subtitle: {
    fontSize: 16,
    color: "#6f06f8ff",
  },
});