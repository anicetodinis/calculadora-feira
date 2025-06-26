import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CompraForm({ navigation, registrarCompra }) {
  const [cliente, setCliente] = useState('');
  const [prato, setPrato] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [doacao, setDoacao] = useState('');

  const [erros, setErros] = useState({});

  const precos = {
    arroz: 250,
    sanduiche: 150,
    sopa: 100,
  };

  const validarCampos = () => {
    const novoErros = {};
    if (!cliente.trim()) novoErros.cliente = true;
    if (!prato) novoErros.prato = true;
    if (!quantidade || parseInt(quantidade) <= 0) novoErros.quantidade = true;

    setErros(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  const limparFormulario = () => {
    setCliente('');
    setPrato('');
    setQuantidade('');
    setDoacao('');
    setErros({});
  };

  const calcularCompra = () => {
    if (!validarCampos()) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    const qtd = parseInt(quantidade) || 0;
    const valorDoacao = parseFloat(doacao) || 0;
    const subtotal = precos[prato] * qtd;
    let desconto = 0;

    if (qtd >= 5) desconto += subtotal * 0.15;
    const valorComDesconto = subtotal - desconto;
    if (valorDoacao >= 50) desconto += valorComDesconto * 0.05;

    const total = subtotal - desconto;

    const compra = {
      cliente,
      prato,
      quantidade: qtd,
      doacao: valorDoacao,
      subtotal,
      desconto,
      total
    };

    registrarCompra(compra);
    Alert.alert('Compra registrada!', `Cliente: ${cliente}\nTotal: ${total.toFixed(2)} MT`);
    limparFormulario();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Cliente:</Text>
      <TextInput
        style={[styles.input, erros.cliente && styles.inputErro]}
        value={cliente}
        onChangeText={setCliente}
        placeholder="Nome completo"
      />

      <Text style={styles.label}>Selecionar Prato:</Text>
      <View style={[styles.pickerWrapper, erros.prato && styles.inputErro]}>
        <Picker selectedValue={prato} onValueChange={setPrato}>
          <Picker.Item label="-- Selecione um prato --" value="" />
          <Picker.Item label="Arroz com Frango (250 MT)" value="arroz" />
          <Picker.Item label="Sanduíche de Carne (150 MT)" value="sanduiche" />
          <Picker.Item label="Sopa de Legumes (100 MT)" value="sopa" />
        </Picker>
      </View>

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={[styles.input, erros.quantidade && styles.inputErro]}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholder="Ex: 3"
      />

      <Text style={styles.label}>Doação (opcional):</Text>
      <TextInput
        style={styles.input}
        value={doacao}
        onChangeText={setDoacao}
        keyboardType="numeric"
        placeholder="Ex: 50"
      />

      <Button title="Registrar Compra" onPress={calcularCompra} />
      <View style={{ marginTop: 10 }} />
      <Button title="Limpar Formulário" color="gray" onPress={limparFormulario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 6
  },
  inputErro: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
});
