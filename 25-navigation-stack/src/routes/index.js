import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feather from 'react-native-vector-icons/Feather';

import Stack from './stack';
import Inter from '../pages/sobre';
import PicPay from '../pages/contato';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:'#1877F2',
        tabBarStyle:{
          backgroundColor: '#6441A5',
          borderTopWidth: 0
        }
      }}
      >
        <Tab.Screen name="HomeStack" component={Stack}
        options={{
          tabBarIcon:({color, size}) => {
            return <Feather name="twitch" color={color} size={size}/>
          }
        }}
        />
        <Tab.Screen name="Sobre" component={Inter}
        options={{
          tabBarIcon:({color, size}) => {
            return <Feather name="thumbs-up" color={color} size={size}/>
          } 
        }}
        />
        <Tab.Screen name="Contato" component={PicPay}
        options={{
          tabBarIcon:({color, size}) => {
            return <Feather name="github" color={color} size={size}/>
          } 
        }}
        />
      </Tab.Navigator>
  )
}