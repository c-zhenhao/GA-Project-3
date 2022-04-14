import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loaderActions } from "../stores/loader";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [delPassword, setDelPassword] = useState("");
  const dispatchStore = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setDelPassword(event.target.value);
  };

  const handleDeleteButton = async (event) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());

    console.log(event.target.value);

    console.log("delete button clicked");
    console.log(`sending input to delete endpoint: ${delPassword}`);

    const sendDelPassword = {
      password: delPassword,
    };
    console.log(sendDelPassword);

    try {
      const url = `${process.env.REACT_APP_SERVER_DOMAIN}/profile`;
      const settings = { withCredentials: true };

      const delUserProfile = await axios
        .delete(url, sendDelPassword, settings)
        .catch((error) => {
          console.log(error);
        });
      console.log(delUserProfile);
    } catch (error) {
      console.log(error);
      dispatchStore(
        loaderActions.setError({ title: error.name, message: error.message })
      );
    }
    dispatchStore(loaderActions.doneLoading());

    // setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete My Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>DELETE YOUR ACCOUNT?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete your account from OnlyFriends, please enter your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Enter your password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteButton}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
