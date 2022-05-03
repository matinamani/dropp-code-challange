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

const Resource = () => {
    const { id } = useParams()
    const [resource, setResource] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const getResource = async () => {
        setLoading(true)
        try {
            const { data: res } = await axios.get(`/resource/${id}`)
            setResource(res.data)
        } catch (err) {
            setError(true)
            console.log(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        getResource()
    }, [])

    useEffect(() => {
        console.log(resource)
    }, [resource])

    const handleClick = () => navigate(`/resources/${id}/edit`)
    const handleDelete = () => {}

    return loading ? (
        <CircularProgress />
    ) : !error ? (
        <Card sx={{ maxWidth: 340 }}>
            <CardMedia
                sx={{ bgcolor: resource.color }}
                component="img"
                height={200}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {resource.name}
                </Typography>
                <Typography variant="body1" paragraph>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti corporis ratione totam quae dicta aliquam. Maiores,
                    quam vel cum beatae a tempora deleniti, laborum dignissimos
                    ex praesentium iure ab deserunt.
                </Typography>
                <Typography variant="body2">{resource.year}</Typography>
                <Typography variant="caption">
                    {resource.pantone_value}
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
        <Typography variant="h4" color="error">
            An Error Occurred!
        </Typography>
    )
}

export default Resource
