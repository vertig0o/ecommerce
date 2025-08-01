import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "../features/counter/counterSlice";
import { cartSlice } from "../features/cart/cartSlice";
import { catalogSlice } from "../features/catalog/catalogSlice";
import { accountSlice } from "../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
