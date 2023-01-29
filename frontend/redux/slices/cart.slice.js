import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
        const exists = state.items.find(x => x.id === payload.id)
        const current = [ ...state.items ]
        if(exists){
            console.log("Trying...", exists, { ...exists, quantity: exists.quantity + payload.quantity }, current[current.indexOf(exists)])
            current[current.indexOf(exists)] = { ...exists, quantity: exists.quantity + payload.quantity }
            state.items = current
            return
        }

        state.items = [ ...current, payload ]
    },

    removeItem: (state, { payload }) => {
        const exists = state.items.find(x => x.id === payload.id)
        const current = [ ...state.items ]
        if(exists){
            if(exists.quantity - payload.quantity > 0){
                current[current.indexOf(exists)] = { ...exists, quantity: exists.quantity - payload.quantity }
                state.items = current
                return 
            }

            state.items = [ ...state.items.filter( x => x.id !== payload.id ) ]
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer