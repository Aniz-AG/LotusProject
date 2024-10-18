import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import logo from "./Images/logo.png";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./Util/loginSlice";
import { remove } from "./Util/registerSlice";

function Otp() {

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
        // setIsSubmitting(false);
        navigate("/imp");
      } else {
        setErrorMsg("Enter Valid OTP");
      }
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setIsSubmitting(false); // Always reset submitting state after request is completed
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
        "hhttps://lotus365matka.in/api-resend-otp",
        requestOptions
      );
      const result = await response.json();
      setdata2(result?.otp);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const cardStyle = {
    width: "370px",
    display: "flex",
    flexDirection: "column",
    padding: "",
    position: "relative",
  };
  console.log(otp2)
  console.log(data2)

  return (
    <>
      <div className="p-5 shadow-md z-4 mt-2 m-auto" style={cardStyle}>
        <div className="flex justify-center items-center">
          <img src={logo} alt="Center Image" className="w-40 h-40" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black mt-4 text-3xl">OTP Verification</p>
          <p className="text-black mt-4">
            Enter the code from the SMS we sent to
          </p>
          <div className="text-black">+91 {mobile}</div>
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
          <div className="text-black-500" style={{ margin: "30px 20px 0 0" }}>
            I didn't receive any code.{" "}
            {counter === 0 && (
              <button className="ml-3 text-red-500 font-bold" onClick={handleResendOtp}>
                RESEND
              </button>
            )}
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <button
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded "
            style={{ marginTop: "30px" }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {/* SUBMIT */}
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Otp;
