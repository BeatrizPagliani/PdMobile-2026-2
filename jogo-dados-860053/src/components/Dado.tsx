import { Image, StyleSheet } from 'react-native';

type Props = {
  valor: number;
};

export default function Dado({ valor }: Props) {
  const imagens = {
    1: require('../../assets/dados/dado1.png'),
    2: require('../../assets/dados/dado2.png'),
    3: require('../../assets/dados/dado3.png'),
    4: require('../../assets/dados/dado4.png'),
    5: require('../../assets/dados/dado5.png'),
    6: require('../../assets/dados/dado6.png'),
  };

  return (
    <Image
      source={imagens[valor as keyof typeof imagens]}
      style={styles.dado}
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 80,
    height: 80,
  },
});