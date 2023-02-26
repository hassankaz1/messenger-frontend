import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MessageType'

const Messages = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((m) => {
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