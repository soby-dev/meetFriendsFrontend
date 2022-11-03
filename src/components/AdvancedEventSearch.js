import React from "react";
import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import Collapse from "./Collapse";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TownSelect from "./TownSelect";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AuthContext from "./AuthContext";
import { colours } from "../colours";
import TagCheckBox from "./TagCheckbox";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let today = new Date();
today.setDate(today.getDate() - 1);
const schem = yup.object().shape({
  distance: yup.boolean(),
  maximumDistance: yup.mixed().when("distance", {
    is: true,
    then: yup
      .number()
      .positive()
      .integer()
      .required("maximum distance is required if filtering by distance"),
  }),

  location: yup.boolean(),
  town: yup.string().when("location", {
    is: true,
    then: yup.string().required("town is required if filtering by location"),
  }),

  price: yup.boolean(),
  maximumPrice: yup.mixed().when("price", {
    is: true,
    then: yup
      .number()
      .integer()
      .required("maximum price is required if filtering by price"),
  }),
  minimumPrice: yup.mixed().when("price", {
    is: true,
    then: yup
      .number()
      .integer()
      .required("minimum price is required if filtering by price"),
  }),

  date: yup.boolean(),
  startDate: yup.mixed().when("date", {
    is: true,
    then: yup
      .date()
      .min(today)
      .required("start date is required if filtering by date"),
  }),
  endDate: yup.mixed().when("date", {
    is: true,
    then: yup
      .date()
      .min(today)
      .required("end date is required if filtering by date"),
  }),
});

export default function AdvancedEventSearch(props) {
  const notify = () => toast.success("Wow so easy!");

  const [openLocation, setOpenLocation] = useState(false);

  // collapse Interest filter options and open it
  const [openInterest, setOpenInterest] = useState(false);

  // collapse tag filter options and open it
  const [openTag, setOpenTag] = useState(false);

  // collapse name filter options and open it
  const [openName, setOpenName] = useState(false);

  // collapse price filter options and open it
  const [openPrice, setOpenPrice] = useState(false);

  // collapse date filter options and open it
  const [openDate, setOpenDate] = useState(false);

  // collapse date filter options and open it
  const [openDistance, setOpenDistance] = useState(false);

  const [tags, setTags] = useState(null);
  let { root_url, events, setEvents, user, authToken } =
    useContext(AuthContext);

  const filterEvents = async (data, e) => {
    // setFiltered(false)

    e.preventDefault();

    const formData = new FormData();

    let code = e.target.code.value;
    let name = e.target.name.value;
    let town = e.target.town?.value;
    let state = e.target.state?.value;
    let country = e.target.country?.value;
    let distance = e.target.distance?.value;
    let maximumDistance = e.target.maximumDistance?.value;
    let maximumPrice = e.target.maximumPrice?.value;
    let minimumPrice = e.target.minimumPrice?.value;
    let date = e.target.date.value;
    let startDate = e.target.startDate?.value;
    let endDate = e.target.endDate?.value;

    if (code) {
      formData.append("code", code);
      e.target.code.value = "";
    } else if (name) {
      formData.append("name", name);
      e.target.name.value = "";
    } else {
      if (openLocation && country) {
        formData.append("country", country);
      }
      if (openLocation && state) {
        formData.append("state", state);
      }
      if (openLocation && town) {
        formData.append("town", town);
      }
      if (openDistance) {
        formData.append("distance", distance);
      }
      if (openDistance && maximumDistance) {
        formData.append("maximumDistance", maximumDistance);
      }
      if (openDistance && maximumDistance) {
        formData.append("maximumDistance", maximumDistance);
      }
      if (openPrice) {
        formData.append("price", "price");
      }
      if (openPrice && minimumPrice) {
        formData.append("minimumPrice", minimumPrice);
      }
      if (openPrice && maximumPrice) {
        formData.append("maximumPrice", maximumPrice);
      }
      if (openDate) {
        formData.append("date", date);
      }
      if (openDate && startDate) {
        formData.append("startDate", startDate);
      }
      if (openDate && endDate) {
        formData.append("endDate", endDate);
      }
      if (openTag && tags) {
        for (var i = 0; i < tags.length; i++) {
          formData.append("category", tags[i]);
        }
      }

      // if (user_latitude && user_longitude) {formData.append('location', JSON.stringify({'latitude': user_latitude, 'longitude': user_longitude}))}
    }

    let header;
    if (user) {
      header = {
        Authorization: "Bearer " + String(authToken?.access),
      };
    } else {
      header = {};
    }

    fetch(`${root_url}/events/get-event/`, {
      method: "POST",
      headers: header,
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            toast.error(Object.values(data)[0], {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 100,
            });
          });
        } else {
          return response.json().then((responseData) => {
            setEvents(responseData);
            console.log(responseData);
            if (responseData.length < 1) {
              alert("No events were found for this search");
            }
          });
        }
      })
      .catch((err) => {});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schem),
  });

  return (
    <Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          color: colours.primary2,
        }}
        onSubmit={handleSubmit(filterEvents)}
        encType="multipart/form-data"
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          sx={{ pt: 2 }}
          component="h5"
          align="center"
        >
          Find an event
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TextField
            name="name"
            id="outlined-start-adornment"
            placeholder="Event name"
            color="secondary"
            focused
            sx={{ minWidth: { xs: 0.8, md: 0.5 }, width: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon></SearchIcon>
                </InputAdornment>
              ),
              style: { backgroundColor: "white" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            name="code"
            id="outlined-start-adornment"
            placeholder="Event code"
            color="secondary"
            focused
            sx={{ minWidth: { xs: 0.8, md: 0.5 }, width: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon></SearchIcon>
                </InputAdornment>
              ),
              style: { backgroundColor: "white" },
            }}
          />
        </Box>

        <Box>
          <fieldset style={{ border: "none" }}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h5" sx={{pt:1}}>
               Filter options
              </Typography>                                              */}
            <div>
              <Box sx={{ mb: 1 }}>
                <input
                  onClick={() => setOpenLocation(!openLocation)}
                  type="checkbox"
                  id="location"
                  name="location"
                  {...register("location")}
                ></input>
                <label htmlFor="location"> Filter by location</label>
                <br></br>
              </Box>

              <Collapse show={openLocation}>
                <ul>
                  <Box sx={{ mb: 2 }}>
                    <TownSelect
                      error={errors.town}
                      register={register}
                    ></TownSelect>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      id="country"
                      label="country"
                      name="country"
                      defaultValue={"United Kingdom"}
                      disabled
                      sx={{ width: 2 / 3 }}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <TextField
                      id="state"
                      label="county"
                      name="state"
                      defaultValue={"Hampshire"}
                      disabled
                      sx={{ width: 2 / 3 }}
                    />
                  </Box>
                </ul>
              </Collapse>
            </div>

            {/* <div>
              <Box sx={{ mb: 1 }}>
                <input
                  onClick={() => setOpenDistance(!openDistance)}
                  type="checkbox"
                  id="distance"
                  name="distance"
                  value={openDistance}
                  {...register("distance")}
                ></input>
                <label htmlFor="distance"> Filter by distance</label>
                <br></br>
              </Box>

              <Collapse show={openDistance}>
                <div>
                  <TextField
                    id="maximumDistance"
                    name="maximumDistance"
                    type="number"
                    label="maximum distance"
                    color="secondary"
                    focused
                    sx={{ width: 3 / 4, my: 1 }}
                    helperText={
                      errors.maximumDistance
                        ? errors.maximumDistance.message
                        : "Input maximum search distance"
                    }
                    {...register("maximumDistance")}
                    error={errors.maximumDistance ? true : false}
                  />
                </div>
              </Collapse>
            </div> */}

            <div>
              <Box sx={{ mb: 1 }}>
                <input
                  onClick={() => setOpenPrice(!openPrice)}
                  type="checkbox"
                  id="by-price"
                  name="price"
                  {...register("price")}
                  value={openPrice}
                ></input>
                <label htmlFor="by-price"> Filter by price</label>
                <br></br>
              </Box>

              <Collapse show={openPrice}>
                <Box>
                  <TextField
                    id="price"
                    label="min price"
                    name="minimumPrice"
                    placeholder="Minimum Price"
                    type="number"
                    color="secondary"
                    focused
                    sx={{ width: 1, my: 1 }}
                    helperText={
                      errors.minimumPrice
                        ? errors.minimumPrice.message
                        : "Input minimum price"
                    }
                    {...register("minimumPrice")}
                    error={errors.minimumPrice ? true : false}
                  />
                  <br></br>
                  <TextField
                    id="price"
                    label="max price"
                    name="maximumPrice"
                    placeholder="Maximum Price"
                    color="secondary"
                    focused
                    type="number"
                    sx={{ width: 1, my: 1 }}
                    helperText={
                      errors.maximumPrice
                        ? errors.maximumPrice.message
                        : "Input maximum price"
                    }
                    {...register("maximumPrice")}
                    error={errors.maximumPrice ? true : false}
                  />
                </Box>
              </Collapse>
            </div>

            <div>
              <Box sx={{ mb: 1 }}>
                <input
                  onClick={() => setOpenDate(!openDate)}
                  type="checkbox"
                  id="date"
                  name="date"
                  value={openDate}
                  {...register("date")}
                ></input>
                <label htmlFor="date"> Filter by date</label>
                <br></br>
              </Box>

              <Collapse show={openDate}>
                <div>
                  <TextField
                    id="startDate"
                    name="startDate"
                    type="date"
                    label=" "
                    color="secondary"
                    focused
                    sx={{ width: 1, my: 1 }}
                    helperText={
                      errors.startDate
                        ? errors.startDate.message
                        : "Input start date"
                    }
                    {...register("startDate")}
                    error={errors.startDate ? true : false}
                  />

                  <br></br>

                  <TextField
                    id="endDate"
                    name="endDate"
                    type="date"
                    label=" "
                    color="secondary"
                    focused
                    sx={{ width: 1, my: 1 }}
                    helperText={
                      errors.endDate ? errors.endDate.message : "Input end date"
                    }
                    {...register("endDate")}
                    error={errors.endDate ? true : false}
                  />
                </div>
              </Collapse>
            </div>

            <div>
              <Box sx={{ mb: 1 }}>
                <input
                  onClick={() => setOpenTag(!openTag)}
                  type="checkbox"
                  id="tags"
                  name="tags"
                  value={openTag}
                ></input>
                <label htmlFor="by-interests"> Filter by tags</label>
                <br></br>
              </Box>

              <Collapse show={openTag}>
                <div>
                  <TagCheckBox getTags={(tags) => setTags(tags)}></TagCheckBox>
                </div>
              </Collapse>
            </div>
          </fieldset>
          <Box textAlign="center">
            <Button
              variant="contained"
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "purple",
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
