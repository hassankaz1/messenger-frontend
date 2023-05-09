import { useTheme } from "@mui/system";
import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, Button } from "@mui/material";
import { Gear } from "phosphor-react";
import React, { useState } from "react";
import { Nav_Buttons } from "../../data";
import useSettings from "../../hooks/useSettings";
import Logo from "../../assets/Images/logo.ico"
import AntSwitch from "../../components/AntSwitch";
import { Profile_Menu } from "../../data";
import { LogoutUser } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";


const uid = window.localStorage.getItem("uid");

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children: React.ReactElement<any, any>; },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const getMenuPath = (index) => {
    switch (index) {
        case 0:
            return "/profile";
        case 1:
            return "/settings";
        default:
            break;
    }
}

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




const Sidebar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const [openInfo, setOpenInfo] = useState(false);


    const { current_user } = useSelector((state) => state.auth);
    const { onToggleMode } = useSettings();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    }





    return (
        <Box p={2} sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 100 }}>
            <Stack alignItems={"center"} justifyContent="space-between" spacing={4} sx={{ width: "100%", height: "100%" }} direction={"column"}>
                <Stack spacing={4} alignItems={"center"} >

                    <Box sx={{
                        height: 45,
                        width: 45,
                        borderRadius: 1.5
                    }}>
                        <img src={Logo} alt="hi" />
                    </Box>

                    <Stack sx={{ width: "max-content" }} direction="column" alignItems={"center"} spacing={3}>
                        {Nav_Buttons.map((e) => (
                            e.index === selected ?
                                <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} >
                                    <IconButton sx={{ width: "max-content", color: "#fff" }} key={e.index}>
                                        {e.icon}
                                    </IconButton>
                                </Box>
                                :
                                <IconButton
                                    onClick={() => {
                                        setSelected(e.index)
                                        if (e.index !== 0) {
                                            setOpenInfo(true)
                                        }
                                    }}
                                    sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.primary }} key={e.index}>
                                    {e.icon}
                                </IconButton>

                        ))}

                        <Divider sx={{ width: "48px" }} />

                        {selected === 3 ? (
                            <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }} >
                                <IconButton sx={{ width: "max-content", color: "#fff" }} >
                                    <Gear />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setSelected(3)
                                    setOpenInfo(true)
                                }} sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.primary }}>
                                <Gear />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <AntSwitch onChange={() => { onToggleMode() }} defaultChecked />
                    <Avatar id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} src={current_user.avatar} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <Stack spacing={1} px={1}>
                            {Profile_Menu.map((e, idx) => (
                                <MenuItem onClick={() => {
                                    handleClick();
                                }}>
                                    <Stack onClick={() => {
                                        if (idx === 2) {
                                            socket.emit("end", { uid })
                                            dispatch(LogoutUser())
                                        } else {
                                            setOpenInfo(true)
                                            // navigate(getMenuPath(idx))
                                        }
                                    }}
                                        sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent="space-between">
                                        <span>
                                            {e.title}
                                        </span>
                                        {e.icon}
                                    </Stack>

                                </MenuItem>
                            ))}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>
            {openInfo && <InfoDialog open={openInfo} handleClose={handleCloseInfo} />}

        </Box>
    )
}

export default Sidebar