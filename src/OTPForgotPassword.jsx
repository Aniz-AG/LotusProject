import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { useSelector, useDispatch } from "react-redux";
import { removeOtpDetails } from "./Util/forgotPasswordSlice";

function OtpForgotPassword() {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const otpStored = useSelector((state) => state.forgotPassword.otp);
  const phone = useSelector((state) => state.forgotPassword.phone);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === otpStored) {
      dispatch(removeOtpDetails());
      navigate("/change-password");
    } else {
      setErrorMsg("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-5 shadow-md">
        <h1 className="text-3xl mb-5 text-center">OTP Verification</h1>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          isInputNum
          shouldAutoFocus
          inputClassName="border p-2 w-full"
        />
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-5 mt-5 w-full">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpForgotPassword;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import OtpInput from "otp-input-react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeOtpDetails } from "./Util/forgotPasswordSlice";

// import {forgotPasswordSl} from './Util/forgotPasswordSlice';

// function OTPForgotPassword() {
//   const [otp, setOtp] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

  // Correctly access the otp and phone from the forgotPassword slice
//   const otpStored = useSelector((state) => state.forgotPassword.otp);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (otp === otpStored) {
//       dispatch(removeOtpDetails());
//       dispatch(forgotPasswordSlice());
//       navigate("/change-password");
//     } else {
//       setErrorMsg("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-5 shadow-md">
//         <h1 className="text-3xl mb-5 text-center">OTP Verification</h1>
//         <OtpInput
//           value={otp}
//           onChange={setOtp}
//           numInputs={6}
//           isInputNum
//           shouldAutoFocus
//           inputClassName="border p-2 w-full"
//         />
//         {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
//         <button type="submit" className="bg-blue-500 text-white py-2 px-5 mt-5 w-full">
//           Verify OTP
//         </button>
//       </form>
//     </div>
//   );
// }

// export default OTPForgotPassword;
