
import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';


// chat-link-message
const LinkMsg=({el})=>{
  const theme= useTheme();
  return (
            
   <Stack direction='row'   justifyContent={el.incoming? "start": "end"}>
   <Box 
    p={1.5}
    
    sx={{
     backgroundColor:el.incoming? theme.palette.background.paper:
      theme.palette.primary.main,
      borderRadius:1.5,
      width:"max-content"
    }}
   >
     <Stack spacing={2} >
      <Stack p={2} spacing={3} alignItems='center' sx={{backgroundColor:theme.palette.background.paper, borderRadius:1}}>
        <img alt={el.message} src={el.preview} style={{maxHeight:210 ,borderRadius:1 }}/>
       <Stack spacing={2}>
        <Typography variant='subtitle2'>Creating chat App</Typography>
        <Typography variant='subtitle2' sx={{color:theme.palette.primary.main}} component={Link}>www.youtube.com</Typography>
       </Stack>
       <Typography variant='body2' color={el.incoming? theme.palette.text:"#fff"}></Typography>
      </Stack>
     </Stack>
    </Box> 
    </Stack>
  ); 
}
// chat-reply-message
  const ReplyMsg =({el})=>{
      const theme= useTheme();
     return (
               
      <Stack direction='row' justifyContent={el.incoming? "start": "end"}>
      <Box 
       p={1.5}
       sx={{
        backgroundColor:el.incoming? theme.palette.background.paper:
         theme.palette.primary.main,
         borderRadius:1.5,
         width:"max-content"
       }}
      >
              <Stack spacing={2}>
              <Stack 
               p={2}
               direction='column'
               spacing={2}
               alignItems='center'
               sx={{
                backgroundColor:theme.palette.background.paper,
                borderRadius:1,
               }}
              >
                <Typography variant='body2' color={theme.palette.text}>
                  {el.message}
                </Typography>
              </Stack>
              <Typography variant='body2' color={el.incoming? theme.palette.text:'#fff'}>
                {el.reply}
              </Typography>
            </Stack>
            </Box>
            </Stack>
          );

  }
// chat-image-message
const ImgMsg =({el})=>{
  const theme=useTheme();    
  return (
      <Stack direction='row' justifyContent={el.incoming? "start": "end"}>
          <Box 
           p={1.5}
           sx={{
            backgroundColor:el.incoming? theme.palette.background.paper:
             theme.palette.primary.main,
             borderRadius:1.5,
             width:"max-content"
           }}
          >
            <Stack spacing={1}>
                <img src={el.img} alt={el.message} style={{maxHeight:210, borderRadius:"10px"}} />
                <Typography variant='body2' color={el.incoming? theme.palette.text:"#fff"}>
                  {el.message}
                </Typography>
            </Stack>
          </Box>

        </Stack>
      )
}
// chat-text-message
 const TextMsg =({el})=>{
       const theme=useTheme();
  return <Stack direction='row' justifyContent={el.incoming ? "start" : "end"}>
     <Box 
      p={1.5}
      sx={{
        backgroundColor:el.incoming? theme.palette.background.paper: theme.palette.primary.main,
        borderRadius:1.5,      }}
     >
      <Typography variant='body2' 
       color={el.incoming ? theme.palette.text : '#fff'}>{el.message} </Typography>
     </Box>
     
  </Stack>
 }

// Chat-timeline
const Timeline = ({el}) => {
    const theme =useTheme()
  return <Stack direction='row' alignItems="center" justifyContent='space-between'>
      <Divider width="46%"/>
      <Typography variant='caption' sx={{ color:theme.palette.text}}>{el.text}</Typography>
       <Divider width="46%"/> 
  </Stack>
}

export  {Timeline,TextMsg,ImgMsg,ReplyMsg,LinkMsg}
