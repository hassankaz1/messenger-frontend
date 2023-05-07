import React from 'react'
import { Avatar, Box, Stack, Typography, IconButton, Divider } from '@mui/material'
import { useTheme } from '@mui/system'
import { faker } from '@faker-js/faker';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';


const ChatHeader = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { img, name, online } = useSelector((state) => state.conversation.one_to_one_chat.current_conversation);




    return (
        <Box p={2} sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) "
        }}>
            <Stack alignItems={"center"} direction="row" justifyContent={"space-between"}
                sx={{ width: "100%", height: "100%" }}>

                <Stack onClick={() => { dispatch(ToggleSidebar()) }} direction={"row"} spacing={2} sx={{ cursor: 'pointer' }}>
                    <Box>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
                        </StyledBadge>
                    </Box>

                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>{name}</Typography>
                        <Typography variant='caption'>Online</Typography>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>


            </Stack>
        </Box>
    )
}

export default ChatHeader;