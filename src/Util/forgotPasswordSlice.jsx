import { createSlice } from "@reduxjs/toolkit";

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    otp: null,
    phone: null,
  },
  reducers: {
    setOtpDetails: (state, action) => {
      state.otp = action.payload.otp;
      state.phone = action.payload.phone;
    },
    removeOtpDetails: (state) => {
      state.otp = null;
      state.phone = null;
    },
  },
});

export const { setOtpDetails, removeOtpDetails } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
