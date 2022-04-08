import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loaderActions } from "./stores/loader";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "./modals/LoadingSpinner";
import ErrorModal from "./modals/ErrorModal";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: rgb(79, 120, 181);
  font-weight: 700;
`;

const Seed = () => {
  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);

  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    // if (error.message !== "Invalid Password") window.location.reload(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (seeding) navigate(`/login`, { replace: true });
    else seedingFlow(controller.signal);
    return () => controller.abort();
    //eslint-disable-next-line
  }, [seeding]);

  const seedingFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/seed`;
    try {
      const res = await axios.post(url, { signal });
      if (res.status !== 200) {
        console.log(res.data);
      } else setSeeding(true);
    } catch (err) {
      dispatchStore(loaderActions.setError({ name: err.name, message: err.message }));
    }
    dispatchStore(loaderActions.doneLoading());
  };

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
      <Row className="align-content-center">
        <Col sm={12}>
          <img src="./logo192.png" alt="LOGO" />
        </Col>
      </Row>
      <Row className="align-content-center">
        <Col sm={12}>
          <StyledH1>OnlyFriends</StyledH1>
        </Col>
      </Row>
    </>
  );
};

export default Seed;
