import { Button, Card, Container, Divider, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <Container component={Card} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Not Found
      </Typography>
      <Divider />
      <Button
        variant="contained"
        component={NavLink}
        sx={{ mt: 2 }}
        to="/catalog"
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
