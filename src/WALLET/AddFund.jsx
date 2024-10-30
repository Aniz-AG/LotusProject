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
  const name= useSelector((state) => state.userDetail.username);
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
    if (parseInt(amountToAdd) >= 500) {
      if (!paymentMethod) {
        setError("Please select a payment method");
        return;
      }
      setError("");
      initiateUpiPayment(paymentMethod, amountToAdd);
    } else {
      setError("Minimum amount to add is 500");
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
      await fetch(`https://lotus365matka.in/api-fund-request-add`, requestOptions);
    } catch (error) {
      console.error("Error sending fund request:", error);
    }
  };

  const initiateUpiPayment = (method, amount) => {
    let upiId = "";
    if (method === "GPay" && bankDetails) {
      upiId = bankDetails.google_upi_payment_id;
    } else if (method === "PhonePe" && bankDetails) {
      upiId = bankDetails.phonepay_upi_payment_id;
    }

    if (!upiId) {
      setError("UPI ID not found for the selected payment method.");
      return;
    }

    const uri = `upi://pay?pa=${upiId}&pn=${name}&mc=&tid=YourTransactionId&tr=YourTransactionRefId&tn=YourTransactionNote&am=${amount}&cu=INR&url=https://yourapp.com/payment-response`;

    const intent = window.navigator.userAgent.match(/Android/i)
        ? `intent://pay?${new URLSearchParams(uri).toString()}#Intent;scheme=https;package=${method === "PhonePe" ? "com.phonepe.app" : "com.google.android.apps.nbu.paisa.user"};end`
        : uri ;
    window.open(intent, "_blank");

    // Send request to backend after opening UPI app
    setTimeout(() => {
      sendFundRequest(amount);
    }, 2000); 
  };

  return (
    <div className="min-h-screen bg-my-gradient-1 flex justify-center mx-auto py-4">
      <div className="mx-auto flex flex-col items-center">
        <div className="mb-4">
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            placeholder="Enter amount to add"
            className="w-full border rounded-full p-2 px-[70px]"
            min="500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-white rounded-lg p-4 mr-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PhonePe"
                onChange={() => setPaymentMethod("PhonePe")}
                className="mr-2"
              />
              <img src={phone_pe} alt="PhonePe" className="h-6 w-6 mr-2" />
              PhonePe
            </label>
          </div>

          <div className="bg-white rounded-lg p-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="GPay"
                onChange={() => setPaymentMethod("GPay")}
                className="mr-2"
              />
              <img src={gpay} alt="GPay" className="h-6 w-6 mr-2" />
              GPay
            </label>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddFunds}
            className="w-full px-[40px] bg-yellow-500 text-white font-bold py-2 rounded-full"
          >
            Add Money
          </button>
        </div>

        <div className="text-center mb-4 text-white font-bold">OR</div>

        <div className="mb-4">
          <button
            onClick={() => navigate("/qrpay")}
            className="w-full px-[40px] bg-yellow-500 text-white font-bold py-2 rounded-full"
          >
            QR PAY
          </button>
        </div>

        <div>
          <button
            onClick={() => navigate("/addfundhistory")}
            className="w-full px-[50px] bg-my-gradient-2 mt-[70px] text-white font-bold py-2 rounded-full"
          >
            Deposit History
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFunds;