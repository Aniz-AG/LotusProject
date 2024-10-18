import { createSlice } from "@reduxjs/toolkit";


const getStoredCredentials = () => {
    const storedCredentials = localStorage.getItem('userCredentials2');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  };

const passslice = createSlice({
    name: 'userDetail2',
    initialState:  getStoredCredentials() || {
        password:null
    }, 
    reducers:{
        addPass:(state, action)=>{
            const {password}= action.payload;
            state.password= password;
            console.log('hellopass')
            localStorage.setItem('userCredentials2', JSON.stringify({ password }));
        },
        removePass:(state)=>{
            state.password= null;
            localStorage.removeItem('userCredentials2');
        }

    },

});

export const {addPass, removePass}= passslice.actions;
export default passslice.reducer;