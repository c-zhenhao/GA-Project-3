import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const userId = useSelector((state) => state.user.userId);
  const username = useSelector((state) => state.user.username);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!userId && !username) navigate(`/`, { replace: true });
    if (params.target) {
      //Target Profile
      setUser(params.target);
    } else if (params.id) {
      //User Profile
      setUser(params.id);
    }
  }, [params.id, params.target]);

  //View profile of target
  const [targetRating, setTargetRating] = useState(0);
  const [targetProfile, setTargetProfile] = useState({});

  const getAverage = (array) => {
    return array.reduce((a,b)=> a + b)/array.length;
  }

  useEffect(async () => {
    if (user) {
      try {
        const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${user}`;
        const response = await axios.get(matchURL, { withCredentials: true });
        setTargetProfile(response.data);
        const averageTargetRating = getAverage(response.data.userRating)
        setTargetRating(averageTargetRating);

      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);

  //Update target rating
  const updateRatingURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${params.target}/rate`;
  const updateRating = async () => {
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
    }
  };

  const doubleFunction = () => {
    handleClose();
    updateRating();
  };

  const redirectEditProfile = () =>{ 
    let path = `/${params.id}/profile/edit`; 
    navigate(path);
  }
//Check user rating history
  const [userRatingHistory, setuserRatingHistory] = useState(null);
  const checkRating = (array) => {
    array.filter((item) => item.targetUsername == targetProfile.username).map(({targetRating})=> ({targetRating}));
  }

  useEffect(async () => {
    if (user) {
      try {
        const profileURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${params.target}`;
        const response = await axios.get(profileURL, { withCredentials: true });
        const ratingNullorRated = checkRating(response.data.userInteracted)
        setuserRatingHistory(ratingNullorRated);
      } catch (error) {
        console.log(error);
      }
    }
  }, [user]);


  return (
    <>
      <div>
        <b>{targetProfile && targetProfile.displayName}</b>
        <p>
          <img src={targetProfile.imgUrl} />
        </p>
        <p>
          Age: {targetProfile.age} Height: {targetProfile.height}{" "}
        </p>
        <p>Interests: {targetProfile.interests} </p>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={targetRating} precision={0.5} size="large" readOnly />
        </Box>
        <p>
          {!userRatingHistory && params.target && <button onClick={handleClickOpen}>Rate</button>}
          {!params.target && <button onClick={redirectEditProfile}>Edit</button>}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rate User</DialogTitle>
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
              <Button onClick={doubleFunction}>Rate</Button>
            </DialogActions>
          </Dialog>
        </p>
      </div>
    </>
  );
};

export default Profile;
