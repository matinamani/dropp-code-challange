import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import * as Yup from 'yup'

import MySnackbar from '../components/helpers/MySnackbar'
import axios from '../helpers/api'

const EditResource = () => {
    const { id } = useParams()
    const [resource, setResource] = useState({})
    const [loading, setLoading] = useState(false)

    const getResource = async () => {
        setLoading(true)

        try {
            const { data: res } = await axios.get(`/resource/${id}`)
            setResource(res.data)
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        getResource()
    }, [])

    return loading ? <CircularProgress /> : <Form resource={resource} />
}

const Form = ({ resource }) => {
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        color: Yup.string()
            .required('Color is required')
            .matches(
                /^#([0-9a-f]{3}|[0-9a-f]{6})$/i,
                'Color should be a valid hexadecimal number.'
            ),
        year: Yup.number().required('Year is required'),
        pantone_value: Yup.string().required('Pantone value is required'),
    })

    const onSubmit = async (values) => {
        setLoading(true)

        try {
            const res = await axios.put(`/resource/${resource.id}`, values)
            console.log(res)
            if (res.status === 200) setSnackbar(true)
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    const formik = useFormik({
        initialValues: {
            name: resource.name || '',
            color: resource.color || '',
            year: resource.year || '',
            pantone_value: resource.pantone_value || '',
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
                <Paper
                    elevation={0}
                    sx={{
                        height: 200,
                        width: 200,
                        bgcolor: resource.color,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="name"
                    label="Name"
                    fullWidth
                    error={
                        formik.touched.name && formik.errors.name ? true : false
                    }
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                    <Typography variant="caption" color="error">
                        {formik.errors.name}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="color"
                    label="Color"
                    fullWidth
                    error={
                        formik.touched.color && formik.errors.color
                            ? true
                            : false
                    }
                    {...formik.getFieldProps('color')}
                />
                {formik.touched.color && formik.errors.color && (
                    <Typography variant="caption" color="error">
                        {formik.errors.color}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="pantoneValue"
                    label="Pantone Value"
                    fullWidth
                    error={
                        formik.touched.pantone_value &&
                        formik.errors.pantone_value
                            ? true
                            : false
                    }
                    {...formik.getFieldProps('pantone_value')}
                />
                {formik.touched.pantone_value && formik.errors.pantone_value && (
                    <Typography variant="caption" color="error">
                        {formik.errors.pantone_value}
                    </Typography>
                )}
            </Grid>
            {loading ? (
                <CircularProgress sx={{ my: 2 }} />
            ) : (
                <Button sx={{ my: 2 }} variant="contained" type="submit">
                    Submit Changes
                </Button>
            )}
            <MySnackbar
                severity="success"
                open={snackbar}
                setOpen={setSnackbar}
            >
                Changes Are Submitted Successfully
            </MySnackbar>
        </Grid>
    )
}

export default EditResource
