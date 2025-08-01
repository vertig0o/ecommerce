import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  AddCircleOutline,
  Delete,
  RemoveCircleOutline,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import Cartsummary from "./Cartsummary";
import { currenyTRY } from "../../utils/formatCurrency";

import { addItemToCart, deleteItemFromToCart } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link } from "react-router";

export default function ShoppingCartPage() {
  const { cart, status } = useAppSelector(state => state.cart);

  const dispatch = useAppDispatch();

  if (!cart || cart?.cartItems.length === 0)
    return <Alert severity="warning">Sepetinizde ürün yok</Alert>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ürün</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">fiyat</TableCell>
              <TableCell align="right">Adet</TableCell>
              <TableCell align="right">Toplam</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.cartItems.map(item => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={`http://localhost:5049/images/${item.imageUrl}`}
                    style={{ height: 60 }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  {currenyTRY.format(item.price)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(addItemToCart({ productId: item.productId }))
                    }
                  >
                    <AddCircleOutline />
                  </Button>
                  {item.quantity}
                  <Button
                    loading={
                      status === "pengingDeleteItem" + item.productId + "single"
                    }
                    onClick={() =>
                      dispatch(
                        deleteItemFromToCart({
                          productId: item.productId,
                          quantity: 1,
                          key: "single",
                        })
                      )
                    }
                  >
                    <RemoveCircleOutline />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {currenyTRY.format(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    loading={
                      status === "pengingDeleteItem" + item.productId + "all"
                    }
                    onClick={() => {
                      dispatch(
                        deleteItemFromToCart({
                          productId: item.productId,
                          quantity: item.quantity,
                          key: "all",
                        })
                      );
                      toast.error("Ürün sepetinizden silindi.");
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <Cartsummary />
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
