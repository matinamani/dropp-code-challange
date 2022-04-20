import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'

import { useTheme } from '../../contexts/ThemeContext'

const Layout = ({ children }) => {
    const { themeMode, toggleTheme } = useTheme()
    const handleThemeChange = () => toggleTheme()

    return (
        <>
            <AppBar color="primary" sx={{ px: 2 }} position="static">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1 }} variant="h4">
                        Admin Panel
                    </Typography>
                    <IconButton
                        sx={{ color: '#fff' }}
                        onClick={handleThemeChange}
                    >
                        {themeMode === 'light' ? (
                            <LightModeRoundedIcon />
                        ) : (
                            <DarkModeRoundedIcon />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {children}
        </>
    )
}

export default Layout
