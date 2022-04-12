import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(2);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
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

  useEffect (async () => {
    if(user){
    try {
      const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${user}`;

      const response  = await axios.get(matchURL,{withCredentials: true});
      setTargetProfile(response.data);
      setTargetRating(response.data.userRating);
  } catch (error) {
    console.log(error);
  }}
  }, [user]);

  //Update target rating
  const updateRatingURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile/${params.target}/rate`;
  const updateRating = () => {
    try {
        axios.post(updateRatingURL, {
        targerUsername: targetProfile.username,
        targetRating: value
    }, {withCredentials: true});
  }catch (error) {
    console.log(error)
  }
  }
  
  const doubleFunction = () => {
    handleClose();
    updateRating();
  }

  return (
    <>
    <div>
      <b>{targetProfile && targetProfile.displayName}</b>
      <p>
      <img src={targetProfile.imgUrl}/>
      </p>
      <p>Age: {targetProfile.age} Height: {targetProfile.height} </p>
      <p>Interests: {targetProfile.interests} </p>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend"></Typography>
      <Rating name="read-only" value={targetRating} precision={0.5} size="large" readOnly />
    </Box>
      <p>
      {params.target && <button onClick={handleClickOpen}>Rate</button>}
      {!params.target && <button >Edit</button>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rate User</DialogTitle>
        <Box
      sx={{
        '& > legend': { mt: 2 },
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
