import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { connectSocket, socket } from "../../socket";
import BackendApi from "../../backendApi";
import { showSnackbar } from "../../redux/slices/app";
import { AddOneToOneConversation, AddOneToOneMessage, UpdateOneToOneMessage } from "../../redux/slices/conversation";


const DashboardLayout = () => {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { conversations, current_conversation } = useSelector((state) => state.conversation.one_to_one_chat);

  const uid = window.localStorage.getItem("uid")

  useEffect(() => {

    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + '#loaded'
          window.location.reload();
        }
      }

      window.onload();

      console.log("------")
      console.log(socket)

      // BackendApi.getFriends()


      if (!socket) {
        connectSocket(uid)
        console.log(socket)
        console.log("still not working")

      }


      socket.on("friend_request_recieved", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("friend_request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });


      socket.on("start_conversation", (data) => {
        console.log("starting new convo")
        dispatch(AddOneToOneConversation({ conversation: data }));
        console.log(data)
      });


      socket.on("new_message", (data) => {

        console.log(data.data.cid, current_conversation.id)

        dispatch(UpdateOneToOneMessage(data.data))

        // if (current_conversation.id == data.data.cid) {
        //   dispatch(AddOneToOneMessage(data.data))
        // } else {
        //   console.log("not current convo")
        //   dispatch(UpdateOneToOneMessage(data.data))
        // }
      })



    }
    // Remove event listener on component unmount
    return () => {
      socket?.off("friend_request_recieved");
      socket?.off("friend_request_accepted");
      socket?.off("request_sent");
      socket?.off("start_conversation");
      socket?.off("new_message");
    };

  }, [isLoggedIn, socket])



  if (!isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
