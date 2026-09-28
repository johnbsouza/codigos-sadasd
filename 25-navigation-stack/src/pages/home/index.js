import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const Navigation = useNavigation();

    function goingToSobre(){
        Navigation.navigate('Sobre', {nome: 'Alguém', email: 'mail@email.com'})
    }

    function goingtoDetalhes(){
        Navigation.navigate('Detalhes')
    }

    return(
        <View style={estilos.container}>
            <Text style={estilos.textoHome}>Nubank</Text>
            <Button title="Converta-se para o banco Inter" onPress={goingToSobre}/>
            <Button title="Converta-se para o C6Bank" onPress={goingtoDetalhes}/>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoHome: {
        fontSize: 50,
        fontStyle: 'bold',
        color: '#9c44d1'
    }
})