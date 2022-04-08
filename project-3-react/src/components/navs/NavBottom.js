import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ViewListIcon from "@mui/icons-material/ViewList";
import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 0 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={1}
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
            sx={{ color: "#4ca7ea" }}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            sx={{ color: "#4ca7ea" }}
          />
          <BottomNavigationAction
            label="Todo List"
            icon={<ViewListIcon />}
            color="secondary"
            sx={{ color: "#4ca7ea" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
