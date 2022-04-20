import { useEffect } from 'react'
import Button from '@mui/material/Button'
import { useTheme } from './contexts/ThemeContext'
import { Axios } from './api'

const App = () => {
    const { toggleTheme } = useTheme()

    return (
        <Button variant="contained" onClick={toggleTheme} sx={{ m: 4 }}>
            Toggle Theme
        </Button>
    )
}

export default App
