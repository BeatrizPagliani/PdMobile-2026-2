import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Dado from './Dado';

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);
  const [vez, setVez] = useState(1);

  const [vitoriasJogador1, setVitoriasJogador1] = useState(0);
  const [vitoriasJogador2, setVitoriasJogador2] = useState(0);
  const [empates, setEmpates] = useState(0);

  const [resultado, setResultado] = useState('');
  const [finalizado, setFinalizado] = useState(false);

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogarJogador1() {
    const novoDado1 = sortearDado();
    const novoDado2 = sortearDado();

    setDadosJogador1([novoDado1, novoDado2]);
    setVez(2);
  }

  function jogarJogador2() {
    const novoDado1 = sortearDado();
    const novoDado2 = sortearDado();

    setDadosJogador2([novoDado1, novoDado2]);

    const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJogador2 = novoDado1 + novoDado2;

    let novoVitoriasJogador1 = vitoriasJogador1;
    let novoVitoriasJogador2 = vitoriasJogador2;
    let novoEmpates = empates;

    if (somaJogador1 > somaJogador2) {
      setResultado('Jogador 1 ganhou a rodada!');
      novoVitoriasJogador1++;
    } else if (somaJogador2 > somaJogador1) {
      setResultado('Jogador 2 ganhou a rodada!');
      novoVitoriasJogador2++;
    } else {
      setResultado('Empate na rodada!');
      novoEmpates++;
    }

    setVitoriasJogador1(novoVitoriasJogador1);
    setVitoriasJogador2(novoVitoriasJogador2);
    setEmpates(novoEmpates);

    if (rodada === 5) {
      setFinalizado(true);
    } else {
      setRodada(rodada + 1);
      setVez(1);
    }
  }

  function jogarNovamente() {
    setRodada(1);
    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);
    setVez(1);
    setVitoriasJogador1(0);
    setVitoriasJogador2(0);
    setEmpates(0);
    setResultado('');
    setFinalizado(false);
  }

  function resultadoFinal() {
    if (vitoriasJogador1 > vitoriasJogador2) {
      return 'Jogador 1 venceu a partida!';
    }

    if (vitoriasJogador2 > vitoriasJogador1) {
      return 'Jogador 2 venceu a partida!';
    }

    return 'A partida terminou empatada!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo de Dados</Text>

      <Text style={styles.rodada}>
        Rodada: {rodada} / 5
      </Text>

      <View style={styles.jogador}>
        <Text style={styles.nome}>Jogador 1</Text>

        <View style={styles.dados}>
          <Dado valor={dadosJogador1[0]} />
          <Dado valor={dadosJogador1[1]} />
        </View>

        <Text style={styles.soma}>
          Soma: {dadosJogador1[0] + dadosJogador1[1]}
        </Text>

        <TouchableOpacity
          style={[
            styles.botao,
            vez !== 1 && styles.botaoDesativado,
          ]}
          onPress={jogarJogador1}
          disabled={vez !== 1 || finalizado}
        >
          <Text style={styles.textoBotao}>Jogar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.jogador}>
        <Text style={styles.nome}>Jogador 2</Text>

        <View style={styles.dados}>
          <Dado valor={dadosJogador2[0]} />
          <Dado valor={dadosJogador2[1]} />
        </View>

        <Text style={styles.soma}>
          Soma: {dadosJogador2[0] + dadosJogador2[1]}
        </Text>

        <TouchableOpacity
          style={[
            styles.botao,
            vez !== 2 && styles.botaoDesativado,
          ]}
          onPress={jogarJogador2}
          disabled={vez !== 2 || finalizado}
        >
          <Text style={styles.textoBotao}>Jogar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultado}>{resultado}</Text>

      <Text style={styles.placar}>
        Jogador 1: {vitoriasJogador1} vitória(s)
      </Text>

      <Text style={styles.placar}>
        Jogador 2: {vitoriasJogador2} vitória(s)
      </Text>

      <Text style={styles.placar}>
        Empates: {empates}
      </Text>

      {finalizado && (
        <View style={styles.final}>
          <Text style={styles.resultadoFinal}>
            {resultadoFinal()}
          </Text>

          <TouchableOpacity
            style={styles.botaoNovamente}
            onPress={jogarNovamente}
          >
            <Text style={styles.textoBotao}>
              Jogar Novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  rodada: {
    fontSize: 20,
    marginBottom: 20,
  },

  jogador: {
    alignItems: 'center',
    marginBottom: 20,
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  dados: {
    flexDirection: 'row',
    gap: 10,
  },

  soma: {
    fontSize: 18,
    marginTop: 5,
  },

  botao: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  botaoDesativado: {
    opacity: 0.4,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  resultado: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },

  placar: {
    fontSize: 16,
  },

  final: {
    alignItems: 'center',
    marginTop: 15,
  },

  resultadoFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  botaoNovamente: {
    backgroundColor: '#333',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
