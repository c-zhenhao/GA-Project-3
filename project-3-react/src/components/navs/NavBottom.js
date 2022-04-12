import * as React from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ViewListIcon from "@mui/icons-material/ViewList";
import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(1); // set it so that the default is the profile lol
  const ref = React.useRef(null);

  // redux store user
  // const username = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);

  return (
    <Box sx={{ pb: 0 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={2}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleIcon />}
            component={NavLink}
            to={`/${userUserId}/profile`}
          />

          <BottomNavigationAction
            label="Match"
            icon={<HandshakeIcon />}
            component={NavLink}
            to={`/${userUserId}/match`}
          />

          <BottomNavigationAction
            label="List"
            icon={<ViewListIcon />}
            color="secondary"
            component={NavLink}
            to={`/${userUserId}/list`}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
