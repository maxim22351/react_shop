import {createSlice} from "@reduxjs/toolkit";


export const ProductSlice = createSlice({
    name: 'product',
    initialState:{
        count: {},
        product: [],
        authData : {
            name: false,
            img: false,
            email: false,
            uid: false,
        },
        statusModal: 'none',
        history: ''
    },
    reducers:{
        add: (state,data) => {
            let item = data.payload;

            if (state.count[item] === undefined) state.count[item] = 1;
            else state.count[item]++;
        },
        resetCount: (state,data) =>{
            let obj = data.payload;

            for (const item in obj) {
                state.count[item] = obj[item];
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

        authCheck: (state,data) => {
            let item = data.payload;

            state.authСondition = true;

            state.authData.name = item.displayName;
            state.authData.img = item.photoURL;
            state.authData.email = item.email;
            state.authData.uid = item.uid;

        },
        statusModalCheck: (state,data) => {
            state.statusModal = data.payload;

        },

        historyAdd: (state,data) => {
            if (data.payload !== undefined) state.history = data.payload;
        },


    }
})

export const {add, reset,minus, productDelete,authCheck,statusModalCheck,historyAdd,resetCount}  = ProductSlice.actions;
export const countSelect = state => state.product.count;
export const productSelect = state => state.product.product;
export const authСonditionSelect = state => state.product.authСondition;
export const authDataSelect = state => state.product.authData;
export const statusModalSelect = state => state.product.statusModal;
export const historySelect = state => state.product.history;



export default ProductSlice.reducer;