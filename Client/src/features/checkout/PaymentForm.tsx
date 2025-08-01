import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", { required: "Card Name is required." })}
          label="Enter card name"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardname}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", { required: "Card Number is required." })}
          label="Enter Card Number"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardnumber}
        ></TextField>
      </Grid>{" "}
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpiremonth", {
            required: "Expiry month is required.",
          })}
          label="Enter Expiry month"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpiremonth}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          {...register("cardexpireyear", {
            required: "Expiry year is required.",
          })}
          label="Enter Expiry year"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardexpireyear}
        ></TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          {...register("cardcvc", { required: "cvc is required." })}
          label="Enter cvc"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          size="small"
          error={!!errors.cardcvc}
        ></TextField>
      </Grid>
    </Grid>
  );
}
