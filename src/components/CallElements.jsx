import { faker } from "@faker-js/faker";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import StyledBadge from "./Conversation/CustomBadge";
import { ArrowDownLeft, ArrowUpRight, Phone } from "phosphor-react";
import { VideoCall } from "@mui/icons-material";

const CallLogElements = ({ online, incoming, missed }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: 1,
          backgroundColor: (theme) =>
            theme.palette.mode == "light"
              ? "#fff"
              : theme.palette.background.paper,
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack spacing={2} direction={"row"} alignItems={"center"}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={faker.image.avatar()}
                  alt={faker.person.fullName()}
                />
              </StyledBadge>
            ) : (
              <Avatar
                src={faker.image.avatar()}
                alt={faker.person.fullName()}
              />
            )}
            <Stack spacing={0.3}>
              <Typography variant="subtitle2">
                {faker.person.firstName()}
              </Typography>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {incoming ? (
                  <ArrowDownLeft color={missed ? "red" : "green"} />
                ) : (
                  <ArrowUpRight color={missed ? "red" : "green"} />
                )}
                <Typography variant="caption">Yesterday 21:12</Typography>
              </Stack>
            </Stack>
          </Stack>
          <IconButton>
            <Phone color={missed ? "red" : "green"} />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

const CallElement = ({ online }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: (theme) =>
          theme.palette.mode == "light"
            ? "#fff"
            : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={faker.image.avatar()}
                alt={faker.person.fullName()}
              />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {faker.person.firstName()}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton>
            <Phone color={"green"} />
          </IconButton>
          <IconButton color="green">
            <VideoCall color="green" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export { CallElement, CallLogElements };
