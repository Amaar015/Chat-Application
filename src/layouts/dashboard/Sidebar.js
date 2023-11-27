import { Avatar, Box, Divider, IconButton, Stack, Switch, useTheme } from "@mui/material";
import React, { useState } from "react";
import image from '../../assets/Images/logo.ico'
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";

import useStettings from '../../hooks/useSettings';
import AntSwitch from "./AntSwitch";



  
const Sidebar = () => {
     
    const theme=useTheme();
    const [selected, Setselected] =useState(0);
    
    console.log(theme);
    const {onToggleMode} =useStettings();
    
    return (
        <Box sx={{backgroundColor:theme.palette.background.paper,width:100,  boxShadow:"0px 0px 2px rgba(0,0,0,0.24)" , height:'100vh'}}>
        <Stack direction='column' alignItems='center' justifyContent='space-between' sx={{height:'100%', paddingTop:"1rem"}} spacing={3}>
                  
      <Stack alignItems='center' spacing={4}>
       <Box sx={{
         backgroundColor:theme.palette.primary.main,
         height:"64px",
         width:"64px",
         borderRadius:1.5,
        
         
       }} >
     <img src={image}/>
       </Box>
       <Stack sx={{width:'max-content'}} direction='column' alignItems='center' spacing={3}>
       {Nav_Buttons.map((el)=>(
          el.index==selected ?
          <Box
          p={1}
         sx={{
           backgroundColor:theme.palette.primary.main,
           borderRadius:1.5
         }}>
         <IconButton 
          sx={{
           width:"max-content",
           color:'#fff'
          }}
         key={el.index}>{el.icon}</IconButton>
         </Box>
         :
          <IconButton 
           onClick={()=>Setselected(el.index)}            
           sx={{
           width:"max-content",
           color:theme.palette.mode=="light"?"#000":theme.palette.text.primary
          }}
         key={el.index}>{el.icon}</IconButton>
       ))}
       <Divider sx={{width:"48px"}}/>
       {selected==3?
       <Box
          p={1}
         sx={{
           backgroundColor:theme.palette.primary.main,
           borderRadius:1.5
         }}>
         <IconButton sx={{color:"#fff"}}>
         <Gear/>
       </IconButton>
         </Box>:
         <IconButton    onClick={()=>Setselected(3)}
         sx={{width:"max-content" , color:theme.palette.mode=="light"?"#000":theme.palette.text.primary}}>
         <Gear/>
       </IconButton>
       }
       
       </Stack>
       </Stack>
       <Stack spacing={3}>
         <AntSwitch 
         onChange={()=>{
           onToggleMode();
         }}
         defaultChecked />
         <Avatar src={faker.image.avatar()} />
       </Stack>
       </Stack>

 </Box>
 

  )
}

export default Sidebar

