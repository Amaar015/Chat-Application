import { Box, Stack,Avatar, Typography, IconButton, Divider } from '@mui/material'
import React from 'react'
import { faker } from "@faker-js/faker";
import { CaretDown, MagnifyingGlass,Phone,  VideoCamera } from 'phosphor-react';
import { useTheme } from '@mui/material/styles'
import StyleBadge from './CustomBadge'
// import { dispatch } from '../../redux/store';
import { ToggleSideBar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';
const Chatheader = () => {
    const theme=useTheme();
    const dispatch=useDispatch();
  return (
    <Box sx={{
        
        width:'100%',
        backgroundColor:theme.palette.mode=== 'light'? "#f8faff":theme.palette.background.paper,
        boxShadow:"0px 0px 2px rgba(0,0,0,0.25)"
      }}>
        <Stack
        alignItems={"center"}
         direction="row"
          justifyContent={"space-between"}
          sx={{width:"100%", height:"100%"}}>
              <Stack onClick={()=>{dispatch(ToggleSideBar())}}
                direction={"row"} spacing={2} alignItems={"center"}>
                <Box p={2}>
                   <StyleBadge
                    overlap='circular'
                    anchorOrigin={{
                      vertical:"bottom",
                      horizontal:"right"
                    }} 
                    variant='dot'>
                           <Avatar alt={faker.name.fullName()}
                           src={faker.image.avatar()}/>
                   </StyleBadge>
                </Box>
                 <Stack spacing={0.4}>
                   <Typography variant='subtitle'>{faker.name.fullName()}</Typography>
                   <Typography variant='caption'>Online</Typography>
                 </Stack>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={3}>
                <IconButton>
                  <VideoCamera/>
                </IconButton>
                <IconButton>
                  <Phone/>
                </IconButton>
                <IconButton>
                  <MagnifyingGlass/>
                </IconButton>
                <Divider orientation='vertical'/>
                <IconButton>
                  <CaretDown/>
                </IconButton>
              </Stack>
            </Stack>         
       
      </Box>
     
  )
}

export default Chatheader
