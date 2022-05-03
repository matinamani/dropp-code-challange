import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import axios from '../helpers/api'

const User = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const getUser = async (id) => {
        setLoading(true)
        try {
            const { data: res } = await axios.get(`/users/${id}`)
            setUser(res.data)
        } catch (err) {
            setError(true)

            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser(id)
    }, [])

    const handleClick = () => navigate(`/users/${id}/edit`)
    const handleDelete = () => {}

    return loading ? (
        <CircularProgress />
    ) : !error ? (
        <Card sx={{ maxWidth: 340 }}>
            <CardMedia
                component="img"
                height={240}
                image={user.avatar}
                alt={user.email}
            />
            <CardContent>
                <Typography
                    variant="h5"
                    gutterBottom
                >{`${user.first_name} ${user.last_name}`}</Typography>
                <Typography variant="body1" paragraph>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti corporis ratione totam quae dicta aliquam. Maiores,
                    quam vel cum beatae a tempora deleniti, laborum dignissimos
                    ex praesentium iure ab deserunt.
                </Typography>
                <Typography
                    variant="body2"
                    component="a"
                    href={`mailto:${user.email}`}
                >
                    {user.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClick}>
                    Edit
                </Button>
                <Button size="small" onClick={handleDelete} color="error">
                    Delete
                </Button>
            </CardActions>
        </Card>
    ) : (
        <Typography variant="h5" color="error">
            An Error Occurred
        </Typography>
    )
}

export default User
