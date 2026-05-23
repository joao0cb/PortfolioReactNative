import { View, Text, ScrollView, StyleSheet, Image,
         ImageBackground, Pressable, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { LinearGradient } from 'expo-linear-gradient'

export default function HomeScreen() {
  const { colors, isDark, toggleTheme } = useTheme()

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={isDark
          ? require('../../assets/images/bgdark.png')
          : require('../../assets/images/bg.png')
        }
        style={styles.hero}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top']}>
          <Pressable onPress={toggleTheme} style={styles.btnTema}>
            <Text style={styles.btnTemaText}>{isDark ? '☀️' : '🌙'}</Text>
          </Pressable>
        </SafeAreaView>

        <View style={styles.heroContent}>
          <View style={[styles.fotoWrapper, { borderColor: isDark ? '#17012b' : '#2c0b4c' }]}>
            <Image
              source={require('../../assets/images/fotojoao.jpg')}
              style={styles.foto}
            />
          </View>
          <Text style={styles.heroNome}>João Victor</Text>
          <Text style={styles.heroDesc}>Estudante de Ciência da Computação</Text>
          <Text style={styles.heroBio}>
            Sempre aprendendo e construindo. Transformando ideias em software
            e buscando novas formas de resolver desafios reais.
          </Text>
        </View>
      </ImageBackground>

      <View style={[styles.section, { backgroundColor: colors.background }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Vamos Conversar?</Text>
        <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
          Estou sempre aberto a novos projetos e oportunidades.
        </Text>

        <Pressable
          onPress={() => Linking.openURL('mailto:joaovictorcastelobranco123@gmail.com')}
          style={[styles.btnEmail, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.btnEmailText}>📧 Enviar E-mail</Text>
        </Pressable>

        <View style={styles.redesRow}>
          <Pressable onPress={() => Linking.openURL('https://github.com/joao0cb')}>
            <Text style={[styles.linkText, { color: colors.primary }]}>GitHub</Text>
          </Pressable>
          <Pressable onPress={() =>
            Linking.openURL('https://www.linkedin.com/in/jo%C3%A3o-victor-castelo-branco-de-sena-20b624312/')
          }>
            <Text style={[styles.linkText, { color: colors.primary }]}>LinkedIn</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://seusite.com/CurriculoJOAO.pdf')}>
            <Text style={[styles.linkText, { color: colors.primary }]}>Currículo PDF</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 520,
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  btnTema: {
    alignSelf: 'flex-end',
    margin: 16,
    padding: 8,
  },
  btnTemaText: { fontSize: 22 },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fotoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    borderWidth: 4,
    marginBottom: 20,
  },
  foto: { width: '100%', height: '100%' },
  heroNome: {
    fontSize: 40,
    fontFamily: 'Montserrat_700Bold',
    color: 'white',
    marginBottom: 8,
  },
  heroDesc: {
    fontSize: 18,
    color: '#e0caf6',
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroBio: {
    fontSize: 16,
    color: '#e0caf6',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    maxWidth: 340,
  },
  section: {
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  sectionSub: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  btnEmail: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
  },
  btnEmailText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
  },
  redesRow: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    textDecorationLine: 'underline',
  },
})