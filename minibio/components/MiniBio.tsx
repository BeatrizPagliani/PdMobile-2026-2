import { StyleSheet, Text, View } from 'react-native';
import Profile from './Profile';

export default function MiniBio() {
  return (
    <View style={styles.card}>
      <Profile />

      <View style={styles.divider} />

      <Text style={styles.bio}>
        Sou estudante de tecnologia e tenho interesse em aprender,
        criar projetos e transformar ideias em soluções através da programação.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#F7FCFC',
    borderRadius: 24,
    padding: 28,

    borderWidth: 1,
    borderColor: '#C8E4E2',

    shadowColor: '#315C68',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,

    elevation: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#C8E4E2',
    marginBottom: 20,
  },

  bio: {
    fontSize: 17,
    lineHeight: 27,
    textAlign: 'center',
    color: '#4F6971',
  },
});