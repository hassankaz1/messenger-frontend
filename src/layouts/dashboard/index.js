import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { connectSocket, socket } from "../../socket";
import BackendApi from "../../backendApi";
import { showSnackbar } from "../../redux/slices/app";


const DashboardLayout = () => {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { conversations } = useSelector((state) => state.conversation.one_to_one_chat);

  console.log("convo----\n", conversations)
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
        console.log(data)
      });



    }

  }, [isLoggedIn, socket])

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
