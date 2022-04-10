import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
const seed = require ("../components/modals/seed");

const Profile = () => {
  console.log("Profile");
  const currentUser = "zhenhao";//need to link to userID
  const params = useParams();
  const [user, setUser] = useState(null);
  console.log(params);

  useEffect(() => {
    if (params.target) {
      //Target Profile
      setUser(params.target);
    } else if (params.id) {
      //User Profile
      setUser(params.id);
    }
  }, [params.id, params.target]);

  const [targetRating, setTargetValue] = React.useState(""); 
  
  return (
    <>
    
    <div>
      {JSON.stringify(seed.find( seedUser => user === seedUser.username))}
      <p>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rate {user}</Typography>
      <Rating
        name="Target Rating"
        targetRating={targetRating}
        onChange={(event, newValue) => {
          setTargetValue(newValue);
        }}
        precision={0.5}       
      />
    </Box>
      </p>
    </div>
    
   
    </>
  );
};

export default Profile;
