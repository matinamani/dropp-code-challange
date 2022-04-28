import GroupIcon from '@mui/icons-material/Group'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import { red, pink, purple, green, blue, orange } from '@mui/material/colors'

export const DRAWER_WIDTH = 240
export const APP_BAR_HEIGHT = 65

export const LOGIN_DATA = {
    SING_UP: {
        header: 'Sign Up',
        Button: 'Sign Up',
        caption: 'Already have an account?',
    },
    LOGIN: {
        header: 'Login',
        Button: 'Login',
        caption: "Don't have an account?",
    },
}

export const ERROR_MSG = {
    USERNAME: 'Username should be at least 4 characters.',
    PASSWORD: 'Password is incorrect!',
    CONFIRM: 'Please confirm your password.',
}

export const NAV_BAR_LINKS = [
    {
        name: 'users',
        title: 'Users List',
        icon: <GroupIcon />,
        href: '/users',
    },
    {
        name: 'new user',
        title: 'Create New User',
        icon: <PersonAddAltRoundedIcon />,
        href: '/new-user',
    },
    {
        name: 'resources',
        title: 'Resources',
        icon: <StorageRoundedIcon />,
        href: '/resources',
    },
]

export const USERS_COLUMNS = [{ field: '' }]

export const COLORS = [red, pink, purple, green, blue, orange]
