import { Box, Stack , IconButton,  TextField, InputAdornment, Tooltip, Fab } from '@mui/material'
import {styled, useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import {  Camera, File, Image, LinkSimple,  PaperPlaneTilt, Smiley, Sticker, User, } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const StyleInput= styled(TextField)(({theme})=>({
   "& .MuiInputBase-input":{
     paddingTop:"12px",
     paddingBottom:"12px",
   }
}));
 
  const Actions=[
       {
        color:"#4da5fe",
        icon: <Image size={24}/>,
        title:"Photo/Video",
        y:102
       },
       {
        color:"#1b8cfe",
        icon: <Sticker size={24}/>,
        title:"Stickers",
        y:172,
       },
       {
        color:"#0172e4",
        icon: <Camera size={24}/>,
        title:"Image",
        y:242
       },
       {
        color:"#0159b2",
        icon: <File size={24}/>,
        title:"Stickers",
        y:312,
       },
       {
        color:"#013f7f",
        icon: <User size={24}/>,
        title:"Contact",
        y:242
       }
  ];
const StyleInputs=({op,sop})=>{
  const [openActions,SetopenActions]=useState(false);
  return (
    <StyleInput 
        fullWidth
          placeholder='Write a message'
          variant='filled'
          InputProps={{
            disableUnderline:true,
            startAdornment:(
             <Stack sx={{width:"max-content"}}>
              <Stack sx={{position:"relative",
                   display:openActions? 'inline-block': 'none'
                  }}>
                    {Actions.map((el)=>(
                       <Tooltip placement="right" title={el.title}>
                       <Fab
                         onClick={() => {
                           SetopenActions(!openActions);
                         }}
                         sx={{
                           position: "absolute",
                           top: -el.y,
                           backgroundColor: el.color,
                         }}
                         aria-label="add"
                       >
                         {el.icon}
                       </Fab>
                     </Tooltip>
                    ))}
                  </Stack>
            <InputAdornment>
            <IconButton>
              <LinkSimple 
               onClick={() => {
                SetopenActions(!openActions);
              }}/>
            </IconButton>
            </InputAdornment>
            </Stack>
            ),
            endAdornment:<InputAdornment>
            <IconButton>
              <Smiley onClick={()=>sop(!op)}/>
            </IconButton>
            </InputAdornment>
          }}
        />
  )
 }

 
const ChatFooter = () => {
    const theme=useTheme();
    const [openPicker,setopenPicker]=useState(false);
    return (
    <Box sx={{
        width:'100%',
        backgroundColor:theme.palette.mode=== 'light'? "#f8faff":theme.palette.background.paper,
        boxShadow:"0px 0px 2px rgba(0,0,0,0.25)"
      }}>
       <Stack direction='row' alignItems='center' spacing={3} p={2}>
            <Stack sx={{width:"100%"}}>
              <Box sx={{display: openPicker ? 'inline': "none", zIndex:10, position:"fixed", right:81,bottom:100}}>
              <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log}/>
              </Box>
            <StyleInputs op={openPicker} sop={setopenPicker} />
            </Stack>
            
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
