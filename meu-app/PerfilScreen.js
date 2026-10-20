import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { usuarioLogado, logout } from './api';

export default function PerfilScreen({ onLogout }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const u = await usuarioLogado();
        if (!u) return onLogout();
        setUsuario(u);
      } catch (e) {
        Alert.alert('Sessão inválida', e.message);
        await logout();
        onLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleLogout() {
    await logout();
    onLogout();
  }

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#208AEC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu perfil</Text>
      <View style={styles.card}>
        <Linha rotulo="ID" valor={usuario?.objectId} />
        <Linha rotulo="Usuário" valor={usuario?.username} />
        <Linha rotulo="E-mail" valor={usuario?.email} />
        <Linha rotulo="Criado em" valor={usuario?.createdAt && new Date(usuario.createdAt).toLocaleString('pt-BR')} />
      </View>
      <TouchableOpacity style={styles.botao} onPress={handleLogout}>
        <Text style={styles.botaoTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

function Linha({ rotulo, valor }) {
  return (
    <View style={styles.linha}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.valor}>{valor || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  card: { backgroundColor: '#f2f4f7', borderRadius: 12, padding: 16, marginBottom: 24 },
  linha: { marginBottom: 12 },
  rotulo: { fontSize: 12, color: '#666', textTransform: 'uppercase' },
  valor: { fontSize: 16, fontWeight: '600' },
  botao: { backgroundColor: '#d9372b', padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});