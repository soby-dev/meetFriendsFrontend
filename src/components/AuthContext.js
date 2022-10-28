import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  // retrieve authentication tokens in local storage
  let isToken = localStorage.getItem("authTokens");

  // set user and authentication token to appriopriate values if user is logged in
  const [user, setUser] = useState(() =>
    isToken ? jwt_decode(JSON.parse(isToken).access) : null
  );
  const [authToken, setAuthToken] = useState(() =>
    isToken ? JSON.parse(isToken) : null
  );
  const [events, setEvents] = useState(null);
  console.log(events);

  // let root_url = "http://localhost:8000";
  let root_url = "https://meetfriendsbackend.herokuapp.com";

  let navigate = useNavigate();

  // Function to login user. this fuction would be passed to login page using useContext
  const loginUser = async (data, e) => {
    e.preventDefault(); //This stops function in form from running immediately login page is loaded. it should only run on submit
    // This contacts django api and gets a response

    fetch(`${root_url}/users/token/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((text) => {});
        } else {
          return response.json().then((responseData) => {
            setAuthToken(responseData);
            setUser(jwt_decode(responseData.access));
            localStorage.setItem("authTokens", JSON.stringify(responseData)); //store token in local storage so users don't have to keep using login form
            navigate("/"); //take user to home page if logged in.
          });
        }
      })
      .catch((err) => {
        // zzz
      });
  };

  function logoutUser() {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("authTokens");
    navigate("/");
    window.location.reload(false);
  }

  // data to be passed using auth provider
  let contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    authToken: authToken,
    user: user,
    events: events,
    setEvents: setEvents,
    root_url: root_url,
  };

  // anytime AuthProvider is called, this value would be returned alongside all the elemnts passed to the authProvider (children). see app.js
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
