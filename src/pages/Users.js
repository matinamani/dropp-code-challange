import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import axios from '../helpers/api'
import { COLORS } from '../constants'
import { CircularProgress } from '@mui/material'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(9)
    const navigate = useNavigate()

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'avatar',
            headerName: 'Avatar',
            renderCell: ({ value }) => {
                return (
                    <Avatar
                        sx={{
                            bgcolor: value.color,
                            cursor: 'pointer',
                        }}
                        src={value.src}
                        alt={value.alt}
                        onClick={() => navigate(`/users/${value.id}`)}
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
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: ({ value }) => {
                return (
                    <IconButton
                        color="primary"
                        onClick={() => navigate(`/users/${value}/edit`)}
                    >
                        <EditIcon />
                    </IconButton>
                )
            },
            width: 90,
            sortable: false,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: ({ value }) => {
                const handleDelete = async () => {}

                return (
                    <IconButton color="error">
                        <DeleteIcon onClick={handleDelete} />
                    </IconButton>
                )
            },
            width: 90,
            sortable: false,
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
                        id: user.id,
                        src: user.avatar,
                        alt: user.email,
                        color: pickRandomColor(),
                        children: user.first_name[0],
                    },
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                    edit: user.id,
                    delete: user.id,
                })),
                ...res2.data.map((user) => ({
                    id: user.id,
                    avatar: {
                        id: user.id,
                        src: user.avatar,
                        alt: user.email,
                        color: pickRandomColor(),
                        children: user.first_name[0],
                    },
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                    edit: user.id,
                    delete: user.id,
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

    return loading ? (
        <CircularProgress />
    ) : (
        <DataGrid
            rows={users}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[6, 9, 12]}
            disableColumnMenu
            disableSelectionOnClick
            onPageSizeChange={(size) => setPageSize(size)}
        />
    )
}

export default Users
