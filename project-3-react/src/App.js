import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./assets/normalize.css";
// import "./assets/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import Login from "./pages/Login";
import Match from "./pages/Match";
import Profile from "./pages/Profile";
import TargetList from "./pages/TargetList";
import Seed from "./components/Seed";
import Logout from "./components/Logout";
import NavTop from "./components/navs/NavTop";
import NavBottom from "./components/navs/NavBottom";
import EditProfile from "./pages/EditProfile";
import Filter from "./pages/Filter";

const GlobalStyle = createGlobalStyle`
:root {
    height:${({ height }) => height}px;
}

body {
  margin: 0 auto;
  height:${({ height }) => height}px;
  width:${({ width }) => width};
  background-color: whitesmoke;
}`;

const MainContainer = styled(Container)`
   {
    height: calc(100% - 120px);
  }
`;

function App() {
  const userId = useSelector((state) => state.user.userId);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width:
      window.innerWidth > 991
        ? "960px"
        : window.innerWidth > 767
        ? "720px"
        : window.innerWidth > 575
        ? "540px"
        : "100%",
  });

  useEffect(() => {
    const handleResize = () => {
      let newWidth =
        window.innerWidth > 991
          ? "960px"
          : window.innerWidth > 767
          ? "720px"
          : window.innerWidth > 575
          ? "540px"
          : "100%";
      if (
        newWidth !== dimensions.width ||
        window.innerHeight !== dimensions.height
      )
        setDimensions({
          height: window.innerHeight,
          width: newWidth,
        });
    };
    window.addEventListener("resize", handleResize);
    window.scrollTo(0, 1);
    // window.screen.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // window.screen.removeEventListener("change", handleResize);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyle height={dimensions.height} width={dimensions.width} />
      <main style={{ width: "100%", height: "100%" }}>
        <NavTop />
        <MainContainer className="justify-content-center align-content-center">
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/seed" element={<Seed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/:id/filter" element={<Filter />} />
            <Route path="/:id/match" element={<Match />} />
            <Route path="/:id/list" element={<TargetList />} />
            <Route path="/:id/profile" element={<Profile />} />
            <Route path="/:id/profile/edit" element={<EditProfile />} />
            <Route path="/:id/profile/:target" element={<Profile />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </MainContainer>
        {userId && <NavBottom />}
      </main>
    </>
  );
}

export default App;
