import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";

//const seed = require ("../components/modals/seed");

const TargetList = () => {
  //using API to populate seed
  const [list, setList] = useState(null);

  useEffect (()=> {
    fetch('http://localhost:3000/seed')//need to replace with :id right?
    .then(res => {
      return res.json();
    })
    .then(data => {
      setList(data);
    }) 
  }, []);
  
  const params = useParams();
  const displayList = list.map((data, i)=> {
    const userId = params.id;
    const targetId = params.target;

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
    {displayList} 
    </div>
  )
  
};

export default TargetList;
