import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequests, FetchFriends, FetchUsers } from "../../redux/slices/app";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/UserComponent";
// import {
//   FetchFriendRequests,
//   FetchFriends,
//   FetchUsers,
// } from "../../redux/slices/app";
// import { FriendElement, FriendRequestElement, UserElement } from "../../components/UserElement";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
    const dispatch = useDispatch();

    const { users } = useSelector((state) => state.app);

    console.log("all users")

    console.log(users)


    useEffect(() => {
        dispatch(FetchUsers());

    }, []);

    return (
        <>
            {users.users ? (users.users.map((el, idx) => {
                return <UserElement key={idx} {...el} />;
            })) : (<></>)}
        </>
    );
};

const FriendsList = () => {
    const dispatch = useDispatch();

    const { friends } = useSelector((state) => state.app);
    console.log(friends)

    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    return (
        <>
            {friends.friends ? (friends.friends.map((el, idx) => {
                return <FriendElement key={idx} {...el} />;
            })) : (<></>)}
        </>
    );
};

const RequestsList = () => {
    const dispatch = useDispatch();

    const { friendRequests } = useSelector((state) => state.app);
    console.log(friendRequests)

    useEffect(() => {
        dispatch(FetchFriendRequests());
    }, []);

    return (
        <>
            {friendRequests.requests ? (friendRequests.requests.map((el, idx) => {
                return <FriendRequestElement key={idx} {...el} />;
            })) : (<></>)}
        </>
    );
};

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            {/* <DialogTitle>{"Friends"}</DialogTitle> */}
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.4}>
                        {(() => {
                            switch (value) {
                                case 0: // display all users in this list
                                    return <UsersList />;

                                case 1: // display friends in this list
                                    // return <Stack />;
                                    return <FriendsList />;

                                case 2: // display request in this list
                                    // return <Stack />;
                                    return <RequestsList />;

                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default Friends;