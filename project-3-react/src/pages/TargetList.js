import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/list`;

const TargetList = () => {
  //using API to populate seed
  const [list, setList] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(matchURL, { withCredentials: true });
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const params = useParams();
  const userId = params.id;

  const displayList = list.map((data, i) => {
    return (
      <ul key={i}>
        <b>{data.displayName}</b>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">User Rating</Typography>
          <Rating
            name="read-only"
            value={data.userRating
              .map((v) => Number(v))
              .reduce((a, c, i, arr) => ((a += c), i === arr.length - 1 ? (a /= arr.length) : a))}
            precision={0.5}
            size="large"
            readOnly
          />
        </Box>
        <img src={data.imgUrl} />
        <p>
          <Link to={`/${userId}/profile/${data.id}`}> See Profile </Link>
        </p>
      </ul>
    );
  });
  return (
    <div>
      <h1>Your matches</h1>
      {displayList}
    </div>
  );
};

export default TargetList;
