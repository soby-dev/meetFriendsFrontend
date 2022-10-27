import React, { useEffect, useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthContext from "./contexts/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function QuickEventSearch() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = React.useState(false);

  let navigate = useNavigate();

  function submitSearchBar(e) {
    e.preventDefault();
    let category = e.target.category.value;
    setCategories(category);
    e.target.category.value = "";
  }

  return (
    <Box>
      <Box>
        <Box sx={{ width: "70%", mt: 3, margin: "auto" }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{ color: "black" }}
          >
            Find an event
          </Typography>

          <Box sx={{ mt: 1 }}>
            <Box
              component="form"
              sx={{ display: "flex", justifyContent: "center" }}
              encType="multipart/form-data"
              onSubmit={submitSearchBar}
            >
              <TextField
                name="name"
                id="outlined-start-adornment"
                placeholder="Event name"
                color="secondary"
                focused
                sx={{ minWidth: { xs: 0.8, md: 0.5 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon></SearchIcon>
                    </InputAdornment>
                  ),
                  style: { backgroundColor: "white" },
                }}
              />

              <Button
                sx={{
                  ml: 2,
                  width: 0.1,
                  backgroundColor: "purple",
                }}
                variant="contained"
                type="submit"
              >
                <SearchIcon></SearchIcon>
              </Button>
            </Box>

            {/* <Box
                sx={{ mt: "40px", display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  sx={{
                    color: colours.secondary2,
                    backgroundColor: colours.button,
                  }}
                  onClick={() => setFindTradesmanControl(true)}
                >
                  Advanced search
                </Button>
              </Box> */}
          </Box>
        </Box>
      </Box>

      {/*this shows loading sign when resource is loading  */}
      {loading && (
        <Box sx={style}>
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
}
