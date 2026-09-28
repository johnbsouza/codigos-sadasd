import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Detalhes (){
    return(
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
            <View style={styles.card}>
                <View style={styles.iconHeader}>
                    <Ionicons name="sparkles" size={28} color="#2997ff" />
                </View>
                <Text style={styles.title}>Detalhes da Experiência</Text>
                <Text style={styles.description}>Informações completas e especificações refinadas do item selecionado.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 28,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    iconHeader: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(41, 151, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(41, 151, 255, 0.2)',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1D1D1F',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#86868b',
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: -0.1,
    },
});