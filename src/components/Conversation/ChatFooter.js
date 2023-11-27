import { Box, Stack , IconButton,  TextField, InputAdornment } from '@mui/material'
import {styled, useTheme } from '@mui/material/styles'
import React from 'react'
import {  LinkSimple,  PaperPlaneTilt, Smiley, } from 'phosphor-react';



const StyleInput= styled(TextField)(({theme})=>({
   "& .MuiInputBase-input":{
     paddingTop:"12px",
     paddingBottom:"12px",
   }
}))

const ChatFooter = () => {
    const theme=useTheme();
     return (
    <Box sx={{
        width:'100%',
        backgroundColor:theme.palette.mode=== 'light'? "#f8faff":theme.palette.background.paper,
        boxShadow:"0px 0px 2px rgba(0,0,0,0.25)"
      }}>
       <Stack direction='row' alignItems='center' spacing={3} p={2}>
        <StyleInput 
        fullWidth
          placeholder='Write a message'
          variant='filled'
          InputProps={{
            disableUnderline:true,
            startAdornment:<InputAdornment>
            <IconButton>
              <LinkSimple/>
            </IconButton>
            </InputAdornment>,
            endAdornment:<InputAdornment>
            <IconButton>
              <Smiley/>
            </IconButton>
            </InputAdornment>
          }}
        />
        <Box sx={{height:48, width:48, backgroundColor:theme.palette.primary.main, borderRadius:1.5}}>
          <Stack sx={{height:"100%" , width:"100%"}} alignItems='center' justifyContent='center'>
            <IconButton>
              <PaperPlaneTilt color='#fff'/>
            </IconButton>
          </Stack>
        </Box>
          
        </Stack>

      </Box>

  )
}

export default ChatFooter
