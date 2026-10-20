import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { login } from './api';

export default function LoginScreen({ onSucesso, irParaCadastro }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Atenção', 'Informe usuário e senha.');
      return;
    }
    setLoading(true);
    try {
      await login({ username, password });
      onSucesso();
    } catch (e) {
      Alert.alert('Erro no login', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entrar</Text>
      <TextInput style={styles.input} placeholder="Usuário" autoCapitalize="none" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={irParaCadastro}>
        <Text style={styles.link}>Não tenho conta · Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  botao: { backgroundColor: '#208AEC', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#208AEC', textAlign: 'center', marginTop: 20 },
});