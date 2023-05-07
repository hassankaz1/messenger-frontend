import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";

const uid = window.localStorage.getItem("uid");

const initialState = {
    one_to_one_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: [],
    },
    group_chat: {},
};

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchOneToOneConversations(state, action) {
            const convos = action.payload.conversations.map((conv) => {
                const user = conv.user
                const messages = conv.messages.map((m) => {

                    const msg_date = new Date(m.created_at)
                    const time_t = msg_date.toLocaleTimeString('en-US');

                    return {
                        type: m.msgtype,
                        message: m.msg,
                        datetime: msg_date,
                        time: time_t.slice(0, time_t.length - 6),
                        incoming: m.recipient == uid ? true : false,
                        outgoing: m.sender == uid ? true : false,
                        img: m.img,
                        link: m.filelink
                    }
                })

                // console.log(messages)
                return {
                    id: conv.cid,
                    user_id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    online: user.on_line,
                    img: `https://static.toiimg.com/thumb/msid-56833673,width-1280,resizemode-4/56833673.jpg`,
                    msg: messages.length > 0 ? messages.slice(-1)[0].message : "",
                    time: messages.length > 0 ? messages.slice(-1)[0].time : "",
                    unread: 5,
                    pinned: false,
                    about: "need to fix about",
                    messages: messages
                };
            });

            state.one_to_one_chat.conversations = convos;
        },
        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            state.one_to_one_chat.conversations = state.one_to_one_chat.conversations.map(
                (el) => {
                    if (el?.id !== this_conversation._id) {
                        return el;
                    } else {
                        const user = this_conversation.participants.find(
                            (elm) => elm._id.toString() !== uid
                        );
                        return {
                            id: this_conversation._id._id,
                            user_id: user?._id,
                            name: `${user?.firstName} ${user?.lastName}`,
                            online: user?.status === "Online",
                            img: faker.image.avatar(),
                            msg: faker.music.songName(),
                            time: "9:36",
                            unread: 0,
                            pinned: false,
                        };
                    }
                }
            );
        },
        addOneToOneConversation(state, action) {
            const new_conversation = action.payload.conversation;
            const user = new_conversation.user

            const msg_date = new Date()
            const time_t = msg_date.toLocaleTimeString('en-US');

            state.one_to_one_chat.conversations.push({
                id: new_conversation.cid,
                user_id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                online: user.on_line,
                img: `https://i.pinimg.com/736x/57/4e/4f/574e4f8a064686c3da38d3ca54e29ea4.jpg`,
                msg: new_conversation.messages.length > 0 ? new_conversation.messages.slice(-1)[0].message : "",
                time: time_t,
                unread: 0,
                pinned: false,
                about: "need to fix about",
                messages: new_conversation.messages
            });
        },
        setCurrentConversation(state, action) {
            let current_id = action.payload

            state.one_to_one_chat.current_conversation = state.one_to_one_chat.conversations.filter((conv) => conv.id == current_id)[0];
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => ({
                id: el._id,
                type: "msg",
                subtype: el.type,
                message: el.text,
                incoming: el.to === uid,
                outgoing: el.from === uid,
            }));
            state.one_to_one_chat.current_messages = formatted_messages;
        },
        addOneToOneMessage(state, action) {
            state.one_to_one_chat.current_conversation.messages.push(action.payload.message);
        }
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchOneToOneConversations = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchOneToOneConversations({ conversations }));
    };
};
export const AddOneToOneConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addOneToOneConversation({ conversation }));
    };
};
export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }));
    };
};

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        console.log(current_conversation)
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};


export const FetchCurrentMessages = ({ messages }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({ messages }));
    }
}

export const AddOneToOneMessage = (m) => {
    const msg_date = new Date(m.created_at)
    const time_t = msg_date.toLocaleTimeString('en-US');

    const message = {
        type: m.msgtype,
        message: m.msg,
        datetime: msg_date,
        time: time_t.slice(0, time_t.length - 6),
        incoming: m.recipient == uid ? true : false,
        outgoing: m.sender == uid ? true : false,
        img: m.img,
        link: m.filelink
    }

    console.log(message)


    return async (dispatch, getState) => {
        dispatch(slice.actions.addOneToOneMessage({ message }));
    }
}