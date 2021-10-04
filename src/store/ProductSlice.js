import {createSlice} from "@reduxjs/toolkit";


export const ProductSlice = createSlice({
    name: 'product',
    initialState:{
        count: {},
        product: [],
    },
    reducers:{
        add: (state,data) => {
            let item = data.payload;

            if (state.count[item] === undefined) state.count[item] = 1;
            else state.count[item]++;
        },
        resetCount: (state,data) =>{
            let obj = data.payload;

            if(obj === 'delete'){
                for (const item in state.count) delete state.count[item];
            } else {
                for (const item in obj) state.count[item] = obj[item];
            }
        },
        reset: (state,data) =>{
            if (state.product.length < 1) state.product = data.payload;

        },
        minus: (state,data) =>{
            let item = data.payload;

            if (state.count[item] > 1) state.count[item]--;
            else delete state.count[item];
        },
        productDelete: (state,data) =>{
            let item = data.payload;

            delete state.count[item];
        },



    }
})

export const {add, reset,minus, productDelete,resetCount}  = ProductSlice.actions;
export const countSelect = state => state.product.count;
export const productSelect = state => state.product.product;




export default ProductSlice.reducer;