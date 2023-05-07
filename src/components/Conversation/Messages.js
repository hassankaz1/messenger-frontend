import { Box, Stack } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/system'
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MessageType'
import { useSelector, useDispatch } from "react-redux";


const Messages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.conversation.one_to_one_chat.current_conversation);

    console.log(messages)


    return (
        <Box p={3}>
            <Stack spacing={3}>
                {messages.map((m) => {
                    switch (m.type) {
                        case "divider":
                            return <Timeline e={m} />
                        case "msg":
                            switch (m.subtype) {
                                case "img":
                                    return <MediaMsg e={m} />
                                case "doc":
                                    return <DocMsg e={m} />
                                case "link":
                                    return <LinkMsg e={m} />
                                case "reply":
                                    return <ReplyMsg e={m} />
                                default:
                                    return <TextMsg e={m} />
                            }

                    }
                })}

            </Stack>
        </Box>
    )
}

export default Messages