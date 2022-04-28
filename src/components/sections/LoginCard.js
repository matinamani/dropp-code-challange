import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '../../contexts/AuthContext'

const LoginCard = () => {
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is Required'),
        password: Yup.string().required('Password is Required'),
    })

    const authenticate = async (values) => {
        const { data } = await axios.get('http://localhost:3000/users')

        console.log(data)

        let flag = false
        data.forEach((u) =>
            u.username === values.username && u.password === values.password
                ? (flag = true)
                : flag
        )

        return flag
    }

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true)

        try {
            const auth = await authenticate(values)

            console.log(auth)

            if (auth) {
                login(values)
                navigate('/')
            } else {
                alert('Username or Password is Incorrect.')
                resetForm()
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit,
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
                    p: 4,
                    width: '25vw',
                }}
            >
                <Typography variant="h4" align="center" paragraph>
                    Login
                </Typography>
                <form style={styles.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        id="username"
                        sx={{ my: 1 }}
                        label="Username"
                        fullWidth
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <Typography variant="caption" color="error">
                            {formik.errors.username}
                        </Typography>
                    )}

                    <TextField
                        id="password"
                        type="password"
                        sx={{ my: 1 }}
                        label="Password"
                        fullWidth
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Typography variant="caption" color="error">
                            {formik.errors.password}
                        </Typography>
                    )}

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    )}
                </form>
            </Paper>
        </Box>
    )
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}

export default LoginCard
