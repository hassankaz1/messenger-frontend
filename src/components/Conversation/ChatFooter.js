import React, { useState, useRef } from 'react'
import { Box, Stack, IconButton, InputAdornment, TextField, Fab, Tooltip } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User } from 'phosphor-react';
import { useDispatch, useSelector } from 'react-redux';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { socket } from '../../socket';



const uid = window.localStorage.getItem("uid");

const ChatInput = ({ openEmoji, setOpenEmoji, value, setValue, handleSubmit }) => {
    const [openActions, setOpenActions] = useState(false);

    const enter = (e) => {
        if (e.key == "Enter") {
            handleSubmit()
        }
    }

    return (
        <StyledInput
            fullWidth
            onKeyDown={enter}
            placeholder="Write a message..."
            variant="filled" value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack
                            sx={{
                                position: "relative",
                                display: openActions ? "inline-block" : "none",
                            }}
                        >
                            {Actions.map((el) => (
                                <Tooltip placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                                            setOpenActions(!openActions);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>

                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenActions(!openActions);
                                }}
                            >
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <Stack sx={{ position: "relative" }}>
                        <InputAdornment>
                            <IconButton
                                onClick={() => {
                                    setOpenEmoji(!openEmoji);
                                }}
                            >
                                <Smiley />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
            }}
        />
    );
};


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    },
}));

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];



const ChatFooter = () => {
    const theme = useTheme();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const { id, user_id } = useSelector((state) => state.conversation.one_to_one_chat.current_conversation);


    function handleEmojiClick(emoji) {
        setValue(value + emoji.native)
    }

    const handleSubmit = () => {
        const data_to_send = {
            recipient: user_id,
            sender: uid,
            cid: id,
            message: value
        }

        console.log(data_to_send)

        socket.emit("message", data_to_send)

        setValue("")
    }

    const something = (event) => {
        if (event.key === 'Enter') {
            console.log('enter')
        }
    }




    return (
        <Box p={2} sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
        }}>
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openEmoji ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={handleEmojiClick} />
                    </Box>
                    <ChatInput handleSubmit={handleSubmit} openEmoji={openEmoji} setOpenEmoji={setOpenEmoji} value={value} setValue={setValue} />
                </Stack>
                <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems="center" justifyContent="center">
                        <IconButton onClick={handleSubmit}>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>

            </Stack>

        </Box>
    )
}

export default ChatFooter