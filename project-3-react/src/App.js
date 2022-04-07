import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./assets/normalize.css";
import "./assets/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import Login from "./pages/Login";
import Match from "./pages/Match";
import TargetList from "./pages/TargetList";
import Profile from "./pages/Profile";

const GlobalStyle = createGlobalStyle`
:root, body {
    height:${({ height }) => height}px;
    width:${({ width }) => width}px;
}`;

function App() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyle height={dimensions.height} width={dimensions.width} />
      {dimensions.width} x {dimensions.height}
      <main style={{ width: "100%", height: "100%" }}>
        <Container
          className="justify-content-center align-content-center"
          style={{ height: "100%" }}
        >
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id/match" element={<Match />} />
            <Route path="/:id/list" element={<TargetList />} />
            <Route path="/:id/profile" element={<Profile />} />
            <Route path="/:id/profile/:target" element={<Profile />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
