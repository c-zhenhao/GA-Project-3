import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { loaderActions } from "../components/stores/loader";

import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";

import List from "../components/List";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/list`;

const tempBorder = {
  display: "flex",
  //   border: "2px solid blue",
  marginTop: "3px",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "space-between",
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

const TargetList = () => {
  //using API to populate seed
  const [list, setList] = useState([]);

  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);
  const username = useSelector((state) => state.user.username);
  const loginUserId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const getMatchedList = async () => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    try {
      const response = await axios.get(matchURL, { withCredentials: true });
      setList(response.data);
    } catch (error) {
      console.log(error);
      dispatchStore(
        loaderActions.setError({
          title: error.response.data.title,
          message: error.response.data.message,
        })
      );
    }
    dispatchStore(loaderActions.doneLoading());
  };

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    if (error.message === "not logged in") dispatchStore(userActions.logout());
    if (!userId && !username) navigate(`/`, { replace: true });
    else window.location.reload(false);
  };

  useEffect(() => {
    if (!loginUserId && !username) navigate(`/`, { replace: true });
    getMatchedList();
    //eslint-disable-next-line
  }, []);

  const params = useParams();
  const userId = params.id;

  return (
    <>
      {error && error.message !== "canceled" && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={handleModalOkay}
        ></ErrorModal>
      )}
      {isLoading && <LoadingSpinner show={isLoading} />}
      <div style={{ overflowY: "auto", height: "100%" }}>
        <ThemeProvider theme={theme}>
          <Stack direction="row" style={tempBorder}>
            <Typography variant="h2" sx={{ ml: 2 }}>
              Your matches
            </Typography>
          </Stack>
        </ThemeProvider>
        {/* eslint-disable-next-line */}
        <List list={list} />
      </div>
    </>
  );
};

export default TargetList;
