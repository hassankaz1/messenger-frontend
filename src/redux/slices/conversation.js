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
        fetchDirectConversations(state, action) {
            const list = action.payload.conversations.map((el) => {
                const user = el.participants.find(
                    (elm) => elm.id.toString() !== uid
                );
                return {
                    id: el.id,
                    user_id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    online: user.on_line,
                    img: `https://static.toiimg.com/thumb/msid-56833673,width-1280,resizemode-4/56833673.jpg`,
                    msg: el.messages.slice(-1)[0].text,
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                    about: "need to fix",
                };
            });

            state.one_to_one_chat.conversations = list;
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
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            const user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== uid
            );
            state.one_to_one_chat.conversations = state.one_to_one_chat.conversations.filter(
                (el) => el?.id !== this_conversation._id
            );
            state.one_to_one_chat.conversations.push({
                id: this_conversation._id._id,
                user_id: user?._id,
                name: `${user?.firstName} ${user?.lastName}`,
                online: user?.status === "Online",
                img: faker.image.avatar(),
                msg: faker.music.songName(),
                time: "9:36",
                unread: 0,
                pinned: false,
            });
        },
        setCurrentConversation(state, action) {
            state.one_to_one_chat.current_conversation = action.payload;
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
        addDirectMessage(state, action) {
            state.one_to_one_chat.current_messages.push(action.payload.message);
        }
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const FetchDirectConversations = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({ conversations }));
    };
};
export const AddDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({ conversation }));
    };
};
export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }));
    };
};

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};


export const FetchCurrentMessages = ({ messages }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({ messages }));
    }
}

export const AddDirectMessage = (message) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectMessage({ message }));
    }
}