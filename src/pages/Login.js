import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import axios from 'axios'
import { useFormik } from 'formik'

import { useLocalStorage, useInput } from '../helpers/hooks'
import { LOGIN_DATA, ERROR_MSG } from '../constants'

const Login = () => {
    const formik = useFormik({
        initialValues: {},
    })
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
