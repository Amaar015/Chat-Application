import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink} from 'react-router-dom'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'

const Login = () => {
  return (
    <>
    <Stack spacing={2} sx={{mb:5, position:"relative"}}>
       <Typography variant='h4'>Login to Talk</Typography>
        <Stack direction={'row'} spacing={0.5}>
            <Typography variant='body2'>New User?</Typography>
            <Link component={RouterLink} to="/auth/register"  variant='subtitle'>
                 Create an account
            </Link>
        </Stack>
        {/* login form */}
               <LoginForm/>
        {/* Auth Social */}
          <AuthSocial/>
    </Stack>
    </>
  )
}

export default Login
