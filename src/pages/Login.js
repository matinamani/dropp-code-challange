import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'

import { useLocalStorage, useInput } from '../helpers/hooks'
import { LOGIN_DATA, ERROR_MSG } from '../constants'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [signUp, setSignUp] = useState(false)
    const [error, setError] = useState({
        username: '',
        password: '',
        confirm: '',
    })

    useEffect(() => {
        clearForm()
    }, [signUp])

    const form = {
        username: useInput(''),
        password: useInput(''),
        confirm: useInput(''),
    }

    const handleLogin = () => {}

    const handleSignUp = async () => {
        setLoading(true)

        if (form.password.value === form.confirm.value) {
            const data = {
                username: form.username.value,
                password: form.password.value,
            }
            await axios.post('http://localhost:3000/users', data)
        } else {
            setError({ ...error, confirm: ERROR_MSG.CONFIRM })
        }

        setLoading(false)
    }

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
                    {signUp
                        ? LOGIN_DATA.SING_UP.header
                        : LOGIN_DATA.LOGIN.header}
                </Typography>
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Username"
                    fullWidth
                    error={error.username && true}
                    {...form.username}
                />
                {error.username && (
                    <Typography variant="caption" color="error">
                        {error.username}
                    </Typography>
                )}
                <TextField
                    sx={{ my: 1 }}
                    variant="standard"
                    label="Password"
                    type="password"
                    fullWidth
                    error={error.password && true}
                    {...form.password}
                />
                {error.password && (
                    <Typography variant="caption" color="error">
                        {error.password}
                    </Typography>
                )}
                {signUp && (
                    <>
                        <TextField
                            sx={{ my: 1 }}
                            variant="standard"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            error={error.confirm && true}
                            {...form.confirm}
                        />
                        {error.confirm && (
                            <Typography variant="caption" color="error">
                                {error.confirm}
                            </Typography>
                        )}
                    </>
                )}
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        sx={{ m: 2 }}
                        variant="contained"
                        onClick={signUp ? handleSignUp : handleLogin}
                    >
                        {signUp
                            ? LOGIN_DATA.SING_UP.Button
                            : LOGIN_DATA.LOGIN.Button}
                    </Button>
                )}
                <Typography variant="caption">
                    {signUp
                        ? LOGIN_DATA.SING_UP.caption
                        : LOGIN_DATA.LOGIN.caption}
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
