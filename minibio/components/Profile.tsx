import { Image, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/foto.jpg')}
        style={styles.photo}
      />

      <Text style={styles.name}>Beatriz Pagliani</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },

  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#A8D5D1',
    marginBottom: 16,
  },

  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#315C68',
  },
});