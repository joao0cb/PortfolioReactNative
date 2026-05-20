import { View, ViewProps } from 'react-native'
import { useTheme } from '../context/ThemeContext'

interface Props extends ViewProps {
  variant?: 'background' | 'card' | 'alt'
}

export function ThemedView({ variant = 'background', style, ...rest }: Props) {
  const { colors } = useTheme()

  const bg = {
    background: colors.background,
    card: colors.backgroundCard,
    alt: colors.backgroundAlt,
  }[variant]

  return <View style={[{ backgroundColor: bg }, style]} {...rest} />
}