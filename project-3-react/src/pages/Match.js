import React from "react";
import TinderCard from "react-tinder-card";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

const Match = () => {
  const onSwipe = (direction) => {
    console.log(`you swiped: ${direction}`);
  };

  const onCardLeftScreen = (direction) => {
    console.log(`targetUser left the screen`);
  };

  return (
    <>
      <div>This is Match View</div>
      <Container>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <TinderCard
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen("something")}
            preventSwipe={["up", "down"]}
          >
            <Card elevation={24} sx={{ borderRadius: 10 }}>
              <div
                style={{
                  background: `no-repeat url(${seedUsers[0].imgUrl}) center/contain`,
                  height: "400px",
                  width: "400px",
                }}
              >
                bulba
              </div>
            </Card>
          </TinderCard>
        </Grid>
      </Container>
    </>
  );
};

export default Match;

// temp data before api is up
const seedUsers = [
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
