import { useState, createContext, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'

import { LIGHT_THEME, DARK_THEME } from '../themes'

const ThemeContext = createContext()
const useTheme = () => {
    const value = useContext(ThemeContext)
    if (value === undefined) throw new Error()
    return value
}

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(DARK_THEME)
    const toggleTheme = () =>
        setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME)

    return (
        <ThemeContext.Provider
            value={{ themeMode: theme.palette.mode, toggleTheme }}
        >
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
export { useTheme }
