import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { pink } from "@mui/material/colors";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";

const GeneralApp = () => {
const theme=useTheme();
  return (
    <Stack direction='row' width='100%'>
      {/* Chats */}
      <Chats/>

      {/* Coversation */}
        <Box sx={{height:"100%", width:"calc(100vw - 420px)", backgroundColor:"#fff"}}>
            <Conversation/>
        </Box>
    </Stack>
  );
};

export default GeneralApp;
