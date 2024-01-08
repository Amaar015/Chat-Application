import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import React,{useState} from 'react'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UpdateSideBarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import { Shared_Docs, Shared_links } from '../data';
import { DocImg, LinkMsg } from './Conversation/MessageType';
import Message from './Conversation/Message';

const StarredMessage = () => {
    const theme=useTheme();
    const dispatch=useDispatch()
    
    return (
    <Box sx={{width:320,height:'100vh'}}>
    <Stack sx={{height:"100%"}}>
      <Box sx={{
        boxShadow:"0px 0px 2px rgba(0,0,0,0.25)",
        width:"100%",
        backgroundColor:theme.palette.mode==='light'? 'f8faff':theme.palette.background,
      }}>
        <Stack sx={{height:"100%", p:2}} direction={'row'} alignItems={'center'}  spacing={2} >
        <IconButton onClick={()=>{
            dispatch(UpdateSideBarType("Contact"))
          }}>
          <ArrowBackIcon />
          </IconButton>
          <Typography >Shared Messages</Typography>
          
        </Stack>
      </Box>
      <Stack sx={{height:"100%", position:"relative", flexGrow:1,overflowY:'scroll'}} p={3} spacing={3}>
           
           <Message/>
         
        </Stack>

      </Stack>
      </Box>
  )
}

export default StarredMessage
