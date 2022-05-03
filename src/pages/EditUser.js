import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import * as Yup from 'yup'

import MySnackbar from '../components/helpers/MySnackbar'
import axios from '../helpers/api'
import { Typography } from '@mui/material'

const EditUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    const getUser = async () => {
        setLoading(true)

        try {
            const { data: res } = await axios.get(`/users/${id}`)
            setUser(res.data)
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    return loading ? <CircularProgress /> : <Form user={user} />
}

const Form = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState(false)

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is Required!'),
        lastName: Yup.string().required('Last Name is Required!'),
        email: Yup.string()
            .required('Email is Required')
            .email('Enter a valid email address'),
    })

    const onSubmit = async (values) => {
        setLoading(true)

        try {
            const res = await axios.put(`/users/${user.id}`, values)
            if (res.status === 200) setSnackbar(true)
            console.log(res)
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.email || '',
            avatar: user.avatar || '',
        },
        validationSchema,
        onSubmit,
        enableReinitialize: true,
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
            <Grid item container justifyContent="center" xs={12}>
                <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={formik.values.avatar}
                    alt={formik.values.email}
                ></Avatar>
            </Grid>
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
                Edits Are Submitted Successfully
            </MySnackbar>
        </Grid>
    )
}

export default EditUser
