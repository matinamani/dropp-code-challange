import { Outlet, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

import { useTheme } from '../../contexts/ThemeContext'
import { DRAWER_WIDTH, APP_BAR_HEIGHT, NAV_BAR_LINKS } from '../../constants'
import { useAuth } from '../../contexts/AuthContext'

const Layout = () => {
    const { logout } = useAuth()
    const { themeMode, toggleTheme } = useTheme()
    const handleThemeChange = () => toggleTheme()
    const handleLogOut = () => logout()

    return (
        <Box>
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
                <NavBarList items={NAV_BAR_LINKS} />
            </Drawer>
            <AppBar
                color="primary"
                sx={{
                    px: 2,
                    width: `calc(100% - ${DRAWER_WIDTH}px)`,
                    height: APP_BAR_HEIGHT,
                    ml: `${DRAWER_WIDTH}px`,
                }}
                position="static"
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: '#fff',
                            }}
                            variant="h4"
                        >
                            Admin Panel
                        </Typography>
                    </Box>
                    <IconButton sx={{ color: '#fff' }} onClick={handleLogOut}>
                        <LogoutRoundedIcon />
                    </IconButton>
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
                    position: 'absolute',
                    height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
                    ml: `${DRAWER_WIDTH}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

const NavBarList = ({ items }) => {
    return (
        <List>
            {items.map((item) => (
                <ListItem
                    key={item.name}
                    button
                    component={Link}
                    to={item.href}
                >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.title} />
                </ListItem>
            ))}
        </List>
    )
}

export default Layout
