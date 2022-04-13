import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { loaderActions } from "../components/stores/loader";
import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";
import axios from "axios";

const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/list`;

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
        <img src={data.imgUrl} alt="profile" />
        <p>
          <Link to={`/${userId}/profile/${data.id}`}> See Profile </Link>
        </p>
      </ul>
    );
  });
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
      <div>
        <h1>Your matches</h1>
        {displayList}
      </div>
    </>
  );
};

export default TargetList;
