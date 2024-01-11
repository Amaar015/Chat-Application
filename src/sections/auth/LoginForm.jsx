import React, { useState } from 'react'
import FormProvider from '../../components/hook-form/FormProvider';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import { RHFTextField } from '../../components/hook-form';
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';

const LoginForm = () => {
  const [showpassword,Setshowpassword]=useState(false);
   const LoginSchema=Yup.object().shape({
         email:Yup.string().required("Email is required").email("Email must be a valid email address"),
         Password: Yup.string().required("Password is required"),
   })

   const defaultValues={
          email:"razaammar582@gmail.com",
          password:"2715"
   }

   const methods=useForm({
     resolver:yupResolver(LoginForm),
     defaultValues,
   })

   const {
    reset,
    setError,
    handleSubmit,
    formState:{errors,isSubmitting,isSubmitSuccessful},
   }=methods;

    const onSubmit=async(data)=>{
      try {
          // data handled from backed
      } catch (error) {
           console.log(error);
           reset();
           setError('after Submit',{
            ...error,
            message:error.message,
           })
      }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

       <Stack spacing={3}>
         {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
            
           <RHFTextField name='email' label="Email address"/>
              
           <RHFTextField name='password' label='Password' type={showpassword ? "text" : "password"} InputProps={{
            endAdornment:(
                  <InputAdornment>
                    <IconButton onClick={()=>{Setshowpassword(!showpassword)}}>
                      {showpassword ? <Eye/> : <EyeSlash/>}
                    </IconButton>
                  </InputAdornment>
            )
           }}/>   
      </Stack>
       <Stack alignItems={'flex-end'} sx={{my:2}}>
             <Link variant='body2' color='inherit' underline='always'>
              Forgot Password?
             </Link>
       </Stack>
        <Button
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        sx={{
          bgcolor:"text.primary",
          color:(theme)=>
          theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover":{
            bgcolor:"text.primary",
            color:(theme)=>
            theme.palette.mode==='light' ? "common.white": "grey.800",
          }
        }}>Login</Button>
    </FormProvider>
    
  )
}

export default LoginForm
