import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'

import { useTheme } from '../../contexts/ThemeContext'
import { DRAWER_WIDTH } from '../../constants'

const Layout = ({ children }) => {
    const { themeMode, toggleTheme } = useTheme()
    const handleThemeChange = () => toggleTheme()

    return (
        <>
            <Drawer
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
            >
                <Toolbar />
                <Divider />
            </Drawer>
            <AppBar
                color="primary"
                sx={{
                    px: 2,
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: `${DRAWER_WIDTH}px`,
                }}
                position="static"
            >
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
            <Box
                sx={{
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    ml: `${DRAWER_WIDTH}px`,
                }}
            >
                {children}
            </Box>
        </>
    )
}

export default Layout
