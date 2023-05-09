import { faker } from '@faker-js/faker';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app';
import AntSwitch from './AntSwitch';


const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const BlockDialog = ({ open, handleClose }) => {
    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle>{"Block this Contact"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to block this Contact?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
    </Dialog>

}


const DeleteDialog = ({ open, handleClose }) => {
    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle>{"Delete this Contact"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this Contact?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
    </Dialog>

}

const Contact = () => {
    const theme = useTheme();
    const dispath = useDispatch();
    const { img, name, online } = useSelector((state) => state.conversation.one_to_one_chat.current_conversation);
    const [openBlock, setOpenBlock] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleCloseBlock = () => {
        setOpenBlock(false);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }


    return (
        <Box sx={{ width: "320px", height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                {/* Header */}
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
                }}>
                    <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} justifyContent="space-between" spacing={3}>
                        <Typography variant='subtitle2'> Contact Info</Typography>
                        <IconButton onClick={() => { dispath(ToggleSidebar()) }}>
                            <X />
                        </IconButton>
                    </Stack>
                </Box>
                {/* Body */}
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={3} spacing={3}>
                    <Stack alignItems={"center"} direction="row" spacing={2}>
                        <Avatar src={img} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
                        <Stack spacing={0.5}>
                            <Typography variant='article' fontWeight={600}>
                                {name}
                            </Typography>
                            <Typography variant='body2' fontWeight={500}>
                                n/a
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" alignItems={"center"} justifyContent='space-evenly'>
                        <Stack spacing={1} alignItems="center">
                            <IconButton>
                                <Phone />
                            </IconButton>
                            <Typography variant='overline'> Voice</Typography>
                        </Stack>
                        <Stack spacing={1} alignItems="center">
                            <IconButton>
                                <VideoCamera />
                            </IconButton>
                            <Typography variant='overline'> Video</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack spacing={0.5}>
                        <Typography variant="article">About</Typography>
                        <Typography variant="body2">Work in Progres - This section is still being built</Typography>
                        <Typography variant="body2">The media shown below is just demo</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                        <Typography variant="subtitle2">Media, Links & Docs</Typography>
                        <Button onClick={() => { dispath(UpdateSidebarType("SHARED")) }} endIcon={<CaretRight />}>
                            401
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {[1, 2, 3].map((e) => (
                            <Box>
                                <img src={faker.image.food()} alt={faker.name.fullName()} />
                            </Box>
                        ))}
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Star size={21} />
                            <Typography cariant="subtitle2">Starred Messages</Typography>
                        </Stack>
                        <IconButton onClick={() => { dispath(UpdateSidebarType("STARRED")) }} >
                            <CaretRight />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Bell size={21} />
                            <Typography cariant="subtitle2">Mute Notifications</Typography>
                        </Stack>
                        <AntSwitch />
                    </Stack>
                    <Divider />
                    <Typography>1 Group in Common</Typography>
                    <Stack direction={"row"} spacing={2} alignItems="center">
                        <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                        <Stack spacing={0.5}>
                            <Typography variant='subtitle2'>Best Group</Typography>
                            <Typography variant='caption'>Kilam, Jon, Billard</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} alignItems="center" spacing={2}>
                        <Button onClick={() => {
                            setOpenBlock(true)
                        }} fullWidth startIcon={<Prohibit />} variant="outlined">
                            Block
                        </Button>
                        <Button onClick={() => {
                            setOpenDelete(true)
                        }} fullWidth startIcon={<Trash />} variant="outlined">
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
            {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}

        </Box>
    )
}

export default Contact