import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import axios from '../helpers/api'
import MySnackbar from '../components/helpers/MySnackbar'

const NewUser = () => {
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState(false)

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is Required!'),
        lastName: Yup.string().required('Last Name is Required!'),
        email: Yup.string()
            .required('Email is Required!')
            .email('Please Enter a Valid Email Address.'),
    })

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true)

        try {
            const res = await axios.post('/users', values)
            if (res.status === 201) setSnackbar(true)
            resetForm()
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema,
        onSubmit,
    })

    return (
        <Grid
            sx={{ mx: '20vw' }}
            container
            spacing={2}
            component="form"
            justifyContent="center"
            alignItems="center"
            onSubmit={formik.handleSubmit}
        >
            <Grid item xs={6}>
                <TextField
                    id="firstName"
                    label="First Name"
                    fullWidth
                    error={
                        formik.touched.firstName && formik.errors.firstName
                            ? true
                            : false
                    }
                    {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                    <Typography variant="caption" color="error">
                        {formik.errors.firstName}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    error={
                        formik.touched.lastName && formik.errors.lastName
                            ? true
                            : false
                    }
                    {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                    <Typography variant="caption" color="error">
                        {formik.errors.lastName}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    error={
                        formik.touched.email && formik.errors.email
                            ? true
                            : false
                    }
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                    <Typography variant="caption" color="error">
                        {formik.errors.email}
                    </Typography>
                )}
            </Grid>
            {loading ? (
                <CircularProgress sx={{ my: 2 }} />
            ) : (
                <Button sx={{ my: 2 }} type="submit" variant="contained">
                    Submit Changes
                </Button>
            )}
            <MySnackbar
                severity="success"
                open={snackbar}
                setOpen={setSnackbar}
            >
                User Created Successfully!
            </MySnackbar>
        </Grid>
    )
}

export default NewUser
