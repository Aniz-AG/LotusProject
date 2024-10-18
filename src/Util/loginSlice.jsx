import { createSlice } from "@reduxjs/toolkit";

const getStoredCredentials = () => {
  const storedCredentials = localStorage.getItem('userCredentials');
  return storedCredentials ? JSON.parse(storedCredentials) : null;
};

const loginSlice = createSlice({
    name:'userDetail',
    initialState: getStoredCredentials() || {
        username: null,
        token: null,
        mobile: null
    },
    reducers: {
        login: (state, action) => {
            const { username, token, mobile } = action.payload;
            state.username = username;
            state.token = token;
            state.mobile = mobile;
            localStorage.setItem('userCredentials', JSON.stringify({ username, token, mobile }));
            console.log("login")
        },
        logout: (state) => {
            state.username = null;
            state.token = null;
            state.mobile = null;
            localStorage.removeItem('userCredentials');
        }
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
