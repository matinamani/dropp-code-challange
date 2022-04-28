import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../helpers/api'

const User = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const getUser = async (id) => {
        const { data: res } = await axios.get(`/users/${id}`)
        setUser(res.data)
    }
    useEffect(() => {
        getUser(id)
    }, [])

    return <h1>{JSON.stringify(user)}</h1>
}

export default User
