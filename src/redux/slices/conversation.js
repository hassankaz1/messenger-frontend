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
                    img: user.avatar,
                    msg: messages.length > 0 ? messages.slice(-1)[0].message : "",
                    time: messages.length > 0 ? messages.slice(-1)[0].time : "",
                    unread: 0,
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

            state.one_to_one_chat.conversations = [{
                id: new_conversation.cid,
                user_id: user.id,
                name: `${user.first_name} ${user.last_name}`,
                online: user.on_line,
                img: user.avatar,
                msg: new_conversation.messages.length > 0 ? new_conversation.messages.slice(-1)[0].message : "",
                time: time_t.slice(0, time_t.length - 6),
                unread: 0,
                pinned: false,
                about: "need to fix about",
                messages: new_conversation.messages
            }, ...state.one_to_one_chat.conversations];
        },
        setCurrentConversation(state, action) {
            let current_id = action.payload

            const convo_idx = state.one_to_one_chat.conversations.findIndex((conv) => conv.id == current_id)
            const curr_convo = state.one_to_one_chat.conversations[convo_idx]
            curr_convo.unread = 0

            state.one_to_one_chat.current_conversation = curr_convo

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
            console.log("atempting")
            console.log(action.payload)
            state.one_to_one_chat.current_conversation.messages.push(action.payload.message);
        },
        updateOneToOneMessage(state, action) {
            const new_message = action.payload.message
            const convo_idx = state.one_to_one_chat.conversations.findIndex((conv) => conv.id == action.payload.cid)

            if (convo_idx > -1) {
                state.one_to_one_chat.conversations[convo_idx].msg = new_message.message
                state.one_to_one_chat.conversations[convo_idx].time = new_message.time
                state.one_to_one_chat.conversations[convo_idx].unread += 1
                state.one_to_one_chat.conversations[convo_idx].messages.push(new_message)
            }


            // state.one_to_one_chat.current_conversation.messages.push(action.payload.message);
        },
        recieveNewMessage(state, action) {
            const conv_id = action.payload.cid
            const new_message = action.payload.message
            const convo_idx = state.one_to_one_chat.conversations.findIndex((conv) => conv.id == action.payload.cid)

            const curr_convo = state.one_to_one_chat.conversations[convo_idx]

            if (conv_id == state.one_to_one_chat.current_conversation.id) {
                state.one_to_one_chat.current_conversation.messages.push(action.payload.message);
            } else {
                slice.actions.updateOneToOneMessage(action.payload)
                state.one_to_one_chat.conversations[convo_idx].unread += 1
                state.one_to_one_chat.conversations[convo_idx].messages.push(new_message)
            }
            state.one_to_one_chat.conversations[convo_idx].msg = new_message.message
            state.one_to_one_chat.conversations[convo_idx].time = new_message.time


            state.one_to_one_chat.conversations.splice(convo_idx, 1);
            state.one_to_one_chat.conversations = [curr_convo, ...state.one_to_one_chat.conversations]

        },
        resetCurrentConversation(state, action) {
            state.one_to_one_chat.current_conversation = null
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
export const ResetCurrentConversation = () => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.resetCurrentConversation());
    }
}
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

export const UpdateOneToOneMessage = (m) => {

    const msg_date = new Date(m.created_at)
    const time_t = msg_date.toLocaleTimeString('en-US');
    const cid = m.cid

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


    return async (dispatch, getState) => {
        dispatch(slice.actions.recieveNewMessage({ message, cid }));
    }
}