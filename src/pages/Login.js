import { useState } from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import LoginCard from '../components/sections/LoginCard'
import SignUpCard from '../components/sections/SignUpCard'

const Login = () => {
    const [signUp, setSignUp] = useState(false)

    const toggleSignUp = () => setSignUp(!signUp)

    return signUp ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <SignUpCard />
            <LoginCaption onClick={toggleSignUp} />
        </Box>
    ) : (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <LoginCard />
            <SignUpCaption onClick={toggleSignUp} />
        </Box>
    )
}

const LoginCaption = ({ onClick }) => (
    <>
        <Typography variant="caption">Already Have an Account?</Typography>
        <Typography
            variant="caption"
            onClick={onClick}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            align="center"
        >
            Login
        </Typography>
    </>
)

const SignUpCaption = ({ onClick }) => (
    <>
        <Typography variant="caption">Don't Have an Account?</Typography>
        <Typography
            variant="caption"
            onClick={onClick}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            align="center"
        >
            SignUp
        </Typography>
    </>
)

export default Login
