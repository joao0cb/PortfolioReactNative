// Tela nova (requisito do enunciado).
// Preencha com seus dados reais nos arrays abaixo.

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'

const ACADEMICA = [
  {
    instituicao: 'Universidade — Seu Nome Aqui',
    curso: 'Bacharelado em Ciência da Computação',
    periodo: '2023 – presente',
    descricao: 'Cursando disciplinas de Algoritmos, Estruturas de Dados, Banco de Dados, POO, Redes e Sistemas Operacionais.',
  },
  // Adicione mais se houver
]

const PROFISSIONAL = [
  {
    empresa: 'Empresa / Projeto',
    cargo: 'Cargo ou função',
    periodo: 'Mês/Ano – Mês/Ano',
    descricao: 'Descrição das atividades, tecnologias usadas e impacto gerado.',
  },
  // Adicione mais se houver
]

function TimelineCard({
  titulo, subtitulo, periodo, descricao, cor,
}: {
  titulo: string; subtitulo: string; periodo: string; descricao: string; cor: string
}) {
  const { colors } = useTheme()
  return (
    <View style={styles.cardRow}>
      {/* Linha vertical */}
      <View style={styles.timelineCol}>
        <View style={[styles.dot, { backgroundColor: cor }]} />
        <View style={[styles.line, { backgroundColor: colors.border || '#333' }]} />
      </View>
      <View style={[styles.card, { backgroundColor: colors.backgroundCard }]}>
        <Text style={[styles.cardTitulo, { color: colors.text }]}>{titulo}</Text>
        <Text style={[styles.cardSub, { color: cor }]}>{subtitulo}</Text>
        <Text style={[styles.cardPeriodo, { color: colors.textSubtle }]}>{periodo}</Text>
        <Text style={[styles.cardDesc, { color: colors.textMuted }]}>{descricao}</Text>
      </View>
    </View>
  )
}

export default function ExperienciaScreen() {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <Text style={[styles.titulo, { color: colors.text }]}>Experiência{'\n'}Acadêmica</Text>
        {ACADEMICA.map((item, i) => (
          <TimelineCard
            key={i}
            titulo={item.instituicao}
            subtitulo={item.curso}
            periodo={item.periodo}
            descricao={item.descricao}
            cor="#9810fa"
          />
        ))}

        <Text style={[styles.titulo, { color: colors.text, marginTop: 24 }]}>Experiência{'\n'}Profissional</Text>
        {PROFISSIONAL.map((item, i) => (
          <TimelineCard
            key={i}
            titulo={item.empresa}
            subtitulo={item.cargo}
            periodo={item.periodo}
            descricao={item.descricao}
            cor="#e040fb"
          />
        ))}

        {/* Habilidades (migrado da seção Habilidades do portfólio web) */}
        <Text style={[styles.titulo, { color: colors.text, marginTop: 24 }]}>Habilidades</Text>
        {[
          { titulo: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS'] },
          { titulo: 'Backend', skills: ['Python', 'Django', 'FastAPI', 'Node.js'] },
          { titulo: 'Database', skills: ['PostgreSQL', 'MySQL'] },
          { titulo: 'Tools', skills: ['Git', 'GitHub', 'Trello', 'Figma'] },
          { titulo: 'Languages', skills: ['Python', 'Java', 'C', 'Kotlin'] },
        ].map(grupo => (
          <View key={grupo.titulo} style={[styles.habCard, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.habTitulo, { color: colors.text }]}>{grupo.titulo}</Text>
            <View style={styles.pillsRow}>
              {grupo.skills.map(s => (
                <View key={s} style={[styles.pill, { backgroundColor: colors.skillBg }]}>
                  <Text style={[styles.pillText, { color: colors.skillText }]}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 12, paddingBottom: 40 },
  titulo: { fontSize: 32, fontFamily: 'Montserrat_700Bold', lineHeight: 40, marginBottom: 8 },
  cardRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  timelineCol: { alignItems: 'center', width: 20, paddingTop: 6 },
  dot: { width: 14, height: 14, borderRadius: 7 },
  line: { flex: 1, width: 2, marginTop: 4, minHeight: 40 },
  card: { flex: 1, borderRadius: 16, padding: 16, gap: 4 },
  cardTitulo: { fontSize: 16, fontFamily: 'Montserrat_700Bold' },
  cardSub: { fontSize: 14, fontFamily: 'Montserrat_700Bold' },
  cardPeriodo: { fontSize: 12, fontFamily: 'Montserrat_400Regular' },
  cardDesc: { fontSize: 14, fontFamily: 'Montserrat_400Regular', lineHeight: 20, marginTop: 4 },
  habCard: { borderRadius: 16, padding: 16, gap: 12 },
  habTitulo: { fontSize: 16, fontFamily: 'Montserrat_700Bold' },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6 },
  pillText: { fontSize: 13, fontFamily: 'Montserrat_400Regular' },
})