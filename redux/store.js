import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    restaurants: restaurantReducer, 
  },
   devTools: true,
});
