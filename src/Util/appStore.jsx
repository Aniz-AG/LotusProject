import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import passReducer from './passslice'; // Import passReducer from passSlice.jsx
import registerReducer from './registerSlice'

const appStore = configureStore({
    reducer:{
        userDetail: loginReducer,
        userDetail2: passReducer,
        registerDetail: registerReducer,
    }
});

export default appStore;
