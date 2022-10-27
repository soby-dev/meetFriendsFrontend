import React from "react";
import Box from "@mui/material/Box";
import QuickEventSearch from "../components/QuickEventSearch";
import AdvancedEventSearch from "../components/AdvancedEventSearch";
import EventsDisplay from "../components/EventsDisplay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Home() {
  const [loading, setLoading] = React.useState(false);

  return (
    <Box>
      <AdvancedEventSearch></AdvancedEventSearch>
      <EventsDisplay></EventsDisplay>
    </Box>
  );
}
