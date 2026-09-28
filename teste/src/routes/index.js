import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Feather from 'react-native-vector-icons/Feather';

import Stack from './stack';
import Home from '../pages/home';
import Detalhes from "../pages/detalhes";

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1877F2',
                tabBarStyle: {
                    backgroundColor: '#6441A5',
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen name="HomeStack" component={Stack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="house" color={color} size={size} />
                    }
                }}
            />
            <Tab.Screen name="DetalhesStack" component={Stack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="thumbs-up" color={color} size={size} />
                    }
                }}
            />
        </Tab.Navigator>
    )
}