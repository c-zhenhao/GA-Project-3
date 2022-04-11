import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/seed`;

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);

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
  //const [allProfiles, setallProfiles] = useState([]);
  const [targetRating, setTargetValue] = useState(""); 
  const [targetProfile, setTargetProfile] = useState({}); 

  useEffect (async () => {
    try {
      const response  = await axios.get(matchURL);
      //setallProfiles(response.data);
      setTargetProfile(response.data.find( i => user== i._id));
      console.log(targetProfile)
  } catch (error) {
    console.log(error);
  }
  }, [user]);



  return (
    <>
    <div>
      {targetProfile && targetProfile.displayName}
      
    </div>
   
    </>
  );
};

export default Profile;
