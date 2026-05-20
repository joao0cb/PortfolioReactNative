import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'

interface Props {
  titulo: string
  icone: string
  skills: string[]
}

export function CardHabilidade({ titulo, icone, skills }: Props) {
  const { colors } = useTheme()

  return (
    <View style={[
      styles.card,
      {
        backgroundColor: colors.backgroundCard,
        borderColor: colors.border || '#cdced1',
      }
    ]}>
      <View style={styles.topo}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{icone}</Text>
        </View>
        <Text style={[styles.titulo, { color: colors.text }]}>{titulo}</Text>
      </View>
      <View style={styles.pillsRow}>
        {skills.map(s => (
          <View key={s} style={[styles.pill, { backgroundColor: colors.skillBg }]}>
            <Text style={[styles.pillText, { color: colors.skillText }]}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
    marginBottom: 16,
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#9810fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  titulo: {
    fontSize: 17,
    fontFamily: 'Montserrat_700Bold',
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pillText: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
  },
})