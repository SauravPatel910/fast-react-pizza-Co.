import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newIteam
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (iteam) => iteam.pizzaId !== action.payload,
      );
    },

    incItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },

    decItemQuantity(state, action) {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;

      item.totalPrice = item.quantity * item.unitPrice;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const getCart = (state) => state.cart.cart;

export const {
  addItem,
  deleteItem,
  incItemQuantity,
  decItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
