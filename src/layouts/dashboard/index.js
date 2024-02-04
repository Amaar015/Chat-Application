import { Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const isAuthenticate = true;

const DashboardLayout = () => {
  const theme = useTheme();
  if (!isAuthenticate) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
