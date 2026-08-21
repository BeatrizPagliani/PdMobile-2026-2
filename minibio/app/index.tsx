import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MiniBio from '../components/MiniBio';

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          App criado para a disciplina
        </Text>

        <Text style={styles.subtitle}>
          Programação para Dispositivos Móveis
        </Text>
      </View>

      <MiniBio />

      <Text style={styles.footer}>
        React Native + Expo
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 24,
    paddingVertical: 50,

    backgroundColor: '#EAF6F6',
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#315C68',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#5C9D9A',
    marginTop: 6,
  },

  footer: {
    marginTop: 28,
    fontSize: 13,
    color: '#78949A',
  },
});