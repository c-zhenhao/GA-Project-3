import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../components/stores/user";
import { profileActions } from "./stores/profile";
import { loaderActions } from "../components/stores/loader";
import { Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./modals/ProfileModal";
import styled from "styled-components";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

function getStyles(n, interests, theme) {
  return {
    fontWeight:
      interests.indexOf(n) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interestedSelection = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const ProfileForm = (props) => {
  const theme = useTheme();
  const dispatchStore = useDispatch();
  const navigate = useNavigate();

  const { username, userId } = useSelector((state) => state.user);
  const { displayName, gender, age, imgUrl, height, interests } = useSelector(
    (state) => state.profile
  );

  const [submit, setSubmit] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchStore(userActions.usernameChange(username.trim()));
    if (username === "") usernameRef.current.focus();
    else {
      setSubmit(true);
    }
  };

  const handleInterestedChange = (event) => {
    const {
      target: { value },
    } = event;

    dispatchStore(
      profileActions.interestsChange(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  const signupFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/users/signup`;
    const body = {
      username,
      password: passwordRef.current.value,
      displayName,
      gender,
      age,
      imgUrl,
      height,
      interests,
    };
    const settings = {
      signal,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    console.log(body);
    const res = await axios.put(url, body, settings).catch((err) => {
      setSubmit(false);
      dispatchStore(
        loaderActions.setError({
          title: err.response.data.title,
          message: err.response.data.message,
        })
      );
    });
    if (res) {
      dispatchStore(userActions.login(res.data.userId));
    }
    dispatchStore(loaderActions.doneLoading());
  };

  const editFlow = async (signal) => {
    dispatchStore(loaderActions.setIsLoading());
    dispatchStore(loaderActions.clearError());
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/profile`;
    const body = { displayName, gender, age, imgUrl, height, interests };
    const settings = {
      signal,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    const res = await axios.patch(url, body, settings).catch((err) => {
      setSubmit(false);
      dispatchStore(
        loaderActions.setError({
          title: err.response.data.title,
          message: err.response.data.message,
        })
      );
    });
    if (res) {
      props.onCancel(false);
    }
    dispatchStore(loaderActions.doneLoading());
  };

  useEffect(() => {
    const controller = new AbortController();
    if (submit && props.edit) editFlow(controller.signal);
    else if (submit) signupFlow(controller.signal);

    return () => controller.abort();
    //eslint-disable-next-line
  }, [submit]);

  useEffect(() => {
    if (userId && username && !props.edit) navigate(`/${username}/match`, { replace: true });
    //eslint-disable-next-line
  }, [userId]);

  return (
    <ProfileModal edit={props.edit} onCancel={props.onCancel} onSubmit={handleSubmit}>
      <Form onSubmit={handleSubmit}>
        {!props.edit && (
          <Row className="d-flex flex-row justify-content-center align-content-center">
            <Col sm={12}>
              <Input
                type="text"
                value={username}
                ref={usernameRef}
                placeholder="username"
                onChange={(e) => dispatchStore(userActions.usernameChange(e.target.value))}
                required
              />
            </Col>
            <Col sm={12}>
              <Input type="password" ref={passwordRef} placeholder="password" required />
            </Col>
            <Col sm={12}></Col>
          </Row>
        )}

        <Row className="d-flex flex-row justify-content-center align-content-center">
          <Col sm={12}>
            <Input
              type="text"
              value={imgUrl}
              name="imgUrl"
              placeholder="URL to your image"
              onChange={(e) => dispatchStore(profileActions.imgUrlChange(e.target.value))}
              required
            />
          </Col>
          <Col sm={12}>
            <Input
              type="text"
              value={displayName}
              name="displayName"
              placeholder="Display Name"
              onChange={(e) => dispatchStore(profileActions.displayNameChange(e.target.value))}
              required
            />
          </Col>
          <Col sm={12}>
            <Input
              type="text"
              value={gender}
              name="gender"
              placeholder="Gender"
              onChange={(e) => dispatchStore(profileActions.genderChange(e.target.value))}
            />
          </Col>
          <Col sm={12}>
            <Input
              type="number"
              value={age}
              name="age"
              placeholder="Age"
              onChange={(e) => dispatchStore(profileActions.ageChange(e.target.value))}
            />
          </Col>
          <Col sm={12}>
            <Input
              type="text"
              value={height}
              name="height"
              placeholder="Height"
              onChange={(e) => dispatchStore(profileActions.heightChange(e.target.value))}
            />
          </Col>
          <Col sm={12}>
            <Card elevation={0} sx={{ borderRadius: 3, mb: 1, p: 1, pl: 3, pr: 3 }}>
              <Stack>
                <FormControl sx={{ m: 1, minWidth: 200, maxWidth: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">Selected</InputLabel>

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={interests}
                    onChange={handleInterestedChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {interestedSelection.map((n) => (
                      <MenuItem key={n} value={n} style={getStyles(n, interests, theme)}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Card>
          </Col>
        </Row>
      </Form>
    </ProfileModal>
  );
};

export default ProfileForm;
