import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { UpdateSideBarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import { Shared_Docs, Shared_links } from "../data";
import { DocImg, LinkMsg } from "./Conversation/MessageType";

const SharedMessage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "f8faff"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSideBarType("Contact"));
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography>Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs
          sx={{ px: 2, pt: 2 }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          {(() => {
            switch (value) {
              case 0:
                // images
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) => {
                      return (
                        <Grid item xs={4}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              case 1:
                // links
                return Shared_links.map((el) => <LinkMsg el={el} />);
              case 2:
                // Docs
                return Shared_Docs.map((el) => <DocImg el={el} />);

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessage;
