import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Button, Modal } from "react-native";

class Entrarmodal extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#292929", width: '100%', height: 350, borderRadius: 50, marginTop: 150 }}>
                <Text style={{ padding: 10, color: 'red', fontSize: 28, textAlign: 'center', marginTop: 50, marginBottom: 50 }}>Boas Vindas</Text>
                <Button title="Sair" onPress={this.props.fecharmodal} />
            </View>
        )
    }
}

export default Entrarmodal;