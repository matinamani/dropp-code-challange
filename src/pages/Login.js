import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useLocalStorage, useInput } from '../helpers/hooks'

const data = {
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

const Login = () => {
    const [signUp, setSignUp] = useState(false)

    useEffect(() => {
        clearForm()
    }, [signUp])

    const form = {
        username: useInput(''),
        password: useInput(''),
        confirm: useInput(''),
    }

    const handleLogin = () => {}

    const handleSignUp = () => {}

    const clearForm = () => {
        form.username.clearInput()
        form.password.clearInput()
        form.confirm.clearInput()
    }

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
                    {signUp ? data.SING_UP.header : data.LOGIN.header}
                </Typography>
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Username"
                    fullWidth
                    {...form.username}
                />
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Password"
                    fullWidth
                    {...form.password}
                />
                {signUp && (
                    <TextField
                        sx={{ my: 1 }}
                        variant="standard"
                        label="Confirm Password"
                        fullWidth
                        {...form.confirm}
                    />
                )}
                <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    onClick={signUp ? handleSignUp : handleLogin}
                >
                    {signUp ? data.SING_UP.Button : data.LOGIN.Button}
                </Button>
                <Typography variant="caption">
                    {signUp ? data.SING_UP.caption : data.LOGIN.caption}
                </Typography>
                <Typography
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    variant="caption"
                    onClick={() => setSignUp(!signUp)}
                >
                    {signUp ? 'Login' : 'Sign Up'}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Login
