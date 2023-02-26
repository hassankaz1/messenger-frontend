import React from 'react'
import { Box, Divider, Stack } from '@mui/material'
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import Messages from './Messages';








const Conversation = () => {
    return (
        <Stack height="100%" maxHeight={"100vh"} width={"auto"}>
            <ChatHeader />

            {/*MSG */}
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
                <Messages />
                {/* <Divider /> */}
            </Box>
            {/*Chat Footer */}
            <ChatFooter />


        </Stack>
    )
}

export default Conversation