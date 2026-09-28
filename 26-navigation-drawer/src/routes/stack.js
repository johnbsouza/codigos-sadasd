import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "../pages/home";
import Detalhes from "../pages/detalhes";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5EA',
                },
                headerTintColor: '#1D1D1F',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 17,
                    letterSpacing: -0.4,
                },
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={({ navigation }) => ({
                    title: 'Explorar',
                    headerLeft: () => (
                        <TouchableOpacity 
                            onPress={() => navigation.openDrawer()}
                            style={{ marginRight: 16, padding: 4 }}
                            activeOpacity={0.6}
                        >
                            <Ionicons name="menu" size={24} color="#2997ff" />
                        </TouchableOpacity>
                    ),
                })} 
            />
            <Stack.Screen  
                name="Detalhes" 
                component={Detalhes} 
                options={{ title: 'Detalhes' }} 
            />
        </Stack.Navigator>
    );
}