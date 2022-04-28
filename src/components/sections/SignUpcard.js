import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const SignUpCard = () => {
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is Required')
            .min(4, 'Username must be at least 4 characters.')
            .max(15, 'Username must be less than 15 characters.'),
        password: Yup.string()
            .required('Password is Required')
            .min(4, 'Password must be at least 4 characters.'),
        confirm: Yup.string().required('Please Confirm Your Password.'),
    })

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true)

        if (values.password === values.confirm) {
            try {
                await axios.post('http://localhost:3000/users', {
                    username: values.username,
                    password: values.password,
                })
                alert('Success')
            } catch (err) {
                console.log(err)
            }
        } else {
            alert('Please Confirm Your Password')
            values.confirm = ''
        }

        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirm: '',
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
                    Sign Up
                </Typography>
                <form style={styles.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        id="username"
                        sx={{ my: 1 }}
                        label="Username"
                        fullWidth
                        error={
                            formik.touched.username && formik.errors.username
                        }
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
                        error={
                            formik.touched.password && formik.errors.password
                        }
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <Typography variant="caption" color="error">
                            {formik.errors.password}
                        </Typography>
                    )}

                    <TextField
                        id="confirm"
                        type="password"
                        sx={{ my: 1 }}
                        label="Confirm Password"
                        fullWidth
                        error={formik.touched.confirm && formik.errors.confirm}
                        {...formik.getFieldProps('confirm')}
                    />
                    {formik.touched.confirm && formik.errors.confirm && (
                        <Typography variant="caption" color="error">
                            {formik.errors.confirm}
                        </Typography>
                    )}

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button type="submit" variant="contained">
                            Sign Up
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

export default SignUpCard
