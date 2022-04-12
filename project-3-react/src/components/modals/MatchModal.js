import * as React from "react";
import { NavLink } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    fontFamily: ["Satisfy", "cursive"].join(","),
    fontSize: 36,
  },
});

export default function BasicModal(props) {
  console.log(props);

  const handleClose = () => {
    console.log(props.isMatch);
    console.log(props.setIsMatch);

    props.setIsMatch(false);
  };

  // username
  const userUsername = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);
  const userImgUrl = useSelector((state) => state.user.imgUrl);

  return (
    <div>
      <Modal
        open={props.isMatch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Typography id="modal-modal-title" theme={theme}>
              It's a match!
            </Typography>
          </ThemeProvider>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            You and {props.targetDisplayName} have liked each other
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Avatar
              alt={userUsername}
              src={userImgUrl}
              sx={{
                width: 100,
                height: 100,
                border: "1px solid grey",
              }}
            />
            <Avatar
              alt={props.targetUsername}
              src={props.targetImgUrl}
              sx={{
                width: 100,
                height: 100,
                border: "1px solid grey",
              }}
            />
          </Stack>

          <BottomNavigation showLabels sx={{ mt: 3 }}>
            <BottomNavigationAction
              label="KEEP SWIPING"
              icon={<ArrowBackIcon />}
              onClick={handleClose}
            />

            <BottomNavigationAction
              label="RATE"
              icon={<SendIcon />}
              component={NavLink}
              to={`/${userUserId}/list`}
            />
          </BottomNavigation>
        </Box>
      </Modal>
    </div>
  );
}
