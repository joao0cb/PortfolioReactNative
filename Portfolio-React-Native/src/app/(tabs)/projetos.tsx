import { View, Text, ScrollView, Image, Pressable, Linking, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'

const PROJETOS = [
  {
    nome: 'Patas Na Rua',
    desc: 'Plataforma de coleiras GPS para rastrear animais de rua em tempo real. Auxilia ONGs no monitoramento remoto e facilita o apadrinhamento financeiro e adoções. Conecta tecnologia ao cuidado animal para quem não tem espaço físico.',
    github: 'https://github.com/joao0cb/Patas-da-Rua',
    image: require('../../assets/images/patasnarua.png'),
  },
  {
    nome: 'Projeto Banco de Dados',
    desc: 'E-commerce de artigos esportivos com gestão dinâmica de vendas e produtos online. O sistema foca na eficiência do controle de estoque e na fluidez dos processos de compra, unindo alta performance e escalabilidade.',
    github: 'https://github.com/joao0cb/Projeto-Banco-De-Dados',
    image: require('../../assets/images/bdd.png'),
  },
  {
    nome: 'Coliceu',
    desc: 'Desenvolvido em Kotlin e Java, centraliza o registro arqueológico em campo. Permite mapeamento de sítios via imagens, marcação de pontos-zero e catalogação ágil de artefatos.',
    github: 'https://github.com/joao0cb/Projeto-Coliceu',
    image: require('../../assets/images/coliceu.jpeg'),
  },
  {
    nome: 'Projeto Tabela Hash',
    desc: 'Sistema de gerenciamento de biblioteca em C com cadastro, empréstimo e devolução de livros. Utiliza tabelas hash para armazenar dados e arquivos binários para persistência.',
    github: 'https://github.com/joao0cb/Projeto-Tabela-Hash',
    image: require('../../assets/images/tabelahash.jpg'),
  },
  {
    nome: 'Musicap',
    desc: 'Permite o cadastro de usuários para criação de bibliotecas e avaliação de canções. Ferramenta prática e intuitiva focada na organização de notas e críticas personalizadas.',
    github: 'https://github.com/joao0cb/Projeto-POO',
    image: require('../../assets/images/musicap.png'),
  },
]

export default function ProjetosScreen() {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>Projetos</Text>
        <Text style={[styles.sub, { color: colors.textMuted }]}>
          Uma seleção dos projetos que desenvolvi ao longo da minha jornada.
        </Text>

        {PROJETOS.map(p => (
          <View key={p.nome} style={[styles.card, { backgroundColor: colors.backgroundCard }]}>
            {/* Substitua a View vazia por isso: */}
            <View style={styles.imgPlaceholder}>
              <Image 
                source={p.image} 
                style={styles.img} 
                resizeMode="cover" 
              />
            </View>

            <View style={styles.cardBody}>
              <Text style={[styles.cardNome, { color: colors.text }]}>{p.nome}</Text>
              <Text style={[styles.cardDesc, { color: colors.textSubtle }]}>{p.desc}</Text>
              <Pressable
                onPress={() => Linking.openURL(p.github)}
                style={[styles.btnGithub, { borderColor: colors.primary }]}
              >
                <Text style={[styles.btnGithubText, { color: colors.primary }]}>
                  Ver no GitHub →
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 20, paddingBottom: 40 },
  titulo: { fontSize: 32, fontFamily: 'Montserrat_700Bold' },
  sub: { fontSize: 15, fontFamily: 'Montserrat_400Regular', marginTop: 4, marginBottom: 8 },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  imgPlaceholder: {
    height: 160,
    backgroundColor: '#2c0b4c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: '100%', height: '100%' },
  emoji: { fontSize: 56 },
  cardBody: { padding: 20, gap: 10 },
  cardNome: { fontSize: 18, fontFamily: 'Montserrat_700Bold' },
  cardDesc: { fontSize: 14, fontFamily: 'Montserrat_400Regular', lineHeight: 22 },
  btnGithub: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  btnGithubText: { fontSize: 14, fontFamily: 'Montserrat_700Bold' },
})