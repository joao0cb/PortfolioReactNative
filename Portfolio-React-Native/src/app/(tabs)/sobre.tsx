import { View, Text, ScrollView, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import AquarelaIcon from '../../assets/images/aquarela.svg'
import FogueteIcon from '../../assets/images/foguete.svg'

type DestaquItem = {
  titulo: string
  texto: string
  isPng: boolean
  source: ImageSourcePropType | null
  Svg: React.FC<{ width?: number; height?: number }> | null
}

const DESTAQUES: DestaquItem[] = [
  {
    titulo: 'Desenvolvimento',
    texto: 'Código limpo e escalável com as melhores práticas',
    isPng: true,
    source: require('../../assets/images/dev.png'),
    Svg: null,
  },
  {
    titulo: 'Design',
    texto: 'Interfaces intuitivas e experiências memoráveis',
    isPng: false,
    source: null,
    Svg: AquarelaIcon as React.FC<{ width?: number; height?: number }>,
  },
  {
    titulo: 'Inovação',
    texto: 'Sempre buscando novas tecnologias e soluções',
    isPng: false,
    source: null,
    Svg: FogueteIcon as React.FC<{ width?: number; height?: number }>,
  },
]



export default function SobreScreen() {
  const { colors, isDark } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          <Text style={[styles.titulo, { color: colors.text }]}>Sobre Mim</Text>

          {DESTAQUES.map(d => (
            <View key={d.titulo} style={[styles.cardDestaque, { backgroundColor: colors.backgroundCard }]}>
              <View style={styles.iconCircle}>
                {d.isPng && d.source ? (
                  <Image
                    source={d.source}
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                ) : d.Svg ? (
                  <d.Svg width={40} height={40} />
                ) : null}
              </View>
              <Text style={[styles.cardTitulo, { color: colors.text }]}>{d.titulo}</Text>
              <Text style={[styles.cardTexto, { color: colors.textSubtle }]}>{d.texto}</Text>
            </View>
          ))}

          <View style={[styles.bioCard, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.bioTexto, { color: colors.text }]}>
              Estudante de Ciência da Computação com foco em desenvolvimento de software e
              aplicações web, com experiência em Java, Python, C e JavaScript. Possuo
              conhecimento em frameworks como Django e FastAPI, além de bancos de dados
              relacionais e boas práticas de desenvolvimento. Tenho perfil proativo, foco em
              aprendizado contínuo e interesse em atuar em projetos reais, buscando uma
              oportunidade de estágio para gerar impacto e crescer profissionalmente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 4,
    marginTop: -8,
  },
  cardDestaque: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9810fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitulo: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
  },
  cardTexto: {
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  bioCard: {
    borderRadius: 20,
    padding: 24,
  },
  bioTexto: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 26,
    textAlign: 'justify',
  },
  techCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    gap: 6,
  },
  techLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  techDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  techNome: {
    fontSize: 15,
    fontFamily: 'Montserrat_700Bold',
  },
  techDesc: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 20,
    paddingLeft: 16,
  },
})