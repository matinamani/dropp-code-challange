import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom'

import axios from '../helpers/api'
import { COLORS } from '../constants'
import { CircularProgress } from '@mui/material'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            renderCell: ({ value }) => {
                return (
                    <Avatar
                        sx={{
                            bgcolor: value.color,
                        }}
                        src={value.src}
                        alt={value.alt}
                    >
                        {value.children}
                    </Avatar>
                )
            },
            width: 90,
            sortable: false,
        },
        {
            field: 'name',
            headerName: 'Full Name',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
    ]

    const getUsers = async () => {
        setLoading(true)

        const pickRandomColor = () =>
            COLORS[Math.floor(Math.random() * 6)][
                Math.floor(Math.random() * 8 + 1) * 100
            ]

        try {
            const { data: res1 } = await axios.get('/users?page=1')
            const { data: res2 } = await axios.get('/users?page=2')

            setUsers([
                ...res1.data.map((user) => ({
                    id: user.id,
                    avatar: {
                        src: user.avatar,
                        alt: user.email,
                        color: pickRandomColor(),
                        children: user.first_name[0],
                    },
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                })),
                ...res2.data.map((user) => ({
                    id: user.id,
                    avatar: {
                        src: user.avatar,
                        alt: user.email,
                        color: pickRandomColor(),
                        children: user.first_name[0],
                    },
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                })),
            ])
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const navigate = useNavigate()

    return loading ? (
        <CircularProgress />
    ) : (
        <DataGrid
            rows={users}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            onCellClick={({ row: { id } }) => navigate(`/users/${id}`)}
        />
    )
}

export default Users
