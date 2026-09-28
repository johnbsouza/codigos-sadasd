import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detalhes (){
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />
            <View style={styles.card}>
                <Ionicons name="fast-food" size={40} color="#00ADB5" style={{ marginBottom: 16 }} />
                <Text style={styles.title}>Página de Detalhes</Text>
                <Text style={styles.description}>Aqui você pode ver as informações completas do item selecionado.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
    },
});