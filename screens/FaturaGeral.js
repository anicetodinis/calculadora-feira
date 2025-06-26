import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function FaturaGeral({ compras }) {
  const totalClientes = compras.length;
  const totalDoacoes = compras.reduce((acc, c) => acc + c.doacao, 0);
  const totalReceita = compras.reduce((acc, c) => acc + c.total, 0);

  const totalPorPrato = {
    arroz: 0,
    sanduiche: 0,
    sopa: 0
  };

  compras.forEach(c => {
    if (totalPorPrato[c.prato] !== undefined) {
      totalPorPrato[c.prato] += c.quantidade;
    }
  });

  const nomePrato = (key) => {
    switch (key) {
      case 'arroz': return 'Arroz com Frango';
      case 'sanduiche': return 'Sanduíche de Carne';
      case 'sopa': return 'Sopa de Legumes';
      default: return key;
    }
  };

  const gerarHTML = () => {
    return `
      <html>
        <body>
          <h1>Fatura Geral - Feira de Alimentos</h1>
          <p><strong>Total de Clientes:</strong> ${totalClientes}</p>
          <p><strong>Total de Doações:</strong> ${totalDoacoes.toFixed(2)} MT</p>
          <p><strongReceita Total:</strong> ${totalReceita.toFixed(2)} MT</p>
          <h2>Quantidade por Prato</h2>
          <ul>
            ${Object.keys(totalPorPrato).map(prato => `<li>${nomePrato(prato)}: ${totalPorPrato[prato]} unidades</li>`).join('')}
          </ul>
          <h2>Detalhes das Compras</h2>
          ${compras.map(c => `
            <div style="margin-bottom: 12px;">
              <strong>Cliente:</strong> ${c.cliente}<br/>
              Prato: ${nomePrato(c.prato)}<br/>
              Quantidade: ${c.quantidade}<br/>
              Doação: ${c.doacao.toFixed(2)} MT<br/>
              Subtotal: ${c.subtotal.toFixed(2)} MT<br/>
              Desconto: ${c.desconto.toFixed(2)} MT<br/>
              <strong>Total:</strong> ${c.total.toFixed(2)} MT
            </div>
          `).join('')}
        </body>
      </html>
    `;
  };

  const exportarPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html: gerarHTML() });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fatura Geral</Text>
      <Text style={styles.item}>👥 Total de Clientes: {totalClientes}</Text>
      <Text style={styles.item}>🙏 Total de Doações: {totalDoacoes.toFixed(2)} MT</Text>
      <Text style={styles.item}>💰 Receita Total: {totalReceita.toFixed(2)} MT</Text>

      <Text style={styles.subtitle}>Quantidade Total Vendida por Prato:</Text>
      {Object.keys(totalPorPrato).map(prato => (
        <Text key={prato} style={styles.item}>
          🍽️ {nomePrato(prato)}: {totalPorPrato[prato]} unidades
        </Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="📄 Gerar PDF da Fatura" onPress={exportarPDF} />
      </View>

      <Text style={styles.subtitle}>Detalhes das Compras:</Text>
      {compras.map((c, index) => (
        <View key={index} style={styles.compra}>
          <Text style={styles.compraTitulo}>👤 Cliente: {c.cliente}</Text>
          <Text>Prato: {nomePrato(c.prato)}</Text>
          <Text>Quantidade: {c.quantidade}</Text>
          <Text>Doação: {c.doacao.toFixed(2)} MT</Text>
          <Text>Subtotal: {c.subtotal.toFixed(2)} MT</Text>
          <Text>Desconto: {c.desconto.toFixed(2)} MT</Text>
          <Text style={styles.total}>Total: {c.total.toFixed(2)} MT</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  subtitle: { marginTop: 20, fontSize: 18, fontWeight: '600' },
  item: { fontSize: 16, marginBottom: 8 },
  compra: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  compraTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  },
  total: { fontWeight: 'bold', marginTop: 5, color: '#006400' }
}); 
