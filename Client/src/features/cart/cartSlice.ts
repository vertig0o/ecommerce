import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Cart } from "../../model/ICart";
import requests from "../../api/requests";

interface CartState {
  cart: Cart | null;

  status: string;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
};

export const addItemToCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number }
>("cart/addItemToCart", async ({ productId, quantity = 1 }) => {
  try {
    return await requests.Cart.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});
export const deleteItemFromToCart = createAsyncThunk<
  Cart,
  { productId: number; quantity?: number; key?: string }
>("cart/deleteItemToCart", async ({ productId, quantity = 1 }) => {
  try {
    return await requests.Cart.deleteItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const getCart = createAsyncThunk<Cart>(
  "cart/getcart",
  async (_, thunkAPI) => {
    try {
      return await requests.Cart.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: state => {
      state.cart = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(addItemToCart.pending, (state, action) => {
      console.log(action);
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addItemToCart.rejected, state => {
      state.status = "idle";
    });

    builder.addCase(deleteItemFromToCart.pending, (state, action) => {
      console.log(action);
      state.status =
        "pendingDeleteItem" + action.meta.arg.productId + action.meta.arg.key;
    });
    builder.addCase(deleteItemFromToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "idle";
    });
    builder.addCase(deleteItemFromToCart.rejected, state => {
      state.status = "idle";
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (_, action) => {
      console.log(action.payload);
    });
  },
});
export const { setCart, clearCart } = cartSlice.actions;
