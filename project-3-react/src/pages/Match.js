import React, { createRef, useState, useRef, useMemo, useEffect } from "react";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import MatchModal from "../components/modals/MatchModal";

// import styled from "styled-components";

const Match = () => {
  const userUsername = useSelector((state) => state.user.username);
  const userUserId = useSelector((state) => state.user.userId);

  // targets state
  const [targets, setTargets] = useState([]);
  const [noMoreTargets, setNoMoreTargets] = useState(false);

  // match status
  const [isMatch, setIsMatch] = useState(false);
  const [matchedTarget, setMatchedTarget] = useState({});

  // tinder card
  const [currentIndex, setCurrentIndex] = useState(9);
  const currentIndexRef = useRef(9); // to use for outOfFrame closure

  const childRefs = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (value) => {
    setCurrentIndex(value);
    currentIndexRef.current = value;
  };

  // swiped function
  const swiped = async (direction, nameToDelete, index) => {
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };
    const body = { targetUsername: nameToDelete };

    if (direction === "right") {
      body.swiped = true;
    } else if (direction === "left") {
      body.swiped = false;
    } else {
      return;
    }
    const toMatch = await axios.post(url, body, settings).catch((err) => {
      console.error(err);
    });
    setIsMatch(toMatch.data.matched); // modal trigger
    if (toMatch.data.matched) setMatchedTarget(targets[index]); // store matched target

    updateCurrentIndex(index - 1);
    // if (targets.length > index)
    //   setTargets((prevState) => {
    //     console.log("prevState", prevState.length, currentIndex, currentIndexRef.current);
    //     prevState.splice(prevState.length - 1, 1);
    //     console.log("prevState spliced", prevState.length, currentIndex, currentIndexRef.current);
    //     return [...prevState];
    //   });
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
    console.log(targets);
  };

  // emulates the swiping action for buttons -  trying to figure it out later
  const swipe = async (dir) => {
    console.log(
      `swipe fn: direction is ${dir}, currentIndex is ${currentIndex}, targets.length is ${targets.length}`
    );

    if (currentIndex >= 0 && currentIndex < targets.length) {
      try {
        await childRefs[currentIndex].current.swipe(dir);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  // get all
  const getMatches = async () => {
    // if noMoreTargets is false, then stop getMatch
    setNoMoreTargets(true);
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/match`;
    const settings = { withCredentials: true };
    const response = await axios.get(url, settings).catch((err) => {
      console.error(err);
    });

    if (response.data.length !== 0) {
      setNoMoreTargets(false);
      const splicedResponse = response.data.slice(0, 10);
      setTargets(splicedResponse);
      updateCurrentIndex(9);
    } else {
      setNoMoreTargets(true);
    }
  };

  const navigate = useNavigate();

  // on view mount
  useEffect(() => {
    console.log(targets.length, currentIndex, currentIndexRef.current);
    if (!userUserId && !userUsername) navigate(`/`, { replace: true });
    if (currentIndex < 0 && !noMoreTargets) {
      console.log("getMatches", targets.length, currentIndex, currentIndexRef.current);
      getMatches();
    }
  }, [targets, currentIndex]);

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
      {noMoreTargets ? (
        <p>no more matches.. try again later!</p>
      ) : (
        <>
          <Row
            className="pt-5 justify-content-center align-content-start"
            style={{ height: "70vh" }}
          >
            <Col xs={10} style={{ position: "relative" }}>
              {targets.map((targets, index) => (
                <TinderCard
                  className="swipe row justify-content-center align-content-end"
                  ref={childRefs[index]}
                  key={targets.username}
                  onSwipe={(direction) => swiped(direction, targets.username, index)}
                  onCardLeftScreen={() => outOfFrame(targets.username, index)}
                  preventSwipe={["up", "down"]}
                >
                  <Card
                    className="col-xs-10"
                    elevation={3}
                    sx={{
                      borderRadius: 4,
                      height: "60vh",
                      position: "absolute",
                      top: 0,
                    }}
                  >
                    <Row
                      style={{
                        height: "75%",
                        padding: "30px",
                      }}
                    >
                      <Col
                        xs={10}
                        style={{
                          background: `no-repeat url(${targets.imgUrl}) center/contain`,
                          height: "100%",
                          width: "100%",
                          margin: 0,
                          padding: "10px",
                        }}
                      ></Col>
                    </Row>

                    <Row className="justify-content-center align-content-start">
                      <Col xs={12}>
                        <Typography variant="h3" sx={{ padding: "10px" }} display="inline">
                          {targets.displayName}
                          <Typography style={{ fontSize: "0.69em" }} display="inline">
                            {targets.age} / {targets.gender}
                          </Typography>
                        </Typography>
                      </Col>
                    </Row>

                    <Row className="justify-content-center align-content-start">
                      <Col xs={8}>
                        <Typography variant="h5" sx={{ padding: "0", mt: 1 }}>
                          {targets.interests}
                        </Typography>
                      </Col>
                    </Row>
                  </Card>
                </TinderCard>
              ))}
            </Col>
          </Row>

          <Row className="row justify-content-center align-content-center">
            <Row className="justify-content-center align-content-center">
              <Col xs={5}>
                <IconButton onClick={() => swipe("left")} sx={{ backgroundColor: "#ffffff" }}>
                  <CloseIcon fontSize="large" sx={{ color: "red" }} />
                </IconButton>
              </Col>

              <Col xs={5}>
                <IconButton onClick={() => swipe("right")} sx={{ backgroundColor: "white" }}>
                  <ThumbUpIcon fontSize="large" sx={{ color: "#4ca7ea" }} />
                </IconButton>
              </Col>
            </Row>
          </Row>
        </>
      )}

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
