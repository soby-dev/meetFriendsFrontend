import React from "react";
// import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  username: yup
    .string()
    .max(15)
    .required("maximum 15 characters")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
      "only special charasters allowed are & - . _"
    ),
  email: yup.string().email().required("Input correct email"),
  name: yup
    .string()
    .max(20)
    .required("Input name with a maximum of 20 characters"),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

// toast.configure();

export default function Register(props) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //   let { onHide } = props;

  const registerUser = async (data, e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let loginCreds = { username: username, password: password };
    fetch(`${root_url}/users/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: e.target.email.value,
        name: e.target.name.value,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((text) => {
            // toast.error(Object.values(text).toString(), {
            //   position: toast.POSITION.TOP_RIGHT,
            //   autoClose: 8000,
            // });
            "";
          });
        } else {
          return response.json().then((responseData) => {
            // toast.info("You are registered", {
            //   position: toast.POSITION.TOP_RIGHT,
            //   autoClose: 2000,
            // });
            navigate("/login");
          });
        }
      })
      .catch((err) => {
        // toast.error(err.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 8000,
        // });
        "";
      });
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      onSubmit={handleSubmit(registerUser)}
      encType="multipart/form-data"
    >
      <TextField
        id="email"
        name="email"
        label="Email"
        placeholder="Your email"
        multiline
        sx={{ width: 1 }}
        helperText={errors.email && errors.email.message}
        {...register("email")}
        error={errors.email ? true : false}
        color="secondary"
        focused
      />

      <TextField
        id="name"
        name="name"
        label="name"
        placeholder="Your name"
        multiline
        sx={{ width: 1 }}
        helperText={errors.name && errors.name.message}
        {...register("name")}
        error={errors.name ? true : false}
        color="secondary"
        focused
      />

      <TextField
        id="username"
        name="username"
        label="username"
        placeholder="Your username"
        multiline
        sx={{ width: 1 }}
        helperText={errors.username && errors.username.message}
        {...register("username")}
        error={errors.username ? true : false}
        color="secondary"
        focused
      />

      <TextField
        id="password"
        name="password"
        label="password"
        placeholder="Your password"
        color="secondary"
        focused
        type="password"
        sx={{ width: 1 }}
        helperText={
          errors.password
            ? errors.password.message
            : "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
        {...register("password")}
        error={errors.password ? true : false}
      />

      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="confirm password"
        placeholder="Confirm your password"
        color="secondary"
        focused
        type="password"
        sx={{ width: 1 }}
        helperText={errors.confirmPassword && "Passwords must match!"}
        {...register("confirmPassword")}
        error={errors.confirmPassword ? true : false}
      />

      <Box textAlign="right">
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "purple" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
