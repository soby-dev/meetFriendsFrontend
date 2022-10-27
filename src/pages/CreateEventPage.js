import * as React from "react";
import { useState, useRef, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TownSelect from "../components/TownSelect";

const style = {
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  pt: 0,
  height: 1,
  overflow: "scroll",
  maxWidth: "650px",
};

let today = new Date();

const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  maxParticipants: yup.number().positive().integer().required(),
  date: yup.date().min(today),
  time: yup.string().required("time is required"),
  description: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
  town: yup.string().required("This field is required"),
});

function CreateEvent() {
  let { authToken, root_url } = useContext(AuthContext);
  let navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);

  function addTag() {
    var tagInput = tagInputRef.current.value;
    if (!tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
    }
    tagInputRef.current.value = null;
  }

  function deleteTag(tagToDelete) {
    let newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
  }

  const eventCreate = async (data, e) => {
    e.preventDefault();

    const formData = new FormData();

    let name = e.target.name.value;
    let description = e.target.description.value;
    let address = e.target.address.value;
    let town = e.target.town.value;
    let country = e.target.country.value;
    let state = e.target.state.value;
    let date = e.target.date.value;
    let time = e.target.time.value;
    let maxParticipants = e.target.maxParticipants.value;
    let price = e.target.price.value;
    if (!price) {
      price = 0;
    }

    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        formData.append("category", tags[i]);
      }
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("town", town);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("maxParticipants", maxParticipants);
    formData.append("price", price);

    fetch(`${root_url}/events/create-event/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + String(authToken.access),
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((text) => {
            toast.error(Object.values(text)[0], {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 8000,
            });
          });
        } else {
          //   window.location.reload(false);
          navigate("/home");
          toast.success("Your event was created", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 8000,
        });
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          textAlign={"center"}
          sx={{ mb: 2 }}
        >
          Create Event
        </Typography>
      </Box>
      <Typography variant="subtitle2">
        Add tags to your event so it can be found by others
      </Typography>

      <TextField
        id="tags"
        name="tags"
        placeholder="e.g football"
        color="secondary"
        focused
        inputRef={tagInputRef}
        sx={{ minimumWidth: 1 / 3, pt: 2, mb: 2 }}
      />
      <br></br>
      <Button
        sx={{ display: "flex", alignSelf: "center", backgroundColor: "purple" }}
        variant="contained"
        type="button"
        onClick={() => addTag()}
      >
        Add Tag
      </Button>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        {tags.map((tag, index) => {
          return (
            <Chip
              label={tag}
              key={index}
              variant="outlined"
              onDelete={() => deleteTag(tag)}
            />
          );
        })}
      </Stack>

      <hr></hr>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        onSubmit={handleSubmit(eventCreate)}
        encType="multipart/form-data"
      >
        <TextField
          id="name"
          name="name"
          label="Event name"
          placeholder="Event name"
          multiline
          color="secondary"
          focused
          sx={{ width: 1 }}
          helperText={errors.name ? errors.name.message : "Input event name"}
          {...register("name")}
          error={errors.name ? true : false}
        />

        <TextField
          id="country"
          label="country"
          name="country"
          defaultValue={"United Kingdom"}
          disabled
          sx={{ width: 2 / 3 }}
        />

        <TextField
          id="state"
          label="county"
          name="state"
          defaultValue={"Hampshire"}
          disabled
          sx={{ width: 2 / 3 }}
        />

        <TownSelect error={errors.town} register={register}></TownSelect>

        <TextField
          id="address"
          label="Address"
          name="address"
          placeholder="Address"
          color="secondary"
          focused
          sx={{ width: 1 }}
          helperText={errors.address ? errors.address.message : "Event address"}
          {...register("address")}
          error={errors.address ? true : false}
        />

        <TextField
          id="maxParticipants"
          label="Maximum Participants"
          name="maxParticipants"
          placeholder="Maximum participants"
          color="secondary"
          focused
          sx={{ width: 2 / 3 }}
          type="number"
          helperText={
            errors.maxParticipants
              ? "Number of maximum participants is required"
              : "Input max participants"
          }
          {...register("maxParticipants")}
          error={errors.maxParticipants ? true : false}
        />

        <TextField
          id="price"
          label="price"
          name="price"
          placeholder="price"
          type="number"
          color="secondary"
          focused
          InputProps={{
            startAdornment: <InputAdornment position="start">£</InputAdornment>,
          }}
          helperText={"Input price"}
          sx={{ width: 2 / 3 }}
        />

        <br></br>

        <TextField
          id="date"
          name="date"
          type="date"
          label=" "
          color="secondary"
          focused
          sx={{ width: 1 / 2 }}
          helperText={
            errors.date
              ? "event date is required, earliest date is today"
              : "Event date"
          }
          {...register("date")}
          error={errors.date ? true : false}
        />

        <TextField
          id="time"
          label=" "
          name="time"
          type="time"
          color="secondary"
          focused
          sx={{ width: 1 / 3 }}
          helperText={errors.time ? "event time is required" : "Event time"}
          {...register("time")}
          error={errors.time ? true : false}
        />

        <TextField
          id="description"
          name="description"
          label="Event description"
          placeholder="Event description"
          color="secondary"
          focused
          multiline
          maxRows={4}
          minRows={2}
          sx={{ width: 1 }}
          helperText={
            errors.description
              ? errors.description.message
              : "Describe your event"
          }
          {...register("description")}
          error={errors.description ? true : false}
        />

        <br></br>

        <Box textAlign="right">
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "purple" }}
          >
            Create event
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateEvent;
