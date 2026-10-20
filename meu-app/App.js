import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen';
import PerfilScreen from './PerfilScreen';

export default function App() {
  const [tela, setTela] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('sessionToken')
      .then((token) => setTela(token ? 'perfil' : 'login'))
      .catch(() => setTela('login'));
  }, []);

  if (!tela) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      {tela === 'login' && (
        <LoginScreen onSucesso={() => setTela('perfil')} irParaCadastro={() => setTela('cadastro')} />
      )}
      {tela === 'cadastro' && (
        <CadastroScreen onSucesso={() => setTela('perfil')} irParaLogin={() => setTela('login')} />
      )}
      {tela === 'perfil' && <PerfilScreen onLogout={() => setTela('login')} />}
    </SafeAreaView>
  );
}