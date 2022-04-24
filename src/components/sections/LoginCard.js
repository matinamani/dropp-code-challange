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

const LoginCard = () => {
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is Required'),
        password: Yup.string().required('Password is Required'),
    })

    const onSubmit = async (values) => {
        setLoading(true)

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
