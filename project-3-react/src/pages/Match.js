import React, { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// import styled from "styled-components";

const Match = () => {
  const userUsername = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);

  // targets state
  const [targets, setTargets] = useState([]);

  // match status
  const [isMatch, setIsMatch] = useState(false);
  const [matchedTarget, setMatchedTarget] = useState({});

  // tinder card
  const [currentIndex, setCurrentIndex] = useState(targets.length - 1);
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

    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };
    const body = { targetUsername: nameToDelete };

    if (direction === "right") {
      console.log(userUsername + " liked " + nameToDelete);

      body.swiped = true;

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);
      console.log(toMatch.data.matched);
      setIsMatch(toMatch.data.matched); // modal trigger

      // store matched target
      setMatchedTarget(targets[index]);

      targets.pop();
      console.log(targets);
    } else if (direction === "left") {
      console.log(userUsername + " disliked " + nameToDelete);

      body.swiped = false;

      const toMatch = await axios.post(url, body, settings);
      console.log(toMatch);
      console.log(toMatch.data.matched);
      setIsMatch(toMatch.data.matched);

      targets.pop();
      console.log(targets);
    } else {
      console.log("NOTHING HAPPENING");
    }

    updateCurrentIndex(index - 1);
    console.log(`line 85 ${index}`);
  };

  // emulates the swiping action for buttons -  trying to figure it out later
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < targets.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
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

  const navigate = useNavigate();

  // on mount
  useEffect(() => {
    if (!userUserId && !userUsername) navigate(`/`, { replace: true });
    if (targets.length === 0) {
      getMatches();
    }
  }, [targets]);

  const swipeStyle = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
  };

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

        {isMatch && (
          <MatchModal
            isMatch={isMatch}
            setIsMatch={setIsMatch}
            targetUsername={matchedTarget.username}
            targetImgUrl={matchedTarget.imgUrl}
            targetUserId={matchedTarget._id}
            targetDisplayName={matchedTarget.displayName}
          />
        )}
      </Container>
    </>
  );
};

export default Match;
