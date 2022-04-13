import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

import Rating from "@mui/material/Rating";

const cardTheme = {
  display: "flex",
  borderBottom: "3px solid whitesmoke",
};

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: {
            variant: "h2",
          },
          style: {
            fontSize: 24,
          },
        },
        {
          props: {
            variant: "h3",
          },
          style: {
            fontSize: 30,
            fontWeight: "bolder",
          },
        },
        {
          props: {
            variant: "h4",
          },
          style: {
            fontSize: 18,
          },
        },
        {
          props: {
            variant: "h5",
          },
          style: {
            fontSize: 16,
          },
        },
      ],
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#f5f5f5",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function List(props) {
  console.log(props.list);
  const list = props.list;
  console.log(list);

  const userUsername = useSelector((state) => state.user.username);

  const displayList = list
    .slice(0)
    .reverse()
    .map((data, i) => {
      return (
        <ThemeProvider theme={theme}>
          <Container sx={{ overflowY: "auto" }}>
            <Card style={cardTheme} sx={{ p: 1.25 }} elevation={0}>
              <CardActionArea
                component={NavLink}
                to={`/${userUsername}/profile/${data.id}`}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt={data.id}
                        src={data.imgUrl}
                        sx={{
                          width: 125,
                          height: 125,
                          border: "1px solid #f0f0f0",
                          p: 0.5,
                          ml: 1,
                        }}
                      />
                    </StyledBadge>
                  </Grid>

                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Box sx={{ display: "flex" }}>
                          <Typography variant="h3">
                            {data.displayName}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            ml: 1.15,
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h4">User Rating:</Typography>
                          <Rating
                            name="read-only"
                            size="large"
                            readOnly
                            precision={0.5}
                            value={data.userRating
                              .map((v) => Number(v))
                              .reduce(
                                (a, c, i, arr) => (
                                  (a += c),
                                  i === arr.length - 1 ? (a /= arr.length) : a
                                )
                              )}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Box sx={{ mt: 1, mr: 1, ml: 1 }}>
                      <Typography variant="h5">See Profile</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Container>
        </ThemeProvider>
      );
    });

  return displayList;
}

export default List;
