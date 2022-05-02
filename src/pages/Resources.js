import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import axios from '../helpers/api'
import { CircularProgress } from '@mui/material'

const Resources = () => {
    const [resource, setResource] = useState([])
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
            field: 'name',
            headerName: 'Name',
            width: 120,
        },
        {
            field: 'year',
            headerNAme: 'Year',
            width: 90,
        },
        {
            field: 'color',
            headerName: 'Color',
            renderCell: ({ value }) => (
                <div
                    style={{
                        backgroundColor: value.color,
                        borderRadius: '50%',
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/resources/${value.id}`)}
                ></div>
            ),
            width: 80,
            sortable: false,
        },
        {
            field: 'pantone',
            headerName: 'Pantone Value',
            width: 120,
            sortable: false,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: ({ value }) => {
                return (
                    <IconButton
                        color="primary"
                        onClick={() => navigate(`/resources/${value}/edit`)}
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

    const getResource = async () => {
        setLoading(true)

        try {
            const { data: res1 } = await axios.get('/resource?page=1')
            const { data: res2 } = await axios.get('/resource?page=2')

            setResource([
                ...res1.data.map((resource) => ({
                    id: resource.id,
                    name: resource.name,
                    year: resource.year,
                    color: {
                        id: resource.id,
                        color: resource.color,
                    },
                    pantone: resource.pantone_value,
                    edit: resource.id,
                    delete: resource.id,
                })),
                ...res2.data.map((resource) => ({
                    id: resource.id,
                    name: resource.name,
                    year: resource.year,
                    color: {
                        id: resource.id,
                        color: resource.color,
                    },
                    pantone: resource.pantone_value,
                    edit: resource.id,
                    delete: resource.id,
                })),
            ])
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        getResource()
    }, [])

    return loading ? (
        <CircularProgress />
    ) : (
        <DataGrid
            rows={resource}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[6, 9, 12]}
            disableColumnMenu
            disableSelectionOnClick
            onPageSizeChange={(size) => setPageSize(size)}
        />
    )
}

export default Resources
