import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'

import Logo from "../../assets/Images/logo.ico"


const Login = () => {
    return (
        <>
            <Stack sx={{ width: "100%" }} direction="column" alignItems={"center"}>
                <img style={{ height: "90px", width: "90px" }} src={Logo} alt="none" />
            </Stack>
            <Stack spacing={2} sx={{ mt: 5, position: "relative" }}>
                <Typography variant="h4">Login to Messenger</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">New User?</Typography>
                    <Link to="/auth/register" component={RouterLink} variant="subtitle2">
                        Create an account
                    </Link>
                </Stack>
                {/* Login Form */}
                <LoginForm />
                {/* Auth Social */}
                <AuthSocial />
            </Stack>
        </>
    )
}

export default Login