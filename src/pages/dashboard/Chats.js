import { Badge, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Link } from '@mui/material'
import { Box } from '@mui/system'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { alpha, styled, useTheme } from '@mui/system'
import { ChatList } from '../../data'
import { SimpleBarStyle } from '../../components/Scrollbar'
import Friends from '../../sections/main/Friends'
import { socket } from '../../socket'
import { useDispatch, useSelector } from 'react-redux'
import { FetchOneToOneConversations, SetCurrentConversation } from '../../redux/slices/conversation'


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    return (
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
            cursor: 'pointer'
        }}
            p={2}
            onClick={
                () => {
                    dispatch(SetCurrentConversation(id))
                }
            }
        >


            <Stack direction={"row"} alignItems={"center"} justifyContent="space-between">
                <Stack direction={"row"} spacing={2}>

                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"

                        >
                            <Avatar src={img} />
                        </StyledBadge>
                    ) : (

                        <Avatar src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>

                        <Typography variant="caption">
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems="center">
                    <Typography variant='caption' sx={{ fontWeight: 600 }}>
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}></Badge>
                </Stack>


            </Stack>


        </Box>
    )
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.paper, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const uid = window.localStorage.getItem("uid")



const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();

    const dispatch = useDispatch();

    const { conversations } = useSelector((state) => state.conversation.one_to_one_chat);

    useEffect(() => {
        socket.emit("get_existing_convos", { uid }, (data) => {
            // data => list of convos 
            console.log("------finding conversations------")
            console.log(data)
            dispatch(FetchOneToOneConversations({ conversations: data }))

        })

    }, [])

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    height: "100vh",
                    width: 320,
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
                }}>

                <Stack p={3} spacing={2} sx={{ height: "100vh", }}>
                    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                        <Typography variant='h5'>
                            Chats
                        </Typography>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>

                            <IconButton onClick={() => [
                                handleOpenDialog()
                            ]}>
                                <Users />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>

                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709CE6' />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={"row"} alignItems="center" spacing={1.5} >
                            <ArchiveBox size={24} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack
                        direction={"column"}
                        sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
                        spacing={2}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            {/* <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                    Pinned
                                </Typography>
                                {ChatList.filter((c) => c.pinned).map((e) => {
                                    return <ChatElement {...e} />
                                })}
                            </Stack> */}

                            <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                                    All Chats
                                </Typography>
                                {conversations.filter((c) => !c.pinned).map((e) => {
                                    return <ChatElement {...e} />
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>

                </Stack>

            </Box >
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}
        </>


    )
}

export default Chats