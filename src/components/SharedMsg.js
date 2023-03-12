import { Box, IconButton, Stack, Typography, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@mui/system'
import { CaretLeft } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../redux/slices/app'

const SharedMsg = () => {

    const theme = useTheme()
    const dispath = useDispatch()


    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
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
                        <IconButton onClick={() => { dispath(UpdateSidebarType("CONTACT")) }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'> Shared Messages</Typography>
                    </Stack>
                </Box>

                <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Doc" />
                </Tabs>

                {/* Body */}
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={3} spacing={3}>


                </Stack>


            </Stack>
        </Box>
    )
}

export default SharedMsg