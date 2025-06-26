# 📱 Aplicativo de Cálculo de Receita - Feira de Alimentos

Este é um aplicativo móvel desenvolvido em **React Native com Expo** para registrar e calcular a receita de vendas em uma feira de alimentos.

A aplicação permite:

- 📥 Registro individual de compras por cliente
- 💸 Aplicação de descontos por quantidade e doação
- 📄 Geração de fatura individual em PDF
- 📊 Exibição e exportação da fatura geral
- 📦 Geração de APK para Android com EAS Build

---

## ⚙️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [EAS Build (Expo Application Services)](https://docs.expo.dev/build/introduction/)
- [expo-print](https://docs.expo.dev/versions/latest/sdk/print/)
- [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/)
- [@react-native-picker/picker](https://github.com/react-native-picker/picker)

---

## 📦 Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Git](https://git-scm.com/)
- `expo-cli` ou `npx expo`
- `eas-cli` (para gerar APK)
- Aplicativo [Expo Go](https://expo.dev/client) no celular
- Conta gratuita na [Expo.dev](https://expo.dev/)

---

## 📥 Instalação do Projeto

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

## ▶️ Como Executar o Projeto
Para executar no celular com Expo Go:

```bash
npx expo start
```
Escaneie o QR code exibido no terminal com o Expo Go App
Ou pressione a para abrir no emulador Android (se configurado)

## 💼 Funcionalidades da Aplicação
1. Registro de Compras
Seleciona o nome do cliente

Escolhe um dos três pratos disponíveis:

Arroz com Frango (250MT)

Sanduíche de Carne (150MT)

Sopa de Legumes (100MT)

Informa a quantidade

Informa a doação voluntária (opcional)

2. Regras de Desconto
15% de desconto para compras de 5 ou mais pratos

5% extras se a doação for igual ou superior a 50MT

3. Fatura Individual
Após registrar a compra, é possível gerar e compartilhar um PDF com todos os detalhes da fatura individual

4. Fatura Geral
Exibe um resumo de todas as compras:

Total por tipo de prato

Receita total

Doações somadas

Possibilidade de exportar a fatura geral como PDF

🏗️ Como Gerar o APK do App (Android)
1. Instale a CLI do EAS
```bash
npm install -g eas-cli
```
2. Configure o EAS no projeto
```bash
npx eas build:configure
```
Isso criará o ficheiro eas.json.

Exemplo de configuração mínima:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```
Altere "apk" para "app-bundle" se quiser gerar um .aab para Play Store.

3. Configure o app.json
```json
{
  "expo": {
    "name": "Calculadora Feira",
    "slug": "calculadora-feira",
    "version": "1.0.0",
    "android": {
      "package": "com.seunome.calculadora",
      "versionCode": 1
    }
  }
}
```
4. Faça login no Expo
```bash
eas login
```
5. Inicie o build do APK
```bash
eas build --platform android --profile production
```
Após a conclusão, um link será exibido no terminal para download do arquivo .apk.


 Estrutura de Pastas
```pgsql
.
├── App.js
├── screens/
│   ├── CompraForm.js
│   └── FaturaGeral.js
├── assets/
├── app.json
├── eas.json
└── README.md
```
🧑‍💻 Autor
Desenvolvido por Aniceto Dinis
📧 anicetodinis@email.com
