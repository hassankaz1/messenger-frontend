import React, { useState } from 'react'
import { Avatar, Box, Stack, Typography, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Button } from '@mui/material'
import { useTheme } from '@mui/system'
import { faker } from '@faker-js/faker';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';


const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoDialog = ({ open, handleClose }) => {
    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle>{"SORRY COMING SOON"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                This project is still work in progress. Functionality still not available:
                <br />
                <ul style={{ textAlign: "center", listStyleType: "none" }}>
                    <li> - Settings</li>
                    <li> - Group Chat</li>
                    <li> - Media Share</li>
                    <li> - Edit Profile</li>
                    <li> - Audio/Video Call</li>
                </ul>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Come Back Soon</Button>
        </DialogActions>
    </Dialog>

}


const ChatHeader = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [openInfo, setOpenInfo] = useState(false);

    const { img, name, online } = useSelector((state) => state.conversation.one_to_one_chat.current_conversation);


    const handleCloseInfo = () => {
        setOpenInfo(false);
    }

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
                        {online ? (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt={faker.name.fullName()} src={img} />
                            </StyledBadge>
                        ) : (
                            <Avatar alt={faker.name.fullName()} src={img} />
                        )}

                    </Box>

                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>{name}</Typography>
                        <Typography variant='caption'>{online ? "Online" : "Offline"}</Typography>
                    </Stack>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <IconButton onClick={() => { setOpenInfo(true) }}>
                        <VideoCamera />
                    </IconButton>
                    <IconButton onClick={() => { setOpenInfo(true) }}>
                        <Phone />
                    </IconButton>
                    <IconButton onClick={() => { setOpenInfo(true) }}>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton onClick={() => { setOpenInfo(true) }}>
                        <CaretDown />
                    </IconButton>
                </Stack>


            </Stack>

            {openInfo && <InfoDialog open={openInfo} handleClose={handleCloseInfo} />}

        </Box>
    )
}

export default ChatHeader;