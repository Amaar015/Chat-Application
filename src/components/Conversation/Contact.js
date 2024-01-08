import { Avatar, Box, Button, Divider, IconButton, Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Bell, CaretRight, Phone, Star, VideoCamera, X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { ToggleSideBar, UpdateSideBarType } from '../../redux/slices/app';
import { fa, faker } from '@faker-js/faker';
import { SafetyDivider } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
const Contact = () => {
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
          <Stack sx={{height:"100%", p:2}} direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3} >
            <Typography >Contact Info</Typography>
            <IconButton onClick={()=>{
              dispatch(ToggleSideBar());
            }}>
            <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack sx={{height:"100%", position:"relative", flexGrow:1,overflowY:'scroll'}} p={3} spacing={3}>
          <Stack direction={'row'} alignItems={"center"} spacing={2}>
            <Avatar src={faker.image.avatar()} alt='profile' sx={{height:64, width:64}}/>
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>{'Amaar Hassnain'}</Typography>
              <Typography variant='body2' fontWeight={500}>{'+92 304 3042589'}</Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
           <Stack spacing={1} alignItems={'center'}>
            <IconButton>
              <Phone/>
            </IconButton>
            <Typography variant='overline'>Voice</Typography>
           </Stack>
           <Stack spacing={1} alignItems={'center'}>
            <IconButton>
              <VideoCamera/>
            </IconButton>
            <Typography variant='overline'>Video</Typography>
           </Stack>
        </Stack>
           <Divider/>
           <Stack spacing={0.5}>
              <Typography variant='article'>About</Typography>
              <Typography variant='body2'>Imagination is the only limit</Typography>
           </Stack>
           <Divider/>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='subtitle2'>Media, Links & Docs</Typography>
            <Button onClick={()=>{
              dispatch(UpdateSideBarType("Shared"))
            }} endIcon={<CaretRight/>}>401</Button>
           </Stack>
           <Stack direction={'row'} spacing={2} alignItems={'center'}>
                 {[1,2,3].map((el)=>(
                  <Box>
                    <img src={faker.image.food()}  alt={faker.name.fullName}/>
                  </Box>
                 ))}
           </Stack>
           <Divider/>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
             <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Star/>
              <Typography variant='subtitle2'>Starred Messages</Typography>
             </Stack>
             <IconButton  onClick={()=>{
              dispatch(UpdateSideBarType("Starred"))
            }}>
              <CaretRight/>
             </IconButton>
           </Stack>
           <Divider/>
           <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
             <Stack direction={'row'} alignItems={'center'} spacing={2}>
               <Bell size={21}/>
               <Typography variant='subtitle2'>Mute Notifications</Typography>
             </Stack>
             <Switch/>
           </Stack>
           <Divider/>
           <Typography>1 Group in common</Typography>
           <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
           <Stack spacing={0.5}>
                <Typography variant='subtitle2'>Coding Monk</Typography>
                <Typography variant='caption'>Owl, Parrot, Rabbit, You</Typography>
           </Stack>
           </Stack>
           <Stack direction={'row'} alignItems={'center'} spacing={2}>
             <Button startIcon={<BlockIcon/>} fullWidth variant='outlined'>Block</Button>
             <Button startIcon={<DeleteIcon/>} fullWidth variant='outlined'>Delete</Button>

           </Stack>
        </Stack>
      </Stack>
    </Box>

  )
}

export default Contact
