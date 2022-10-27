import React, { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { colours } from "../colours";
import AuthContext from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  username: yup
    .string()
    .max(15)
    .required("maximum 15 characters")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
      "only special charasters allowed are & - . _"
    ),
  // email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});

export default function Login(props) {
  let { loginUser, user } = useContext(AuthContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        onSubmit={handleSubmit(loginUser)}
        encType="multipart/form-data"
      >
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
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          placeholder="Your password"
          type="password"
          sx={{ width: 1 }}
          helperText={errors.password && errors.password.message}
          {...register("password")}
          error={errors.password ? true : false}
        />

        <Box textAlign="center">
          <Button
            sx={{ backgroundColor: colours.button }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" align="center">
          Don't have an acccount?
        </Typography>
        <Box sx={{ mt: 1 }} textAlign="center">
          <Button variant="contained" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Box>
      </Box>
    </div>
  );
}
