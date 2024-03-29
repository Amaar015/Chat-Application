import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import image from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";

import useStettings from "../../hooks/useSettings";
import AntSwitch from "./AntSwitch";
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";

    default:
      break;
  }
};
const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      return "/auth/login";
    default:
      break;
  }
};
const Sidebar = () => {
  const theme = useTheme();
  const [selected, Setselected] = useState(0);
  const navigate = useNavigate();
  console.log(theme);
  const { onToggleMode } = useStettings();

  //  Menu bar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: 100,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.24)",
        height: "100vh",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: "100%", paddingTop: "1rem" }}
        spacing={3}
      >
        <Stack alignItems="center" spacing={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: "64px",
              width: "64px",
              borderRadius: 1.5,
            }}
          >
            <img src={image} />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index == selected ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: "#fff",
                    }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    Setselected(el.index);
                    navigate(getPath(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode == "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={el.index}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: "48px" }} />
            {selected == 3 ? (
              <Box
                p={1}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  navigate(getPath(3));
                  Setselected(3);
                }}
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode == "light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <AntSwitch
            onChange={() => {
              onToggleMode();
            }}
            defaultChecked
          />
          <Avatar
            src={faker.image.avatar()}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, index) => (
                <MenuItem>
                  <Stack
                    onClick={() => {
                      handleClose();
                      navigate(getMenuPath(index));
                    }}
                    sx={{ width: 100 }}
                    spacing={1}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
