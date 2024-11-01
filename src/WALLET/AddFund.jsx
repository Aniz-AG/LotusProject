import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpiOption from "../Hooks/useUpiOtion";
import useWallet from "../Hooks/useWallet";
import phone_pe from "../Images/phone_pe.png";
import gpay from "../Images/gpay.png";

function AddFunds() {
  const [amountToAdd, setAmountToAdd] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); 
  const [bankDetails, setBankDetails] = useState("");
  const navigate = useNavigate();
  const name = useSelector((state) => state.userDetail.username);
  const mobile = useSelector((state) => state.userDetail.mobile);
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useUpiOption(unique, mobile);
  const res = useWallet(unique);

  const fetchUpiId = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`https://lotus365matka.in/api-admin-bank-details`, requestOptions);
      const result = await response.json();
      
      if (result?.status === true) {
        setBankDetails(result.bank_details[0]);
        console.log("Fetched UPI details:", result);
      } else {
        setError(result.msg || "Failed to fetch UPI ID. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error fetching UPI ID:", error);
      setError("An error occurred while fetching UPI ID.");
    }
  };

  useEffect(() => {
    fetchUpiId();
  }, []);

  const handleAddFunds = () => {
    if (parseInt(amountToAdd) >= 1) {
      if (!paymentMethod) {
        setError("Please select a payment method");
        return;
      }
      setError("");
      initiateUpiPayment(paymentMethod, amountToAdd);
    } else {
      setError("Minimum amount to add is 1");
    }
  };

  const sendFundRequest = async (amount) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      unique_token: unique,
      request_amount: amount,
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const res=await fetch(`https://lotus365matka.in/api-fund-request-add`, requestOptions);
      console.log("Add fund response:",res);
    } catch (error) {
      console.error("Error sending fund request:", error);
    }
  };

  const initiateUpiPayment = (method, amount) => {
    let upiId = "";
    let uri = "";

    if (method === "GPay") {
      upiId = bankDetails.google_upi_payment_id;
      uri = `intent://pay?pa=${upiId}&pn=${name}&mc=&tid=123456&tr=abcdef&tn=Add Funds&am=${amount}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
    } else if (method === "PhonePe") {
      upiId = bankDetails.phonepay_upi_payment_id;
      uri = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&tn=Add Funds&mc=0000&cu=INR&mode=02&purpose=00`;
      const additionalParams = `&orgid=159765&mg=OFFLINE&qrMedium=04&tr=abcdef`;
      uri += additionalParams;
    } else if (method === "Others") {
      upiId = bankDetails.google_upi_payment_id;
      uri = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=123456&tr=abcdef&tn=Add Funds&am=${amount}&cu=INR`;
    }

    if (!upiId) {
      setError("UPI ID not found for the selected payment method.");
      return;
    }

    // Attempt to open the UPI app directly
    try {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      window.open(uri, '_blank');

      // Send fund request after a short delay
      setTimeout(() => {
        sendFundRequest(amount);
        //navigate('/imp');
      }, 2000); 
    } catch (error) {
      console.error("Error opening UPI payment:", error);
      setError("An error occurred while trying to initiate payment.");
    }
  };

  return (
    <div className="min-h-screen bg-my-gradient-1 flex justify-center mx-auto py-4">
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold mb-[15px]">Add Funds</h1>

        <div className="mb-4">
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            placeholder="Enter amount to add"
            className="w-[250px] border rounded-full py-2 text-center border-yellow-600 border-[3px]"
            min="1"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <h2 className="text-white mb-2">Please select payment gateway.</h2>
        
        <div className="flex flex-col mb-4 mx-5 w-full">
          <div className="flex items-center mb-[20px]">
            <div className="bg-white rounded-lg p-4 flex-1 mr-2">
              <label className="flex items-center font-bold">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PhonePe"
                  onChange={() => setPaymentMethod("PhonePe")}
                  className="mr-2"
                />
                <img src={phone_pe} alt="PhonePe" className="h-6 w-6 mr-1" />
                PhonePe Gateway
              </label>
            </div>
          </div>

          <div className="flex items-center mb-[30px]">
            <div className="bg-white rounded-lg p-4 flex-1">
              <label className="flex items-center font-bold">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Others"
                  onChange={() => setPaymentMethod("Others")}
                  className="mr-2"
                />
                Other UPI Gateway
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddFunds}
            className="w-full mb-[10px] px-4 py-2 bg-yellow-500 text-white font-bold rounded-full"
          >
            Add Money
          </button>
          <h1 className="text-white font-bold text-center mb-[10px] text-xl ">OR</h1>
          <button
            onClick={() => navigate("/qrpay")}
            className="w-full px-4 py-2 bg-yellow-500 text-white font-bold rounded-full"
          >
            QR PAY
          </button>
        </div>

        <div>
          <button
            onClick={() => navigate("/addfundhistory")}
            className="w-full px-4 py-2 bg-my-gradient-2 mt-[20px] text-white font-bold rounded-full"
          >
            Deposit History
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFunds;