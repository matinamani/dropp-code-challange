import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { Axios } from './helpers/api'

const App = () => {
    const [input, setInput] = useState({ name: '', id: '' })
    const [loading, setLoading] = useState(false)

    const handlePut = async () => {
        setLoading(true)
        const data = { name: input.name }
        const res = await Axios.post('/users', data)
        console.log(res)
        setLoading(false)
    }

    const handleGet = async () => {
        const res = await Axios.get(`/users/${input.id}`)
        console.log(res)
    }

    return (
        <>
            <TextField
                onChange={({ target }) => {
                    setInput({ ...input, name: target.value })
                }}
                variant="outlined"
                value={input.name}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <Button variant="contained" onClick={handlePut}>
                    Push
                </Button>
            )}

            <TextField
                onChange={({ target }) => {
                    setInput({ ...input, id: target.value })
                }}
                variant="outlined"
                value={input.value}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <Button variant="contained" onClick={handleGet}>
                    Get
                </Button>
            )}
        </>
    )
}

export default App
