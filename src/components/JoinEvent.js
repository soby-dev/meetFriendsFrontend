import * as React from "react";
import { useContext, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AuthContext from "./AuthContext";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JoinEvent(props) {
  let { authToken, root_url, user } = useContext(AuthContext);
  let { joined, eventCode, participants, setParticipants } = props;
  const [color, setColor] = React.useState();

  useEffect(() => {
    if (joined) {
      setColor("green");
    } else {
      setColor("grey");
    }
  }, [joined]);

  const join = async (e) => {
    if (user) {
      fetch(`${root_url}/events/join-event/${eventCode}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(authToken.access),
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              toast.error(Object.values(data)[0], {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 8000,
              });
            });
          } else {
            return response.json().then((data) => {
              if (data["joined"] === true) {
                e.target.style.color = "green";
                let number = participants[eventCode] + 1;
                var newParticipants = { ...participants };
                newParticipants[eventCode] = number;
                setParticipants(newParticipants);
                toast.success("Joined event", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                });
              } else {
                e.target.style.color = "grey";
                let number = participants[eventCode] - 1;
                var newParticipants = { ...participants };
                newParticipants[eventCode] = number;
                setParticipants(newParticipants);
                toast.error("left event", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                });
              }
            });
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000,
          });
        });
    } else {
      alert("Login to join events");
    }
  };

  return (
    <IconButton
      aria-label="add to favorites"
      sx={{ color: color }}
      onClick={(e) => join(e)}
    >
      <PersonAddAlt1Icon />
    </IconButton>
  );
}

export default JoinEvent;
