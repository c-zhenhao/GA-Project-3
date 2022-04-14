import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { loaderActions } from "../components/stores/loader";

import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";
import ProfileForm from "../components/ProfileForm";
import DeleteProfileModal from "../components/modals/DeleteProfileModal";

import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);

  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);

  const [signup, setSignup] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);
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
    else if (!userId && !username) navigate(`/`, { replace: true });
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
      dispatchStore(
        loaderActions.setError({ title: error.name, message: error.message })
      );
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

      if (res.data) window.location.reload(false);
    } catch (error) {
      console.log(error);
      dispatchStore(
        loaderActions.setError({ title: error.name, message: error.message })
      );
    }
    dispatchStore(loaderActions.doneLoading());
  };

  // const doubleFunction = () => {
  //   handleClose();
  //   updateRating();
  // };

  // const redirectEditProfile = () => {
  //   let path = `/${params.id}/profile/edit`;
  //   navigate(path);
  // };
  //Check user rating history
  const [userRatingHistory, setuserRatingHistory] = useState(null);
  const checkRating = (array) => {
    // try {
    const { targetRating } = array.find(
      (item) => item.targetUsername === targetProfile.username
    );
    // } catch (err) {}
    return targetRating;
  };

  const isTargetRated = async () => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    try {
      const profileURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile`;
      const response = await axios.get(profileURL, { withCredentials: true });
      if (response.data && response.data.userInteracted.length)
        setuserRatingHistory(checkRating(response.data.userInteracted));
    } catch (error) {
      // console.log(error);
      // dispatchStore(loaderActions.setError({ title: error.name, message: error.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  useEffect(() => {
    if (targetProfile && params.target) {
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
        <Stack
          direction="row"
          spacing={1}
          className="row justify-content-center"
        >
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
          <Rating
            name="read-only"
            value={targetRating}
            precision={0.5}
            size="large"
            readOnly
          />
        </Box>

        <h1>{targetProfile && targetProfile.displayName}</h1>
        <p>
          <strong>Age:</strong> {targetProfile.age} | <strong>Gender:</strong>{" "}
          {targetProfile.gender} | <strong>Height:</strong>{" "}
          {targetProfile.height}
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
            <Grid container columns={16} spacing={2}>
              <Grid
                item
                xs={8}
                style={{
                  border: "2px solid transparent",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setSignup(true);
                  }}
                >
                  Edit my Profile
                </Button>
              </Grid>

              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "2px solid transparent",
                }}
              >
                <DeleteProfileModal />
              </Grid>
            </Grid>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{ "& > div > div": { borderRadius: "12px !important" } }}
          >
            <DialogTitle className="row justify-content-center align-content-center">
              <Col xs={2} style={{ paddingLeft: "9px", paddingTop: "5px" }}>
                😈
              </Col>
              <Col xs={8} style={{ fontSize: "0.8em", lineHeight: "2.5em" }}>
                PERSONALITY
              </Col>
              <Col xs={2} style={{ paddingLeft: "9px", paddingTop: "5px" }}>
                😇
              </Col>
            </DialogTitle>
            <Box style={{ width: "30vh", margin: "0 auto", left: "50%" }}>
              <Typography component="legend"></Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event) => {
                  setValue(parseFloat(event.target.value));
                }}
              />
            </Box>
            <DialogActions className="row justify-content-center align-content-center">
              <Button className="col-sm-4" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="col-sm-6" onClick={updateRating}>
                Submit Rating
              </Button>
            </DialogActions>
          </Dialog>
        </p>
      </div>
      {signup && <ProfileForm edit={true} onCancel={setSignup} />}
    </>
  );
};

export default Profile;
