import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useLocalStorage } from '../helpers/hooks'

const Login = () => {
    const [user, setUser] = useLocalStorage('user', {})

    return (
        <Box
            sx={{
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    width: '25vw',
                }}
            >
                <Typography variant="h4" align="center" paragraph>
                    Login
                </Typography>
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Username"
                    fullWidth
                />
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Password"
                    fullWidth
                />
                <Button sx={{ m: 2 }} variant="contained">
                    Login
                </Button>
                <Typography variant="caption">
                    Don't have an account? Signup
                </Typography>
            </Paper>
        </Box>
    )
}

export default Login
