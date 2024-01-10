import React, { useState } from 'react'
import FormProvider from '../../components/hook-form/FormProvider';
import * as Yup from 'yup';
import { Password } from 'phosphor-react';

const LoginForm = () => {
  const [showpassword,Setshowpassword]=useState(false);
   const LoginSchema=Yup.object().shape({
         email:Yup.string().required("Email is required").email("Email must be a valid email address");
         Password: Yup.string().required("Password is required"),
   })

   const defaultValues={
          email:"razaammar582@gmail.com",
          password:"2715"
   }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

    </FormProvider>
    
  )
}

export default LoginForm
