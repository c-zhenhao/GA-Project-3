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
import HandshakeIcon from "@mui/icons-material/Handshake";
import Stack from "@mui/material/Stack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    fontFamily: ["Satisfy", "cursive"].join(","),
    fontSize: 50,
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
            <Typography id="modal-modal-title" theme={theme} color={"#4ca7ea"}>
              It's a match!
            </Typography>
          </ThemeProvider>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            You and {props.targetDisplayName} have shown interest in being
            friends!
          </Typography>

          <Stack
            direction="row"
            spacing={-5}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              alt={userUsername}
              src={userImgUrl}
              sx={{
                width: 150,
                height: 150,
                border: "1px solid grey",
                zIndex: -1,
              }}
            />
            <HandshakeIcon sx={{ fontSize: "150px", color: "#4ca7ea" }} />
            <Avatar
              alt={props.targetUsername}
              src={props.targetImgUrl}
              sx={{
                width: 150,
                height: 150,
                border: "1px solid grey",
                zIndex: -1,
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
