import { Divider,IconButton,Stack } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitchLogo } from 'phosphor-react'

import React from 'react'

const AuthSocial = () => {
  return (
    <div>
        <Divider sx={{my:2.5,typography:"overline", color:"text.disabled","&::befter, ::after":{borderTopStyle:"dashed"}}}>OR</Divider>
        <Stack spacing={2} direction={'row'} justifyContent={'center'}>
            <IconButton>
                <GoogleLogo color='#df3e30'/>
            </IconButton>
            <IconButton color='inherit'>
                <GithubLogo />
            </IconButton>
            <IconButton>
                <TwitchLogo color='#1c9cea'/>
            </IconButton>

        </Stack>
    </div>
  )
}

export default AuthSocial
