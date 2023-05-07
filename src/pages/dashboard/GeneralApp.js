import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import { useTheme } from '@mui/system'
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMsg from "../../components/SharedMsg";
import NoChat from "../../assets/Illustration/NoChat"
import { Link } from "phosphor-react";


const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((store) => store.app)
  const { current_conversation } = useSelector((state) => state.conversation.one_to_one_chat);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />

      <Box sx={{
        height: "100%",
        width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
        backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper
      }}>
        {/* Conversation */}
        {current_conversation ?
          (<Conversation />) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a new one
              </Typography>
            </Stack>
          )}
      </Box>
      {/* Contact */}
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;

            // case "STARRED":
            //   return <StarredMessages />;

            case "SHARED":
              return <SharedMsg />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
