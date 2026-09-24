import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { useRoute, useNavigation } from '@react-navigation/native';

export default function Home(){

    const route = useRoute();
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text>Tela sobre</Text>
            <Text>{route.params?.nome}</Text>
            <Text>{route.params?.email}</Text>
            <Button title="Vá para contatos" onPress={() => navigation.navigate('Contato')}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#05f3e7ff',
        alignItems: 'center',
    
    }
})