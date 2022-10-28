import React, { useContext, useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Box from "@mui/material/Box";
import JoinEvent from "./JoinEvent";
import AuthContext from "./AuthContext";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function EventsDisplay(props) {
  let { events } = useContext(AuthContext);
  let [participants, setParticipants] = useState({});

  useEffect(() => {
    if (events) {
      var newParticipants = { ...participants };
      for (var i = 0; i < events.length; i++) {
        var eventcode = events[i].event.code;
        var signedUp = events[i].event.signedUp;
        newParticipants[eventcode] = signedUp;
        console.log(newParticipants);
      }
      setParticipants(newParticipants);
    }
  }, [events]);

  useEffect(() => {
    console.log(participants);
  }, [participants]);

  return (
    <Box component="div" sx={{ m: 1, mt: 6 }}>
      {events && (
        <Masonry columns={2} spacing={2}>
          {events.map((event, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid purple",
                  borderRadius: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="body1" component="div">
                    {event.event.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography sx={{ fontSize: 12, color: "grey" }}>
                      {event.event.date}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "grey" }}>
                      {event.event.time}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ color: "grey", fontSize: 12 }}
                    variant="body2"
                  >
                    {event.event.address}
                  </Typography>
                  <hr></hr>

                  <Typography variant="body2" sx={{ pt: 0, mt: 0 }}>
                    {event.event.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <IconButton aria-label="participation">
                    <GroupsIcon sx={{ color: "purple" }} />
                    <Typography sx={{ color: "black" }}>
                      {participants[event.event.code]}/
                      {event.event.maxParticipants}
                    </Typography>
                  </IconButton>
                  <IconButton aria-label="price">
                    <MonetizationOnIcon sx={{ color: "purple" }} />
                    <Box>
                      {event.event.price > 0 ? (
                        <Typography sx={{ fontSize: 12, color: "black" }}>
                          {event.event.price}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: 12, color: "black" }}>
                          FREE
                        </Typography>
                      )}
                    </Box>
                  </IconButton>
                  <JoinEvent
                    joined={event.joined}
                    setParticipants={setParticipants}
                    participants={participants}
                    eventCode={event.event.code}
                  ></JoinEvent>
                </CardActions>
              </div>
            );
          })}
        </Masonry>
      )}
    </Box>
  );
}
