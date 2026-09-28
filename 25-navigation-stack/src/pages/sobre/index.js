import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {useRoute, useNavigation} from '@react-navigation/native'

export default function Sobre(){
    const route = useRoute();
    const navigation = useNavigation()

    return(
        <View style={estilos.container}>
            <Text style={estilos.textoSobre}>Inter</Text>
            <Text>{route.params?.nome}</Text>
            <Text>{route.params?.email}</Text>
            <Button title="Entre em contato com os bancos" onPress={() => navigation.navigate('Contato')}/>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoSobre: {
        fontSize: 50,
        fontStyle: 'bold',
        color: '#FFA500'
    }
})