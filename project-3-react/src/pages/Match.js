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
import ReplayIcon from "@mui/icons-material/Replay";

import Switch from "@mui/material/Switch";
import MatchModal from "../components/modals/MatchModal";

import styled from "styled-components";

const Match = () => {
  const username = useSelector((state) => state.user.username);

  // targets state
  const [targets, setTargets] = useState([]);

  // tinder card
  const [currentIndex, setCurrentIndex] = useState(targets.length - 1);
  const [lastDirection, setLastDirection] = useState(); // for undo (can remove)
  const currentIndexRef = useRef(currentIndex); // to use for outOfFrame closure

  const childRefs = useMemo(
    () =>
      Array(targets.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
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
    // setLastDirection(direction);

    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };
    const body = { targetUsername: nameToDelete };

    if (direction === "right") {
      console.log(username + " liked " + nameToDelete);

      body.swiped = true;

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);

      targets.pop();
      console.log(targets);
    } else if (direction === "left") {
      console.log(username + " disliked " + nameToDelete);

      body.swiped = false;

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);

      targets.pop();
      console.log(targets);
    } else {
      console.log("NOTHING HAPPENING");
    }

    updateCurrentIndex(index - 1);
    console.log(currentIndex);
  };

  // emulates the swiping action
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < targets.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
    // currentIndexRef.current >= index && childRefs[index].current.restoreCard();
    console.log(targets);
  };

  // get all
  const getMatches = async () => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };

    const response = await axios.get(url, settings);
    console.log(response.data);

    const splicedResponse = response.data.slice(0, 10);
    console.log(splicedResponse);
    setTargets(splicedResponse);
  };

  // on mount
  useEffect(() => {
    if (targets.length === 0) {
      getMatches();
    }
  }, [targets]);

  // match status
  const [isMatch, setIsMatch] = useState(false);

  const handleSwitchChange = () => {
    if (isMatch === true) {
      console.log("found a match");
      setIsMatch(false);
    } else {
      setIsMatch(true);
    }
  };

  // change to styled components later
  const swipeStyle = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const StyledTinderCard = styled(TinderCard)`
     {
      position: relative;
    }
  `;

  const buttonContainer = {
    display: "flex",
    border: "2px solid red",
    justifyContent: "space-evenly",
  };

  return (
    <>
      <div>This is Match View</div>

      <Container>
        {targets.map((targets, index) => (
          <StyledTinderCard
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
          </StyledTinderCard>
        ))}

        <Container style={buttonContainer}>
          <IconButton
            onClick={() => swipe("left")}
            onTouchStart={() => swipe("left")}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={getMatches}>
            <ReplayIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={() => swipe("right")}>
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </Container>

        {targets.length && (
          <MatchModal
            isMatch={isMatch}
            setIsMatch={setIsMatch}
            targetUsername={targets[9].username}
            targetImgUrl={targets[9].imgUrl}
            targetUserId={targets[9]._id}
          />
        )}
        <Switch onChange={handleSwitchChange} />
      </Container>
    </>
  );
};

export default Match;
