import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const MySnackbar = ({ children, severity, open, setOpen, ...props }) => {
    const handleClose = () => setOpen(false)

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            {...props.snackbarProps}
        >
            <Alert
                severity={severity}
                onClose={handleClose}
                {...props.alertProps}
            >
                {children}
            </Alert>
        </Snackbar>
    )
}

export default MySnackbar
