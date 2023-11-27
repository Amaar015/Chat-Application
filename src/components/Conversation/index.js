import { Box, Stack} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import Chatheader from './Chat-header';
import ChatFooter from './ChatFooter';
import Message from './Message';



const Conversation = () => {
  const theme=useTheme();
  return (
    
    <Stack height={"100%"} maxHeight={"100vh"} width={'auto'}>
      {/* Chat Header */}
               <Chatheader/>
      {/* Box msg */}
       <Box width={"100%"}  sx={{flexGrow:1, height:"100%",overflowY:"scroll" ,backgroundColor:theme.palette.mode=== 'light'? "#f8faff":theme.palette.background.default}}>
        <Message/>
       </Box>

       {/* Chat Footer */}
           <ChatFooter/>
           </Stack>
      
  )
}

export default Conversation
