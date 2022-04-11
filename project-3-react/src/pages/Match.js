import React, { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import TinderCard from "react-tinder-card";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Match = () => {
  const username = useSelector((state) => state.user.username);

  // targets state
  const [targets, setTargets] = useState([]);

  // tinder card
  const [currentIndex, setCurrentIndex] = useState(targets.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex); // to use for outOfFrame closure

  const childRefs = useMemo(() =>
    Array(targets.length)
      .fill(0)
      .map((i) => React.createRef())
  );

  const updateCurrentIndex = (value) => {
    setCurrentIndex(value);
    currentIndexRef.current = value;
  };

  // enables swiping feature
  const canSwipe = currentIndex >= 0;

  // swiped function
  const swiped = async (direction, nameToDelete, index) => {
    console.log(`removing ${nameToDelete}`);
    setLastDirection(direction);
    if (direction === "right") {
      console.log(username + " liked " + nameToDelete);

      const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
      const settings = { withCredentials: true };
      const body = { targetUsername: nameToDelete, swiped: true };

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);
    } else if (direction === "left") {
      console.log(username + " disliked " + nameToDelete);

      console.log(username + " liked " + nameToDelete);

      const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
      const settings = { withCredentials: true };
      const body = { targetUsername: nameToDelete, swiped: false };

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);
    } else {
      console.log("SOMETHING WRONG");
    }

    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
    // currentIndexRef.current >= index && childRefs[index].current.restoreCard();
  };

  const swipeForButton = async (dir, nameToDelete) => {
    if (canSwipe & (currentIndex < targets.length)) {
      await childRefs[currentIndex].current.swiped(dir, nameToDelete);
    }
  };

  // basic feature test
  // const onSwipe = (direction) => {
  //   console.log(`you swiped: ${direction}`);
  // };

  // const onCardLeftScreen = (direction) => {
  //   console.log(`targetUser left the screen`);
  // };

  // get all
  const getMatches = async (signal) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/seed`;
    const settings = { signal, withCredentials: true };

    const response = await axios.get(url, settings);
    console.log(response.data);

    const splicedResponse = response.data.slice(0, 10);
    console.log(splicedResponse);
    setTargets(splicedResponse);
  };

  // on mount
  useEffect(() => {
    getMatches();
  }, []);

  // change to styled components later
  const swipeStyle = {
    position: "absolute",
    left: "35%",
  };

  const appContainer = {
    display: "flex",
    border: "2px solid red",
  };

  return (
    <>
      <div>This is Match View</div>

      <Container>
        {targets.map((targets, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={targets.username}
            onSwipe={(direction) => swiped(direction, targets.username, index)}
            onCardLeftScreen={() => outOfFrame(targets.username, index)}
            preventSwipe={["up", "down"]}
          >
            <Card elevation={3} sx={{ borderRadius: 15 }} style={swipeStyle}>
              <div
                style={{
                  background: `no-repeat url(${targets.imgUrl}) center/contain`,
                  height: "300px",
                  width: "300px",
                }}
              >
                <Typography variant="h2">
                  {targets.displayName} {targets.gender} {targets.age}
                </Typography>
              </div>
            </Card>
          </TinderCard>
        ))}
      </Container>

      <div style={appContainer}>
        <IconButton>
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton>
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default Match;
