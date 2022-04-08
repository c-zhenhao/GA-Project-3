import React from "react";
const seed = require ("../../project-3-express/models/seed");

const TargetList = () => {
  const seedList = seed.map((data, i)=> {
    return (
      <li key={i}>
        {data.displayName}
        {data.userRating}
        <img src={data.imgUrl}/>
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
