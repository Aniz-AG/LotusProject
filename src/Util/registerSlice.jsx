import { createSlice } from "@reduxjs/toolkit";
const registerSlice = createSlice  ({
    name :'registerDetail',
    initialState:  {
        username: null,
        phone: null,
        password: null,
        otp: null
    },
    reducers: {
        register: (state, action) => {
            const { username, password, phone, otp,  } = action.payload;
            state.username = username;
            state.password = password;
            state.phone = phone;
            state.otp  = otp;
            
        },
        remove: (state)=>{
            state.username = null;
            state.password = null;
            state.phone = null;
            state.otp  = null;
          

        }
    },
});

export const {register, remove } = registerSlice.actions;

export default registerSlice.reducer;