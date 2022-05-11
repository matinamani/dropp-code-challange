import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

const MyDialog = ({ title, text, open, setOpen, onConfirm }) => {
    const handleClose = () => setOpen(false)
    const handleReject = () => setOpen(false)

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReject}
                >
                    Reject
                </Button>
                <Button variant="contained" color="error" onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MyDialog
