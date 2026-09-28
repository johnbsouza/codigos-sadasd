import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/home";
import Detalhes from "../pages/detalhes";

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#121212',
                    borderBottomWidth: 1,
                    borderBottomColor: '#2A2A2A',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                },
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen  
                name="Detalhes" 
                component={Detalhes} 
                options={{ title: 'Detalhes do Prato' }} 
            />
        </Stack.Navigator>
    );
}