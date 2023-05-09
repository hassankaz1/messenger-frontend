import { Divider, IconButton, Stack } from '@mui/material'
import githubLogo from "../../assets/Logos/github.png"
import googleLogo from "../../assets/Logos/google.png"
import facebookLogo from "../../assets/Logos/facebook.png"
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

const AuthSocial = () => {
    return (
        <div>
            <Divider sx={{ my: 2.5, typography: "overline", color: "text.disabled", }}>OR</Divider>
            <Stack direction={"row"} justifyContent="center" spacing={2}>
                <IconButton>
                    <img style={{ width: 30, height: 30 }} src={googleLogo} />
                </IconButton>
                <IconButton>
                    <img style={{ width: 30, height: 30 }} src={githubLogo} />
                </IconButton>
                <IconButton>
                    <img style={{ width: 30, height: 30 }} src={facebookLogo} />
                </IconButton>

            </Stack>

        </div>
    )
}

export default AuthSocial