import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompraForm from './screens/CompraForm';
import FaturaGeral from './screens/FaturaGeral';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [compras, setCompras] = useState([]);

  const registrarCompra = (novaCompra) => {
    setCompras([...compras, novaCompra]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Compra') iconName = 'create-outline';
            else if (route.name === 'Fatura Geral') iconName = 'bar-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e8b57',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Compra">
          {props => <CompraForm {...props} registrarCompra={registrarCompra} />}
        </Tab.Screen>
        <Tab.Screen name="Fatura Geral">
          {props => <FaturaGeral {...props} compras={compras} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
