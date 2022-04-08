import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <>
    <div>
      {user === currentUser && <button>Edit</button>}This is Profile View of {user}
    </div>
    <div>
      {seed.filter(params.target == seed.id).map(filteredProfile => (
        <li>
          {filteredProfile}
        </li>
      ))}
    </div>
    </>
  );
};

export default Profile;
