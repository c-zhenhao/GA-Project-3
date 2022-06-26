import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { profileActions } from "../components/stores/profile";
import { prefStoreActions } from "../components/stores/prefStore";
import { loaderActions } from "../components/stores/loader";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../components/modals/LoadingSpinner";
import ErrorModal from "../components/modals/ErrorModal";
import styled from "styled-components";
import ProfileForm from "../components/ProfileForm";

// const StyledH1 = styled.h1`
//   color: rgb(79, 120, 181);
//   font-weight: 700;
// `;

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
  const userId = useSelector((state) => state.user.userId);

  const [submit, setSubmit] = useState(false);
  const [signup, setSignup] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleModalOkay = () => {
    dispatchStore(loaderActions.clearError());
    // if (error.message !== "Invalid Password") window.location.reload(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchStore(userActions.usernameChange(username.trim()));
    if (username === "") usernameRef.current.focus();
    else {
      setSubmit(true);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    try {
      if (submit && username) loginFlow(controller.signal);
    } catch (err) {
      console.error(err);
    }
    return () => controller.abort();
    //eslint-disable-next-line
  }, [submit]);

  useEffect(() => {
    if (userId && username) navigate(`/${username}/match`, { replace: true });
    //eslint-disable-next-line
  }, [userId]);

  const loginFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/users/login`;
    const body = { username, password: passwordRef.current.value };
    const settings = {
      signal,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };
    const res = await axios.post(url, body, settings).catch((err) => {
      setSubmit(false);
      dispatchStore(
        loaderActions.setError({
          title: err.response.data.title,
          message: err.response.data.message,
        })
      );
    });
    console.log(res);
    if (res) {
      dispatchStore(userActions.login(res.data.userId));
      dispatchStore(profileActions.allChange(res.data.profile));
      dispatchStore(
        prefStoreActions.setAllPref(res.data.profile.userPreference)
      );
    }
    dispatchStore(loaderActions.doneLoading());
  };

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
      <Row className="mt-5 mb-5 align-content-center">
        <Col sm={12}>
          <img src="./logo192.png" alt="LOGO" />
        </Col>
      </Row>
      {/* <Row className="align-content-center">
        <Col sm={12}>
          <StyledH1>OnlyFriends</StyledH1>
        </Col>
      </Row> */}
      <Form onSubmit={handleSubmit} style={{ marginBottom: "30vh" }}>
        <Row className="d-flex flex-row justify-content-center align-content-center">
          <Col sm={12}>
            <Input
              type="text"
              value={username}
              ref={usernameRef}
              placeholder="username"
              onChange={(e) =>
                dispatchStore(userActions.usernameChange(e.target.value))
              }
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
          <Col sm={12}>
            <StyledButton
              variant="success"
              onClick={() => {
                setSignup(true);
              }}
            >
              SIGN UP
            </StyledButton>
          </Col>
        </Row>
      </Form>
      {signup && <ProfileForm edit={false} onCancel={setSignup} />}
    </>
  );
};

export default Login;
