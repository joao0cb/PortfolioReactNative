import React, { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'
import { Colors } from '../constants/colors'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  colors: typeof Colors.light
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(systemScheme === 'dark' ? 'dark' : 'light')

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  const colors = Colors[theme] as typeof Colors.light

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)