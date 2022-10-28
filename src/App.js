import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/HomePage";
import { Container } from "@mui/material";
import Navigation from "./components/Navigation";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { AuthProvider } from "./components/AuthContext";
import CreateEvent from "./pages/CreateEventPage";

function App() {
  useEffect(() => {
    document.title = "MeetFriends";
  });

  return (
    <Router>
      <AuthProvider>
        <Navigation></Navigation>
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/create-event" element={<CreateEvent />}></Route>
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
