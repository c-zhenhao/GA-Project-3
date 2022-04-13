import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { loaderActions } from "../components/stores/loader";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);

  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    if (error.message === "not logged in") dispatchStore(userActions.logout());
    if (!userId && !username) navigate(`/`, { replace: true });
    else window.location.reload(false);
  };

  useEffect(() => {
    console.log(typeof targetProfile.interests);
    if (!userId && !username) navigate(`/`, { replace: true });
    if (params.target) {
      //Target Profile
      setUser(params.target);
    } else if (params.id) {
      //User Profile
      setUser(userId);
    }
    //eslint-disable-next-line
  }, [params.id, params.target]);

  //View profile of target
  const [targetRating, setTargetRating] = useState(0);
  const [targetProfile, setTargetProfile] = useState({});

  const getAverage = (array) => {
    return array.reduce((a, b) => a + b) / array.length;
  };

  const getUserProfile = async () => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    try {
      const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${user}`;
      const response = await axios.get(matchURL, { withCredentials: true });
      setTargetProfile(response.data);
      const averageTargetRating = getAverage(response.data.userRating);
      setTargetRating(averageTargetRating);
    } catch (error) {
      console.log(error);
      dispatchStore(loaderActions.setError({ title: error.name, message: error.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  useEffect(() => {
    if (user) {
      getUserProfile();
    }
    //eslint-disable-next-line
  }, [user]);

  //Update target rating
  const updateRatingURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${params.target}/rate`;
  const updateRating = async () => {
    handleClose();
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    try {
      console.log(value);
      const res = await axios.post(
        updateRatingURL,
        {
          targetUsername: targetProfile.username,
          targetRating: value,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatchStore(loaderActions.setError({ title: error.name, message: error.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  // const doubleFunction = () => {
  //   handleClose();
  //   updateRating();
  // };

  const redirectEditProfile = () => {
    let path = `/${params.id}/profile/edit`;
    navigate(path);
  };
  //Check user rating history
  const [userRatingHistory, setuserRatingHistory] = useState(null);
  const checkRating = (array) => {
    return array.find((item) => item.targetUsername === targetProfile.username).targetRating;
  };

  const isTargetRated = async () => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    try {
      const profileURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile`;
      const response = await axios.get(profileURL, { withCredentials: true });
      const ratingNullorRated = checkRating(response.data.userInteracted);
      setuserRatingHistory(ratingNullorRated);
      console.log(ratingNullorRated);
    } catch (error) {
      console.log(error);
      dispatchStore(loaderActions.setError({ title: error.name, message: error.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  useEffect(() => {
    if (targetProfile) {
      isTargetRated();
    }
    //eslint-disable-next-line
  }, [targetProfile]);

  return (
    <>
      {error && error.message !== "canceled" && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={handleModalOkay}
        ></ErrorModal>
      )}
      {isLoading && <LoadingSpinner show={isLoading} />}
      <div className="row mt-5">
        <Stack direction="row" spacing={1} className="row justify-content-center">
          <Avatar
            className="col-sm-6"
            alt={targetProfile.displayName}
            src={targetProfile.imgUrl}
            sx={{ width: 255, height: 255 }}
          />
        </Stack>

        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={targetRating} precision={0.5} size="large" readOnly />
        </Box>

        <h1>{targetProfile && targetProfile.displayName}</h1>
        <p>
          Age: {targetProfile.age} , Height: {targetProfile.height}{" "}
        </p>
        <p>
          <b>My interests are</b>
        </p>
        <p>{targetProfile.interests && targetProfile.interests.join(" | ")}</p>

        <p>
          {!userRatingHistory && params.target && (
            <Button variant="contained" onClick={handleClickOpen}>
              Rate me
            </Button>
          )}
          {!params.target && (
            <Button variant="contained" onClick={redirectEditProfile}>
              Edit my Profile
            </Button>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>(Ugly) 0 to 5 (Attractive)</DialogTitle>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend"></Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event) => {
                  setValue(parseFloat(event.target.value));
                }}
              />
            </Box>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={updateRating}>Submit Rating</Button>
            </DialogActions>
          </Dialog>
        </p>
      </div>
    </>
  );
};

export default Profile;
