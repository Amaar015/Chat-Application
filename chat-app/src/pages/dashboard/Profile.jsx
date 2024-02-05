import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/main/ProfileForm";

const Profile = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            width: 320,
            borderRadius: 1,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
          p={2}
        >
          <Stack spacing={5} p={2}>
            {/* header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="#4b4b4b" />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>
            {/* Profile Form */}
            <ProfileForm />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
