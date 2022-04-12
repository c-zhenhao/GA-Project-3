import * as React from "react";
import { NavLink } from "react-router-dom";

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

export default function BasicModal(props) {
  console.log(props);

  const [open, setOpen] = React.useState(false);

  // no need option to open
  //   const handleOpen = () => {
  //     console.log("trying to open");
  //     setOpen(true);
  //   };

  const handleClose = () => {
    console.log(props.isMatch);
    console.log(props.setIsMatch);

    props.setIsMatch(false);
    setOpen(false);
  };

  // username
  const userUsername = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);
  const userImgUrl = useSelector((state) => state.user.imgUrl);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.isMatch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ITS A MATCH
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0.5, mb: 2 }}>
            {userUsername} and {props.targetUsername} have liked each other
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Avatar
              alt={userUsername}
              src={userImgUrl}
              sx={{
                width: 100,
                height: 100,
                border: "1px solid black",
              }}
            />
            <Avatar
              alt={props.targetUsername}
              src={props.targetImgUrl}
              sx={{
                width: 100,
                height: 100,
                border: "1px solid black",
              }}
            />
          </Stack>

          <BottomNavigation showLabels>
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
