import { Stack,  useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const DashboardLayout = () => {
   const theme=useTheme();
    
    console.log(theme);
   return (
    <Stack direction='row'>
       <Sidebar/>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
