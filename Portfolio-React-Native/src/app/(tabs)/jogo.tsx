import { useState, useEffect, useCallback } from 'react'
import {
  View, Text, Pressable, ScrollView, StyleSheet, Modal,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { ForcaSVG } from '../../components/ForcaSVG'
import { PALAVRAS } from '../../constants/palavras'

const MAX_ERROS = 6

const TECLADO = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
]

function sortear() {
  return PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]
}

export default function JogoScreen() {
  const { colors, isDark } = useTheme()
  const [entrada, setEntrada] = useState(() => sortear())
  const [tentativas, setTentativas] = useState<string[]>([])

  const { palavra, dica } = entrada

  const letrasErradas = tentativas.filter(l => !palavra.includes(l))
  const erros = letrasErradas.length

  const palavraVisivel = palavra.split('').map(l =>
    l === ' ' ? ' ' : tentativas.includes(l) ? l : '_'
  )

  const ganhou = palavra.split('').filter(l => l !== ' ').every(l => tentativas.includes(l))
  const perdeu = erros >= MAX_ERROS
  const status = ganhou ? 'ganhou' : perdeu ? 'perdeu' : 'jogando'

  const chutar = useCallback((letra: string) => {
    if (status !== 'jogando' || tentativas.includes(letra)) return
    setTentativas(prev => [...prev, letra])
  }, [status, tentativas])

  const reiniciar = () => {
    setEntrada(sortear())
    setTentativas([])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: isDark ? '#222' : '#e0e0e0' }]}>
        <Text style={styles.headerTitulo}>Jogo da Forca</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.errosContador, { color: colors.textMuted }]}>
            <Text style={{ color: '#e040fb', fontFamily: 'Montserrat_700Bold' }}>{erros}</Text>
            /{MAX_ERROS}
          </Text>
          <Pressable onPress={reiniciar} style={styles.btnReiniciar}>
            <Text style={styles.btnReiniciarText}>Reiniciar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
        <ForcaSVG erros={erros} />
        <Text style={[styles.dica, { color: colors.textSubtle }]}>
          <Text style={{ color: '#9810fa', fontFamily: 'Montserrat_700Bold' }}>Dica: </Text>
          {dica}
        </Text>

        <View style={styles.palavraRow}>
          {palavraVisivel.map((letra, i) =>
            letra === ' ' ? (
              <View key={i} style={styles.espaco} />
            ) : (
              <View
                key={i}
                style={[
                  styles.letraBox,
                  { borderBottomColor: letra !== '_' ? '#9810fa' : (isDark ? '#444' : '#ccc') },
                ]}
              >
                <Text style={[
                  styles.letraText,
                  { color: letra !== '_' ? '#e040fb' : colors.text },
                ]}>
                  {letra !== '_' ? letra : ''}
                </Text>
              </View>
            )
          )}
        </View>

        <View style={styles.erradasSection}>
          <Text style={[styles.erradasLabel, { color: colors.textSubtle }]}>ERROS</Text>
          <View style={styles.erradasRow}>
            {letrasErradas.length === 0
              ? <Text style={{ color: '#333', fontFamily: 'Montserrat_400Regular' }}>—</Text>
              : letrasErradas.map(l => (
                <View key={l} style={styles.pillErro}>
                  <Text style={styles.pillErroText}>{l}</Text>
                </View>
              ))
            }
          </View>
        </View>

        <View style={styles.teclado}>
          {TECLADO.map((linha, i) => (
            <View key={i} style={styles.tecladoLinha}>
              {linha.map(letra => {
                const tentada = tentativas.includes(letra)
                const acertou = tentada && palavra.includes(letra)
                const errou = tentada && !palavra.includes(letra)
                return (
                  <Pressable
                    key={letra}
                    onPress={() => chutar(letra)}
                    disabled={tentada || status !== 'jogando'}
                    style={[
                      styles.tecla,
                      { backgroundColor: isDark ? '#1a1a1a' : '#f0f0f0',
                        borderColor: isDark ? '#333' : '#ccc' },
                      acertou && styles.teclaAcertou,
                      errou && styles.teclaErrou,
                    ]}
                  >
                    <Text style={[
                      styles.teclaText,
                      { color: isDark ? '#f0f0f0' : '#111' },
                      acertou && { color: '#e040fb' },
                      errou && { color: '#ff4d4d', opacity: 0.5 },
                    ]}>
                      {letra}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={status !== 'jogando'} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[
            styles.modal,
            { backgroundColor: isDark ? '#111' : 'white' },
            status === 'ganhou' && styles.modalGanhou,
            status === 'perdeu' && styles.modalPerdeu,
          ]}>
            <Text style={styles.modalEmoji}>{status === 'ganhou' ? '🎉' : '💀'}</Text>
            <Text style={[
              styles.modalTitulo,
              { color: status === 'ganhou' ? '#9810fa' : '#ff4d4d' },
            ]}>
              {status === 'ganhou' ? 'Você ganhou!' : 'Você perdeu!'}
            </Text>
            <Text style={[styles.modalPalavra, { color: colors.textMuted }]}>
              A palavra era:{' '}
              <Text style={{ color: colors.text, letterSpacing: 2, fontFamily: 'Montserrat_700Bold' }}>
                {palavra}
              </Text>
            </Text>
            <Pressable onPress={reiniciar} style={styles.btnJogarNovamente}>
              <Text style={styles.btnJogarText}>Jogar novamente</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitulo: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
    color: '#9810fa',
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  errosContador: { fontSize: 16, fontFamily: 'Montserrat_400Regular' },
  btnReiniciar: {
    backgroundColor: '#9810fa',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnReiniciarText: { color: 'white', fontSize: 13, fontFamily: 'Montserrat_700Bold' },
  main: { alignItems: 'center', padding: 24, gap: 20, paddingBottom: 40 },
  dica: { fontSize: 13, textAlign: 'center', maxWidth: 260, fontFamily: 'Montserrat_400Regular' },
  palavraRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  letraBox: {
    width: 32,
    height: 44,
    borderBottomWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letraText: { fontSize: 20, fontFamily: 'Montserrat_700Bold' },
  espaco: { width: 20 },
  erradasSection: { alignItems: 'center', gap: 8 },
  erradasLabel: {
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: 'Montserrat_400Regular',
    textTransform: 'uppercase',
  },
  erradasRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  pillErro: {
    backgroundColor: 'rgba(255,77,77,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,77,77,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pillErroText: { color: '#ff4d4d', fontSize: 13, fontFamily: 'Montserrat_700Bold' },
  teclado: { gap: 8, alignItems: 'center', width: '100%' },
  tecladoLinha: { flexDirection: 'row', gap: 5, flexWrap: 'wrap', justifyContent: 'center' },
  tecla: {
    width: 34,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teclaAcertou: {
    backgroundColor: 'rgba(152,16,250,0.2)',
    borderColor: '#9810fa',
  },
  teclaErrou: {
    backgroundColor: 'rgba(255,77,77,0.1)',
    borderColor: 'rgba(255,77,77,0.3)',
  },
  teclaText: { fontSize: 13, fontFamily: 'Montserrat_700Bold' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    gap: 16,
    width: '85%',
    maxWidth: 340,
  },
  modalGanhou: { borderWidth: 1, borderColor: 'rgba(152,16,250,0.4)' },
  modalPerdeu: { borderWidth: 1, borderColor: 'rgba(255,77,77,0.3)' },
  modalEmoji: { fontSize: 56 },
  modalTitulo: { fontSize: 26, fontFamily: 'Montserrat_700Bold' },
  modalPalavra: { fontSize: 14, fontFamily: 'Montserrat_400Regular' },
  btnJogarNovamente: {
    backgroundColor: '#9810fa',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
  },
  btnJogarText: { color: 'white', fontSize: 16, fontFamily: 'Montserrat_700Bold' },
})