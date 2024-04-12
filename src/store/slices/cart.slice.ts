import {createSlice} from "@reduxjs/toolkit";


interface CartState {
    totalCost: number;
    totalItems: number;
}

const initialState: CartState = {
    totalCost: 0,
    totalItems: 0,
};

export const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
            addToCart: (state : CartState, {payload: price}) => {
                state.totalCost += price;
                state.totalItems += 1;
            },
            removeFromCart: (state : CartState, {payload: price}) => {
                state.totalCost -= price;
                state.totalItems -= 1;
            },
            addToCartSum: (state : CartState, {payload: price}) => {
                state.totalCost += price;
            },
            removeFromCartSum: (state : CartState, {payload: price}) => {
                state.totalCost -= price;
            },
        },
    })
;


export const {actions, reducer} = cartSlice