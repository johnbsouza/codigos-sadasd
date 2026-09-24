import React from "react";

import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';


import Sobre from './src/pages/sobre';
import Home from "./src/pages/home";
import Contato from './src/pages/contato';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
        options={{
          title: 'Tela inicial do App',
          headerStyle:{
            backgroundColor: '#121212'
          },
          headerTintColor: '#a7e121',

          headerShown: false
        }}
        />          
        <Stack.Screen name="Sobre" component={Sobre}
          options={{
            title: 'Sobre a empresa'
          }}
          />

          <Stack.Screen name="Contato" component={Contato}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}