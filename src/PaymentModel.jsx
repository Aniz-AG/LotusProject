import React, { useEffect, useState, useRef } from "react";
import "./Modal.css";
import phone_pe from "./Images/phone_pe.png";
import gpay from "./Images/gpay.png";
import paytm from "./Images/paytm.png";
import phone from "./Images/phone_icon.png"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ closeModal, option }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  const mobile = useSelector(state=>state.userDetail.mobile)

  let buttonText, imgSrc,color,ispaytm,isphonepe,isgooglepe;
  switch (option) {
    case "1":
      imgSrc = phone_pe;
      buttonText = "Add PhonePe";
      ispaytm="";
      isgooglepe=""
      break;
    case "2":
      imgSrc = paytm;
      buttonText = "Add Paytm";
      isphonepe="";
      isgooglepe="";
      break;
    case "3":
      imgSrc = gpay;
      buttonText = "Add Gpay";
      isgooglepe="";
      ispaytm="";
      break;
    default:
      buttonText = "Add";
  }

  const phoneno = useRef();
  const [Errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  
  const validate = (phoneno) => {
    let errors = {};

    const regex = /^[6-9]{1}[0-9]{9}$/;

    if (!phoneno) {
      errors.phoneno = "Phone No is required!";
    } else if (!regex.test(phoneno)) {
      errors.phoneno = "Phone No is not Valid!";
    }

    return errors;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const errors = validate(phoneno.current?.value);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const otpData =await fetchData(
        mobile,
      );
      console.log(otpData)
      if (otpData?.status) {
        
        const phoneNumber = phoneno.current.value;
        const otp2 = otpData.otp
        navigate('/Otp2',{state : {phoneNumber,otp2,option}});
      } else {
        console.error("Failed to fetch OTP data");
      }
      

    } catch (error) {
    }
    
  };

  const fetchData = async (mobile) => {
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
      if(result?.status){
        return result;
      }
      
      
      }
     catch (error) {
    }
  };

  

  return (
    <>
      <div className="modal-wrapper rounded" onClick={closeModal}></div>
      <div className="modal-container text-black flex flex-col justify-center items-center rounded-tr-xl rounded-br-xl rounded-bl-none rounded-tl-xl font-bold py-4 px-2">
        <p className="text-center">{`${buttonText} Number`}</p>
        <div className={`flex rounded-xl py-4 px-4 my-2 justify-center items-center`}>
          <img src={imgSrc} alt="" className="w-25 h-12" />
        </div>
        <div className="flex text-white mb-2 py-2 w-full rounded-xl px-2">
          <img src={phone} alt=""  />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Enter Number"
            ref={phoneno}
            className=" bg-my-gradient-1 ml-4 border-none  px-10 rounded"
            name="phoneno"
          />
          
        </div>
        <p className="text-red-500">{Errors.phoneno}</p>
        <div className="flex  mt-2">
          <button
            onClick={closeModal}
            className="model-btn px-8 mr-5 rounded-xl bg-my-gradient-1 text-white"
          >
            CANCEL
          </button>
          <button
            className="ounded-xl px-8 py-2 bg-my-gradient-1 text-white"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
};
export default PaymentModal;
