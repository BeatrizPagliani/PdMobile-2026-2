import { StyleSheet, View } from 'react-native';

import JogoDados from '@/components/JogoDados';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <JogoDados />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});