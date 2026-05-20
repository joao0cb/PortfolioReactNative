import { View, Text, Image, Pressable, Linking, StyleSheet, ImageSourcePropType } from 'react-native'
import { useTheme } from '../context/ThemeContext'

interface Props {
  nome: string
  desc: string
  github: string
  emoji?: string
  image?: ImageSourcePropType | null
}

export function CardProjeto({ nome, desc, github, emoji, image }: Props) {
  const { colors } = useTheme()

  return (
    <View style={[
      styles.card,
      { backgroundColor: colors.backgroundCard }
    ]}>
      {/* Imagem ou placeholder */}
      <View style={styles.imgWrapper}>
        {image ? (
          <Image source={image} style={styles.img} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.emoji}>{emoji ?? '📁'}</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={[styles.nome, { color: colors.text }]}>{nome}</Text>
        <Text style={[styles.desc, { color: colors.textSubtle }]}>{desc}</Text>

        <Pressable
          onPress={() => Linking.openURL(github)}
          style={[styles.btnGithub, { borderColor: colors.primary }]}
        >
          <Text style={[styles.btnText, { color: colors.primary }]}>
            Ver no GitHub →
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  imgWrapper: {
    width: '100%',
    height: 170,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#2c0b4c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 52 },
  body: {
    padding: 20,
    gap: 10,
  },
  nome: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 22,
  },
  btnGithub: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  btnText: {
    fontSize: 14,
    fontFamily: 'Montserrat_700Bold',
  },
})