import React from 'react'
import { Box, Divider, Stack, Typography, Link, IconButton } from '@mui/material';
import { useTheme } from '@mui/system'
import { DownloadSimple, Image } from 'phosphor-react';


const DocMsg = ({ e }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={e.incoming ? "start" : "end"}>
            <Box p={1.5}
                sx={{
                    backgroundColor: e.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}>

                <Stack spacing={2}>
                    <Stack
                        p={2}
                        spacing={3}
                        direction="row"
                        alignItems="center"
                        sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <Image size={48} />
                        <Typography variant="caption">Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography variant='body2' sx={{ color: e.incoming ? theme.palette.text : "#fff" }}>{e.message}</Typography>
                </Stack>
            </Box>
        </Stack>
    )
}



const LinkMsg = ({ e }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={e.incoming ? "start" : "end"}>
            <Box p={1.5}
                sx={{
                    backgroundColor: e.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}>

                <Stack spacing={2}>
                    <Stack p={2} spacing={3} alignItems="start" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <img src={e.preview} alt={e.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>Creating Chat App</Typography>
                            <Typography
                                variant='subtitle2'
                                component={Link}
                                to="www.youtube.com"
                                sx={{ color: theme.palette.primary.main }}>www.youtube.com</Typography>
                        </Stack>
                        <Typography variant='body2' color={e.incoming ? theme.palette.text : "#fff"}>
                            {e.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}



const ReplyMsg = ({ e }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={e.incoming ? "start" : "end"}>
            <Box p={1.5}
                sx={{
                    backgroundColor: e.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}>

                <Stack spacing={2}>
                    <Stack p={2} direction="column" spacing={3} alignItems="center" sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <Typography variant='body2' color={theme.palette.text}>
                            {e.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color={e.incoming ? theme.palette.text : "#fff"}>
                        This is a reply
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    )
}




const MediaMsg = ({ e }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} justifyContent={e.incoming ? "start" : "end"}>
            <Box p={1.5}
                sx={{
                    backgroundColor: e.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Stack spacing={1}>
                    <img src={e.img} alt={e.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                    <Typography variant='body2' color={e.incoming ? theme.palette.text : "#fff"}>
                        {e.message}
                    </Typography>
                </Stack>
            </Box>


        </Stack>
    )
}



const TextMsg = ({ e }) => {
    const theme = useTheme()

    return (
        <Stack direction="row" justifyContent={e.incoming ? "start" : "end"}>
            <Box p={1.5}
                sx={{
                    backgroundColor: e.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Typography variant="body2" color={e.incoming ? theme.palette.text : "#fff"}>
                    {e.message}
                </Typography>

            </Box>
        </Stack>
    )
}



const Timeline = ({ e }) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center" justifyContent={"space-between"}>
            <Divider width="46%" />
            <Typography variant='caption' sx={{ color: theme.palette.text }}>{e.text}</Typography>
            <Divider width="46%" />
        </Stack>
    )
}

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };