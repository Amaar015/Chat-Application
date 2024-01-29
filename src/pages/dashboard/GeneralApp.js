import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Conversation/Contact";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";
import SharedMessage from "../../components/SharedMessage";
import StarredMessage from "../../components/StarredMessage";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction="row" width="100%">
      {/* Chats */}
      <Chats />

      {/* Coversation */}
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor: "#fff",
        }}
      >
        <Conversation />
      </Box>
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "Contact":
              return <Contact />;
            case "Starred":
              return <StarredMessage />;
            case "Shared":
              return <SharedMessage />;
            default:
              return "hello bare log";
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
