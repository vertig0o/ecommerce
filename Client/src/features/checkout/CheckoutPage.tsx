import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import requests from "../../api/requests";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../cart/cartSlice";

const steps = ["Teslimat Bilgileri", "Ödeme", "Sipariş Özeti"];

// function getStepContent(step: number) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error("Bilinmeyen bir step");
//   }
// }
const stepComponents = [<AddressForm />, <PaymentForm />, <Review />];

function getStepContent(step: number) {
  const content = stepComponents[step];
  if (!content) throw new Error("Bilinmeyen bir step");
  return content;
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm();
  const [orderId, setOrderId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function HandleNext(data: FieldValues) {
    if (activeStep === 2) {
      setLoading(true);
      try {
        setOrderId(await requests.Order.createOrder(data));
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }
  function HandlePrevious() {
    setActiveStep(activeStep - 1);
  }
  return (
    <FormProvider {...methods}>
      <Paper>
        <Grid container spacing={4}>
          {activeStep !== steps.length && (
            <Grid
              size={4}
              sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                p: 3,
              }}
            >
              <Info />
            </Grid>
          )}
          <Grid size={activeStep !== steps.length ? 8 : 12} sx={{ p: 3 }}>
            <Box>
              <Stepper activeStep={activeStep} sx={{ height: 40, mb: 4 }}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box>
              {activeStep === steps.length ? (
                <Stack spacing={2}>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Teşekkür ederiz.Siparişinizi aldık
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    sipariş numaranız <strong>#{orderId}</strong>.Siparişiniz
                    onaylandığında size bir eposta göndereceğiz.
                  </Typography>
                  <Button
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                    variant="contained"
                  >
                    Siparişleri Listele
                  </Button>
                </Stack>
              ) : (
                <form onSubmit={methods.handleSubmit(HandleNext)}>
                  {getStepContent(activeStep)}
                  <Box>
                    <Box
                      sx={[
                        {
                          display: "flex",
                        },
                        activeStep !== 0
                          ? { justifyContent: "space-between" }
                          : { justifyContent: "flex-end" },
                      ]}
                    >
                      {activeStep !== 0 && (
                        <Button
                          startIcon={<ChevronLeftRounded />}
                          onClick={HandlePrevious}
                          variant="contained"
                        >
                          Geri
                        </Button>
                      )}

                      <Button
                        loading={loading}
                        type="submit"
                        startIcon={<ChevronRightRounded />}
                        variant="contained"
                      >
                        {activeStep == 2 ? "Siparişi Tamamla" : "Devam"}
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}
