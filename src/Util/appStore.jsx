import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import passReducer from './passslice'; // Import passReducer from passSlice.jsx
import registerReducer from './registerSlice';
import forgotPasswordSlice from './forgotPasswordSlice';

const appStore = configureStore({
    reducer:{
        userDetail: loginReducer,
        userDetail2: passReducer,
        registerDetail: registerReducer,
        forgotPassword: forgotPasswordSlice
    }
});

export default appStore;
