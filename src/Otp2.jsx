import topBackground from "./Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import OtpInput from "otp-input-react";
import { useSelector } from "react-redux";

function Otp2() {
  const backStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };

  const location = useLocation();
  const { state } = location;
  const { phoneNumber, otp2, option } = state;
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [data, setdata] = useState({});
  const [data2, setdata2] = useState(null);
  const mobile = useSelector((state) => state.userDetail.mobile);
  const unique = useSelector((state) => state.userDetail.token);

  console.log("Phone Number:", phoneNumber);
  console.log("otp", otp2);
  console.log(option);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const [otp, setOtp] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (otp == otp2 || otp == data2) {
        console.log("OTP is valid. Proceeding with form submission...");
        await postData(phoneNumber);
        navigate("/imp7");
      } else {
        console.log("Entered OTP does not match the expected OTPs.");
        setErrorMsg("Enter Valid OTP");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setCounter(30);

    try {
      await fetchResendOtp(mobile);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const fetchResendOtp = async (mobile) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        mobile: mobile,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://lotus365matka.in/api-resend-otp",
        requestOptions
      );
      const result = await response.json();
      console.log("resend");
      console.log(result?.otp);
      setdata2(result?.otp);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postData = async (phoneno) => {
    let ispaytm = null;
    let isphonepe = null;
    let isgooglepe = null;

    switch (option) {
      case "1":
        ispaytm = phoneno;
        break;
      case "2":
        isphonepe = phoneno;
        break;
      case "3":
        isgooglepe = phoneno;
        break;
      default:
        break;
    }
    console.log(option);
    console.log(isphonepe);
    console.log(ispaytm);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
      );
      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        unique_token: unique,
        mobile_no: mobile,
        upi_type: option,
        paytm_no: ispaytm,
        google_pay_no: isgooglepe,
        phon_pay_no: isphonepe,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        "https://lotus365matka.in/api-add-user-upi-details",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div style={backStyle}>
        
        <div className="flex justify-center items-center">
          <img src={logo} alt="Center Image" className="w-40 h-40" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black  mt-4 text-3xl">OTP Verification</p>
          <p className="text-black mt-4">
            Enter the code from the SMS we sent to
          </p>
          <div className="text-white">+91 {phoneNumber} </div>
          {counter > 0 && (
            <div className="text-black mt-5">Resend OTP in: 00 : {counter}</div>
          )}
          <OtpInput
          value={otp}
          onChange={setOtp}
          otpType="number"
          disabled={false}
          autoFocus
          inputClassName="border border-black rounded-md font-bold mt-5"
        />
          <div className="text-gray-500" style={{ margin: "30px 20px 0 0" }}>
            I didn't receive any code.{" "}
            {counter === 0 && (
              <button className="ml-3 font-bold text-red-500" onClick={handleResendOtp}>
                RESEND
              </button>
            )}
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <button
            className="bg-yellow-600 hover:bg-yellow text-white font-bold py-2 px-5 rounded "
            style={{ marginTop: "30px" }}
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}

export default Otp2;
