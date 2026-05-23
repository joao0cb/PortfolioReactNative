import Svg, { Line, Circle } from 'react-native-svg'
import { useTheme } from '../context/ThemeContext'

export function ForcaSVG({ erros }: { erros: number }) {
  const { colors } = useTheme()
  const stroke = colors.text
  const corpo = '#e040fb'

  return (
    <Svg width={200} height={220} viewBox="0 0 200 220">
      <Line x1="20" y1="210" x2="180" y2="210" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <Line x1="60" y1="210" x2="60" y2="20"  stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <Line x1="60" y1="20"  x2="130" y2="20" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <Line x1="130" y1="20" x2="130" y2="45" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <Line x1="60" y1="50" x2="90" y2="20"   stroke={stroke} strokeWidth="3" strokeLinecap="round" />

      {erros >= 1 && <Circle cx="130" cy="58" r="13" stroke={corpo} strokeWidth="3" fill="none" />}
      {erros >= 2 && <Line x1="130" y1="71"  x2="130" y2="130" stroke={corpo} strokeWidth="3" strokeLinecap="round" />}
      {erros >= 3 && <Line x1="130" y1="85"  x2="105" y2="110" stroke={corpo} strokeWidth="3" strokeLinecap="round" />}
      {erros >= 4 && <Line x1="130" y1="85"  x2="155" y2="110" stroke={corpo} strokeWidth="3" strokeLinecap="round" />}
      {erros >= 5 && <Line x1="130" y1="130" x2="105" y2="165" stroke={corpo} strokeWidth="3" strokeLinecap="round" />}
      {erros >= 6 && <Line x1="130" y1="130" x2="155" y2="165" stroke={corpo} strokeWidth="3" strokeLinecap="round" />}
    </Svg>
  )
}