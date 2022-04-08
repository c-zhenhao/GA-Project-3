import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./stores/user";
import { loaderActions } from "./stores/loader";
import axios from "axios";
import LoadingSpinner from "./modals/LoadingSpinner";
import ErrorModal from "./modals/ErrorModal";

const Logout = () => {
  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.userId);

  const navigate = useNavigate();

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    if (!userId && !username) navigate(`/`, { replace: true });
    else window.location.reload(false);
  };

  const logoutFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/users/logout`;
    try {
      const res = await axios.get(url, { signal, withCredentials: true });
      if (res.status === 200) {
        dispatchStore(userActions.logout(res.data.userId));
        dispatchStore(
          loaderActions.setError({
            name: "Bye! See ya soon.",
            message: "You have been successfully logged out.",
          })
        );
      }
    } catch (err) {
      dispatchStore(loaderActions.setError({ name: err.name, message: err.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  useEffect(() => {
    const controller = new AbortController();
    logoutFlow(controller.signal);
    return () => controller.abort();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {error && error.message !== "canceled" && (
        <ErrorModal
          title={error.name}
          message={error.message}
          onClick={handleModalOkay}
        ></ErrorModal>
      )}
      {isLoading && <LoadingSpinner show={isLoading} />}
    </>
  );
};

export default Logout;
