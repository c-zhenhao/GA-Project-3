import React, { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import TinderCard from "react-tinder-card";

// import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayIcon from "@mui/icons-material/Replay";

import MatchModal from "../components/modals/MatchModal";

// import styled from "styled-components";

const Match = () => {
  const userUsername = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);

  // targets state
  const [targets, setTargets] = useState([]);
  const [noMoreTargets, setNoMoreTargets] = useState(true);

  // match status
  const [isMatch, setIsMatch] = useState(false);
  const [matchedTarget, setMatchedTarget] = useState({});

  // tinder card
  const [currentIndex, setCurrentIndex] = useState(targets.length);
  const currentIndexRef = useRef(currentIndex); // to use for outOfFrame closure

  console.log(typeof targets);
  console.log(targets.length);

  const childRefs = useMemo(
    () =>
      Array(targets.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (value) => {
    console.log(value);
    setCurrentIndex(value);
    currentIndexRef.current = value;
    console.log(currentIndex);
  };

  // enables swiping feature
  const canSwipe = currentIndex >= 0;
  console.log(canSwipe);

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
      console.log(matchedTarget);

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
    console.log(`line 93 ${index}`);
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
    console.log(targets);
  };

  // emulates the swiping action for buttons -  trying to figure it out later
  const swipe = async (dir) => {
    console.log(
      `line110 inside swipe fn: direction is ${dir}, canSwipe is ${canSwipe}, currentIndex is ${currentIndex}, targets.length is ${targets.length}`
    );
    if (canSwipe && currentIndex < targets.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // get all
  const getMatches = async () => {
    console.log(noMoreTargets);
    setNoMoreTargets(false);

    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };

    const response = await axios.get(url, settings);
    console.log(response.data);

    if (response.data !== false) {
      const splicedResponse = response.data.slice(0, 10);
      console.log(splicedResponse);
      setTargets(splicedResponse);
    } else {
      setNoMoreTargets(true);
      console.log(noMoreTargets);
    }
  };

  const navigate = useNavigate();

  // on view mount
  useEffect(() => {
    if (!userUserId && !userUsername) navigate(`/`, { replace: true });

    if (targets.length === 0) {
      getMatches();
    }
  }, [noMoreTargets]);

  // const swipeStyle = {
  //   position: "fixed",
  //   left: "50%",
  //   transform: "translateX(-50%)",
  // };

  // const buttonContainer = {
  //   display: "flex",
  //   border: "2px solid red",
  //   justifyContent: "space-evenly",
  // };

  return (
    <>
      <Row className="pt-4 justify-content-center align-content-start" style={{ height: "78vh" }}>
        <Col xs={10} style={{ position: "relative" }}>
          {targets.map((targets, index) => (
            <TinderCard
              className="row justify-content-center align-content-end"
              ref={childRefs[index]}
              key={targets.username}
              onSwipe={(direction) => swiped(direction, targets.username, index)}
              onCardLeftScreen={() => outOfFrame(targets.username, index)}
              preventSwipe={["up", "down"]}
            >
              <Card
                className="col-xs-10"
                elevation={3}
                sx={{ borderRadius: 5, height: "75vh", position: "absolute", top: 0 }}
              >
                <Row
                  style={{
                    background: `no-repeat url(${targets.imgUrl}) center/contain`,
                    height: "80%",
                    width: "100%",
                    margin: 0,
                    padding: "10px",
                  }}
                ></Row>
                <Row className="justify-content-center align-content-start">
                  <Col xs={8}>
                    <Typography variant="h3" sx={{ padding: "10px" }}>
                      {targets.displayName}
                    </Typography>
                  </Col>
                </Row>
                <Row className="justify-content-center align-content-start">
                  <Col xs={8}>
                    <Typography variant="h5" sx={{ padding: "0" }}>
                      Gender: {targets.gender}
                    </Typography>
                  </Col>
                  <Col xs={4}>
                    <Typography variant="h5" sx={{ padding: "0" }}>
                      Age: {targets.age}
                    </Typography>
                  </Col>
                </Row>
              </Card>
            </TinderCard>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-center align-content-center">
        <Col xs={5}>
          <IconButton onClick={() => swipe("left")}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Col>

        <Col xs={5}>
          <IconButton onClick={() => swipe("right")}>
            <FavoriteIcon fontSize="large" />
          </IconButton>
        </Col>
      </Row>

      <Row className="row justify-content-center align-content-center">
        {!noMoreTargets ? (
          <>
            <p>no more matches.. try again later!</p>
          </>
        ) : (
          <>
            {targets.length === 0 && (
              <IconButton onClick={getMatches}>
                <ReplayIcon fontSize="large" />
              </IconButton>
            )}
          </>
        )}
      </Row>

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
    </>
  );
};

export default Match;
