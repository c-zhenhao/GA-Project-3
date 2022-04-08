import React, { useState, useRef, useMemo } from "react";
import TinderCard from "react-tinder-card";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Match = () => {
  const [currentIndex, setCurrentIndex] = useState(Users.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outofFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(() =>
    Array(Users.length)
      .fill(0)
      .map((i) => React.createRef())
  );

  const updateCurrentIndex = (value) => {
    setCurrentIndex(value);
    currentIndexRef.current = value;
  };

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, index) => {
    console.log(`${name} ${index} left the screen`, currentIndexRef.current);
    // currentIndexRef.current >= index && childRefs[index].current.restoreCard();
  };

  const swipeForButton = async (dir) => {
    if (canSwipe & (currentIndex < Users.length)) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  // basic feature test
  // const onSwipe = (direction) => {
  //   console.log(`you swiped: ${direction}`);
  // };

  // const onCardLeftScreen = (direction) => {
  //   console.log(`targetUser left the screen`);
  // };

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

      <div style={appContainer}>
        <Container>
          {Users.map((targets, index) => (
            <TinderCard
              ref={childRefs[index]}
              key={targets.username}
              onSwipe={(direction) => swiped(direction, targets.name, index)}
              onCardLeftScreen={() => outOfFrame(targets.name, index)}
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
                  <Typography variant="h2">{targets.displayName}</Typography>
                </div>
              </Card>
            </TinderCard>
          ))}
        </Container>
      </div>

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

// temp data before api is up
const Users = [
  {
    username: "bulbasaur",
    displayName: "Bulbasaur",
    userRating: 1.7,
    gender: "female",
    height: "2’04”",
    imgUrl: "http://img.pokemondb.net/artwork/bulbasaur.jpg",
    interests: ["Grass", "Poison"],
  },
  {
    username: "ivysaur",
    displayName: "Ivysaur",
    userRating: 1.7,
    gender: "female",
    height: "3’03”",
    imgUrl: "http://img.pokemondb.net/artwork/ivysaur.jpg",
    interests: ["Grass", "Poison"],
  },
  {
    username: "venusaur",
    displayName: "Venusaur",
    userRating: 1.7,
    gender: "female",
    height: "6’07”",
    imgUrl: "http://img.pokemondb.net/artwork/venusaur.jpg",
    interests: ["Grass", "Poison"],
  },
  {
    username: "charmander",
    displayName: "Charmander",
    userRating: 4.7,
    gender: "female",
    height: "2’00”",
    imgUrl: "http://img.pokemondb.net/artwork/charmander.jpg",
    interests: ["Fire"],
  },
  {
    username: "charmeleon",
    displayName: "Charmeleon",
    userRating: 4.7,
    gender: "male",
    height: "3’07”",
    imgUrl: "http://img.pokemondb.net/artwork/charmeleon.jpg",
    interests: ["Fire"],
  },
  {
    username: "charizard",
    displayName: "Charizard",
    userRating: 4.7,
    gender: "female",
    height: "5’07”",
    imgUrl: "http://img.pokemondb.net/artwork/charizard.jpg",
    interests: ["Fire", "Flying"],
  },
  {
    username: "squirtle",
    displayName: "Squirtle",
    userRating: 2.2,
    gender: "female",
    height: "1’08”",
    imgUrl: "http://img.pokemondb.net/artwork/squirtle.jpg",
    interests: ["Water"],
  },
  {
    username: "wartortle",
    displayName: "Wartortle",
    userRating: 2.2,
    gender: "female",
    height: "3’03”",
    imgUrl: "http://img.pokemondb.net/artwork/wartortle.jpg",
    interests: ["Water"],
  },
  {
    username: "blastoise",
    displayName: "Blastoise",
    userRating: 2.2,
    gender: "female",
    height: "5’03”",
    imgUrl: "http://img.pokemondb.net/artwork/blastoise.jpg",
    interests: ["Water"],
  },
  {
    username: "caterpie",
    displayName: "Caterpie",
    userRating: 2.5,
    gender: "female",
    height: "1’00”",
    imgUrl: "http://img.pokemondb.net/artwork/caterpie.jpg",
    interests: ["Bug"],
  },
  {
    username: "metapod",
    displayName: "Metapod",
    userRating: 3.05,
    gender: "male",
    height: "2’04”",
    imgUrl: "http://img.pokemondb.net/artwork/metapod.jpg",
    interests: ["Bug"],
  },
  {
    username: "butterfree",
    displayName: "Butterfree",
    userRating: 5.5,
    gender: "male",
    height: "3’07”",
    imgUrl: "http://img.pokemondb.net/artwork/butterfree.jpg",
    interests: ["Bug", "Flying"],
  },
  {
    username: "weedle",
    displayName: "Weedle",
    userRating: 2.5,
    gender: "male",
    height: "1’00”",
    imgUrl: "http://img.pokemondb.net/artwork/weedle.jpg",
    interests: ["Bug", "Poison"],
  },
  {
    username: "kakuna",
    displayName: "Kakuna",
    userRating: 3.05,
    gender: "male",
    height: "2’00”",
    imgUrl: "http://img.pokemondb.net/artwork/kakuna.jpg",
    interests: ["Bug", "Poison"],
  },
  {
    username: "beedrill",
    displayName: "Beedrill",
    userRating: 4.85,
    gender: "male",
    height: "3’03”",
    imgUrl: "http://img.pokemondb.net/artwork/beedrill.jpg",
    interests: ["Bug", "Poison"],
  },
];
