import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../slices/cart.slice.js'

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
})

export { store }