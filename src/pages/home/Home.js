import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link, Avatar, IconButton, Button } from '@mui/material';
import { useTheme } from '@mui/system'
// import Register Form from "../../sections/auth/RegisterForm";
import AuthSocial from '../../sections/auth/AuthSocial';
import RegisterForm from '../../sections/auth/RegisterForm';
import lightimg from '../../assets/Images/chat-app-demo.png'
import darkimg from '../../assets/Images/demo_dark.png'
import { faker } from '@faker-js/faker';
import githubLogo from '../../assets/Logos/github.png'
import linkedinLogo from '../../assets/Logos/linkedin.png'
import pinkMessenger from '../../assets/Logos/pink-messenger.png'
import AntSwitch from '../../components/AntSwitch';
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function Home() {

    const theme = useTheme();
    const [upload, setUpload] = useState("false")

    const { onToggleMode } = useSettings();


    return (
        <>
            <Stack alignItems={"center"} direction="row" justifyContent={"space-evenly"} spacing={15}
                sx={{ width: "100%", height: "100%" }}>
                <Stack spacing={2} sx={{ mt: 5 }}>
                    <img style={{ width: 150, height: 150 }} alt='whatever' src={pinkMessenger} />
                    <Typography style={{
                        background: "-webkit-linear-gradient(45deg, #FE6B8B 20%, #FF8E53 60%)",
                        webkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }} variant="h1">Connect,</Typography>
                    <Typography style={{
                        background: "-webkit-linear-gradient(45deg, #FE6B8B 20%, #FF8E53 60%)",
                        webkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }} variant="h1">anywhere,</Typography>
                    <Typography style={{
                        background: "-webkit-linear-gradient(45deg, #FE6B8B 20%, #FF8E53 60%)",
                        webkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }} variant="h1">anytime</Typography>

                    <Typography variant='h6'>Our app makes it easy and fun to stay close to your favorite people.</Typography>
                    <Button style={{
                        background: "-webkit-linear-gradient(45deg, #FE6B8B 20%, #FF8E53 60%)",
                        webkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        width: "20px",
                        fontSize: "20px"
                    }} href='/auth/login' variant="text">Login</Button>
                </Stack>


                <img style={{
                    boxShadow: "6px 8px 1px #F0F0F0"
                }} alt="ho" src={theme.palette.mode === "light" ? lightimg : darkimg} />
                <Stack>
                    <Stack direction="column" spacing={4}>
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <Avatar src={faker.image.avatar()} />
                        <AntSwitch onChange={() => { onToggleMode() }} defaultChecked />

                    </Stack>

                </Stack>

            </Stack>
            <Stack direction="row" alignContent="center" justifyContent="space-evenly" spacing={0}>
                <IconButton target="_blank" href='https://github.com/hassankaz1/messenger-frontend'>
                    <img style={{ width: 30, height: 30 }} src={githubLogo} />
                </IconButton>

                <IconButton target="_blank" href='https://www.linkedin.com/in/hassan-kaz1/'>
                    <img style={{ width: 30, height: 30 }} src={linkedinLogo} />
                </IconButton>

            </Stack>

        </>
    );
}