import React from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"; 
const seed = require ("../components/modals/seed");

const TargetList = () => {

  const seedList = seed.map((data, i)=> {
    const userId = "zh";
    const targetId = "aye";

    return (
      <ul key={i}>
        <b>{data.displayName}</b>
        <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">User Rating</Typography>
      <Rating name="read-only" value={data.userRating} precision={0.5} size="large" readOnly />
    </Box>
        <img src={data.imgUrl}/>
       <p><Link to={`/${userId}/profile/${targetId}`}> See Profile </Link></p>
      </ul>

      
    )
  })
  return (
    <div>
    <h1>This is Target List View.</h1>
    {seedList} 
    </div>
  )
  
};

export default TargetList;
