import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feira de Alimentos</Text>
      <Button title="Registrar Compra de Cliente" onPress={() => navigation.navigate('Registrar Compra')} />
      <View style={{ marginTop: 20 }} />
      <Button title="Ver Fatura Geral" onPress={() => navigation.navigate('Fatura Geral')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  }
});
