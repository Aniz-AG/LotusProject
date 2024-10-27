import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import logo from "./Images/logo.png";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./Util/loginSlice";
import { remove } from "./Util/registerSlice";
import bgImage from "./assets/ICONS AND BACKGROUNDS/login signup back.png"; // Import background image

function Otp3() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [data, setdata] = useState({});
  const [data2, setdata2] = useState(null);
  
  const username = useSelector((state) => state.registerDetail.username);
  const mobile = useSelector((state) => state.registerDetail.phone);
  const password = useSelector((state) => state.registerDetail.password);
  const otp2 = useSelector((state) => state.registerDetail.otp);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const handleAdduser = (username, token, mobile) => {
    dispatch(login({ username: username, token: token, mobile: mobile }));
    dispatch(remove());
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
    if (isSubmitting) return;
    setIsSubmitting(true); 

    try {
      if (otp == otp2 || otp == data2) {
        setIsSubmit(true);
        const a = await fetchData(username, mobile, password);
        handleAdduser(a?.user_name, a?.unique_token, mobile);
        navigate("/imp");
      } else {
        setErrorMsg("Enter Valid OTP");
      }
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (username, mobile, password) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        name: username,
        email: "email",
        password: password,
        mobile: mobile,
        security_pin: "123456",
        device_id: null,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://lotus365matka.in/api-user-registration",
        requestOptions
      );
      const result = await response.json();
      setdata(result);
      return result;
    } catch (error) {}
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setCounter(30);

    try {
      await fetchResendOtp(username, mobile, password);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const fetchResendOtp = async (username, phoneno, password) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        mobile: phoneno,
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
      setdata2(result?.otp);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="p-5 shadow-md z-4 mt-2 m-auto" style={{ width: "370px", display: "flex", flexDirection: "column" }}>
        <div className="flex justify-center items-center">
          <img src={logo} alt="Center Image" className="w-40 h-40" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-white mt-4 text-3xl">OTP Verification</p>
          <p className="text-white mt-4">Enter the code from the SMS we sent to</p>
          <div className="text-white">+91 {mobile}</div>
          {counter > 0 && (
            <div className="text-white mt-5">Resend OTP in: 00 : {counter}</div>
          )}
          <OtpInput
            value={otp}
            onChange={setOtp}
            otpType="number"
            disabled={false}
            autoFocus
            inputClassName="border border-white rounded-md font-bold mt-5 text-white"
          />
          <div className="text-white" style={{ margin: "30px 20px 0 0" }}>
            I didn't receive any code.{" "}
            {counter === 0 && (
              <button className="ml-3 text-red-500 font-bold" onClick={handleResendOtp}>
                RESEND
              </button>
            )}
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <button
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded"
            style={{ marginTop: "30px" }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp3;
