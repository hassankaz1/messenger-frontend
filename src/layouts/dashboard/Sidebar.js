import { useTheme } from "@mui/system";
import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem } from "@mui/material";
import { Gear } from "phosphor-react";
import React, { useState } from "react";
import { Nav_Buttons } from "../../data";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import Logo from "../../assets/Images/logo.ico"
import AntSwitch from "../../components/AntSwitch";
import { Profile_Menu } from "../../data";

const Sidebar = () => {
    const theme = useTheme();
    const [selected, setSelected] = useState(0);

    const { onToggleMode } = useSettings();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };





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
                        onClick={handleClick} src={faker.image.avatar()} />
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
                            {Profile_Menu.map((e) => (
                                <MenuItem onClick={handleClick}>
                                    <Stack sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent="space-between">
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
        </Box>
    )
}

export default Sidebar