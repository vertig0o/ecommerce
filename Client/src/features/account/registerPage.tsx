import { LockOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type FieldValues } from "react-hook-form";

import { useNavigate } from "react-router";
import requests from "../../api/requests";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    requests.Account.register(data)
      .then(() => {
        toast.success("user created.");
        navigate("/login");
      })
      .catch(result => {
        const { data: errors } = result;
        errors.forEach((error: any) => {
          if (error.code == "DuplicateUserName") {
            setError("username", { message: error.description });
          } else if (error.code == "DuplicatEmail") {
            setError("email", { message: error.description });
          }
        });
      });
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
        <Avatar
          sx={{
            mx: "auto",
            color: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutline />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            {...register("username", { required: "username is required." })}
            label="Enter username"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
          <TextField
            {...register("name", { required: "name is required." })}
            label="Enter name"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message}
          ></TextField>
          <TextField
            {...register("email", {
              required: "email is required.",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "email is not valid",
              },
            })}
            label="Enter email"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            {...register("password", {
              required: "password is required.",
              minLength: {
                value: 6,
                message: "Min length is 6 characters",
              },
            })}
            label="Enter password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>

          <Button
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
