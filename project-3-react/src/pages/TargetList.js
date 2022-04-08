import React from "react";
import { Link } from "react-router-dom"; 
const seed = require ("../components/modals/seed");

const TargetList = () => {

  const seedList = seed.map((data, i)=> {
    const userId = "zh";
    const targetId = "aye";

    return (
      <li key={i}>
        {data.displayName}
        {data.userRating}
        <img src={data.imgUrl}/>
        <Link to={`/${userId}/profile/${targetId}`}> See Profile </Link>
      </li>

      
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
