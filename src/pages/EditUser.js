import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

import axios from '../helpers/api'

const EditUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})

    const getUser = async () => {
        const { data: res } = await axios.get(`/users/${id}`)
        setUser(res.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    // const formik = useFormik({
    //     initialValue: {
    //         firstName: user.first_name,
    //         lastName: user.last_name,
    //         email: user.email,
    //         avatar: user.avatar,
    //     },
    //     onSubmit: () => {},
    //     enableReinitialize: true,
    // })

    return (
        <Formik
            enableReinitialize
            initialValue={{
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
            }}
            onSubmit={() => {}}
        >
            <Form>
                <TextField id="firstName" name="firstName" />
            </Form>
        </Formik>
    )
}

export default EditUser
