import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../components/stores/auth";
import { userActions } from "../components/stores/user";
import { loaderActions } from "../components/stores/loader";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: rgb(79, 120, 181);
  font-weight: 700;
`;

const Input = styled(Form.Control)`
  width: 90%;
  min-height: 42px;
  line-height: 1.2em;
  border-radius: 21px;
  padding: 6px 20px;
  margin: 10px 5%;
  resize: none;
  border: 0;
  box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled(Button)`
  width: 90%;
  min-height: 42px;
  line-height: 1.2em;
  font-weight: 600;
  border-radius: 21px;
  margin: 10px 5%;
  border: 0;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
`;

const Login = () => {
  const dispatchStore = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);
  const error = useSelector((state) => state.loader.error);
  const username = useSelector((state) => state.user.username);

  const [seeding, setSeeding] = useState(false);
  const [submit, setSubmit] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchStore(userActions.usernameChange(username.trim()));
    if (username === "") usernameRef.current.focus();
    else {
      setSubmit(true);
    }
  };

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    // if (error.message !== "Invalid Password") window.location.reload(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (submit && username) loginFlow(controller.signal);
    return () => controller.abort();
    //eslint-disable-next-line
  }, [submit]);

  useEffect(() => {
    const controller = new AbortController();
    if (!seeding) seedingFlow(controller.signal);
    return () => controller.abort();
    //eslint-disable-next-line
  }, []);

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

  const loginFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/users/login`;
    try {
      const res = await axios.post(
        url,
        { username, password: passwordRef.current.value },
        { signal }
      );
      if (res.status !== 200) {
        console.log(res.data);
      }
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
      <Form onSubmit={handleSubmit} style={{ marginBottom: "30vh" }}>
        <Row className="d-flex flex-row justify-content-center align-content-center">
          <Col sm={12}>
            <Input
              type="text"
              value={username}
              ref={usernameRef}
              placeholder="username"
              onChange={(e) => dispatchStore(userActions.usernameChange(e.target.value))}
            />
          </Col>
          <Col sm={12}>
            <Input type="password" ref={passwordRef} placeholder="password" />
          </Col>
          <Col sm={12}>
            <StyledButton type="submit" variant="primary">
              LOGIN
            </StyledButton>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
