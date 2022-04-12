import React, { useState, useEffect } from "react";
import axios from "axios";

const editProfile = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

//api to get profile    
useEffect(()=> {
    setUser(params.id);
})

useEffect (async () => {
    if(user){
    try {
      const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/${user}/profile`;
      const response  = await axios.get(matchURL,{withCredentials: true});
      setUserProfile(response.data);
  } catch (error) {
    console.log(error);
  }}
  }, [user]);




    return (
        <div>
            
        </div>
    );
};


export default editProfile;