import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { profileActions } from "../components/stores/profile";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const EditProfile = () => {
  const params = useParams();
  const dispatchStore = useDispatch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const redirectProfile = () => {
    let path = `/${params.id}/profile/`;
    navigate(path);
  };

  const displayName = useSelector((state) => state.profile.displayName);
  const gender = useSelector((state) => state.profile.gender);
  const age = useSelector((state) => state.profile.age);
  const imgUrl = useSelector((state) => state.profile.imgUrl);
  const height = useSelector((state) => state.profile.height);
  const interests = useSelector((state) => state.profile.interests);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchStore(profileActions.allChange());
  };

  //api to get profile
  useEffect(() => {
    setUser(params.id);
  }, [params.id]);

  const getProfile = async () => {
    try {
      const matchURL = `${process.env.REACT_APP_SERVER_DOMAIN}/profile`;
      const response = await axios.get(matchURL, { withCredentials: true });
      dispatchStore(profileActions.allChange(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={displayName}
          onChange={(e) => dispatchStore(profileActions.displayNameChange(e.target.value))}
        />
        <Input
          type="text"
          value={imgUrl}
          onChange={(e) => dispatchStore(profileActions.imgUrlChange(e.target.value))}
        />
        <Input
          type="text"
          value={gender}
          onChange={(e) => dispatchStore(profileActions.genderChange(e.target.value))}
        />
        <Input
          type="number"
          value={age}
          onChange={(e) => dispatchStore(profileActions.ageChange(e.target.value))}
        />
        <Input
          type="text"
          value={height}
          onChange={(e) => dispatchStore(profileActions.heightChange(e.target.value))}
        />
        <Input
          type="text"
          value={interests}
          onChange={(e) => dispatchStore(profileActions.interestsChange(e.target.value))}
        />
        <StyledButton type="submit" variant="primary">
          EDIT PROFILE
        </StyledButton>
        <StyledButton onClick={redirectProfile} variant="primary">
          BACK TO PROFILE
        </StyledButton>
      </Form>
    </div>
  );
};

export default EditProfile;
