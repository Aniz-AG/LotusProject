import topBackground from "../Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import fund from "../Images/wallet_transparent.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import usePayment from "../Hooks/usePayment";
import { useSelector } from "react-redux";
import useWallet from "../Hooks/useWallet";
import { BsFileEarmarkRuledFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";

function WithdrawFunds() {
  // State for withdrawal timings
  const [withdrawalTimings, setWithdrawalTimings] = useState("");
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const box1 = {
    padding: "10px",
    width: "300px",
    margin: "auto",
    marginBottom: "",
  };

  const enterAmount = {
    padding: "8px",
    display: "flex",
    width: "300px",
  };

  const box4 = {
    width: "auto",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-4px",
  };
  const box5 = {
    width: "auto",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-28px",
    marginBottom: "4px",
  };

  const btnStyle = {
    background: "#E5B80B",
    width: "200px",
    padding: "7px",
    borderRadius: "15px",
    marginTop: "-14px",
  };

  const cardStyle = {
    width: "373px",
    display: "flex",
    flexDirection: "column",
    padding: "",
    position: "relative",
  };

  const amount = useRef();
  const [method2, setMethod] = useState("");
  const token = useSelector((state) => state.userDetail.token);
  const number = useSelector((state) => state.userDetail.mobile);
  const [formErrors, setFormErrors] = useState({});
  const [errorText, setErrorText] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");
  const [gamesUpi, setGamesUpi] = useState([]);
  const [walletAmt, setWalletAmt] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const res = usePayment(token, number);
  const res2 = useWallet(token);

  useEffect(() => {
    const fetchWithdrawalTimings = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        unique_token: token,
        env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      });

      try {
        const response = await fetch("https://lotus365matka.in/api-user-withdraw-fund-request", {
          method: "POST",
          headers: myHeaders,
          body: raw,
        });
        const data = await response.json();
        console.log("Withdrawal timings data:", data);
        //setWithdrawalTimings(data.timings); // Assuming the API returns an object with a 'timings' property
      } catch (error) {
        console.error("Error fetching timings:", error);
      }
    };
    fetchWithdrawalTimings();
    
    // Fetch wallet amount
    if (res2 && res2.wallet_amt) {
      setWalletAmt(res2.wallet_amt);
    }

    // Fetch UPI methods
    if (res?.result) {
      setGamesUpi(res.result);
    }
  }, [res2.wallet_amt, res.result]);

  useEffect(() => {
    if (gamesUpi.length > 0) {
      setMethod(gamesUpi[0]?.type);
    }
  }, [gamesUpi]);

  const back = () => {
    navigate("/imp");
  };

  const handleUPIChange = (event) => {
    setSelectedUPI(event.target.value);
    const selectedUpiType = gamesUpi.find(
      (upi) => upi.value === event.target.value
    )?.type;
    setMethod(selectedUpiType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const errors = validate(amount.current.value, Number(walletAmt));
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      await fetchData(token, Number(amount.current.value), number, method2);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = (amount, walletAmt) => {
    const errors = {};
    if (!amount) {
      errors.amount = "Amount is required!";
    } else if (amount > walletAmt) {
      errors.amount = "Wallet Limit Exceeded";
    }
    return errors;
  };

  const fetchData = async (token, amount, number, method2) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: token,
      mobile: number,
      request_amount: amount,
      payment_method: method2,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://lotus365matka.in/api-user-withdraw-fund-request",
      requestOptions
    );
    const result = await response.json();
    if (result?.status === true) {
      setErrorText("");
    } else {
      setErrorText(result?.msg);
    }
  };

  return (
    <>
      <div className="flex justify-center bg-my-gradient-1 h-[100vh]">
        <div className="pt-4">
          <div style={cardStyle} className="z-4 shadow-md">
            <div className="flex items-center justify-center pr-2">
              <p className="text-white bg-yellow-500 my-4 py-2 px-4 rounded-3xl font-bold text-sm">
                Withdraw Timings: {withdrawalTimings || "Loading..."}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 items-center justify-center ml-3">
              <div
                onClick={() => navigate("/withdrawrule")}
                className="bg-my-gradient text-white hover:bg-yellow-500 mb-4 h-10 w-40 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"
              >
                <button className="flex py-2 px-1 ">
                  <p className="font-bold">Withdraw Rule</p>
                </button>
              </div>
              <div
                onClick={() => navigate("/withdrawhistory")}
                className="bg-my-gradient text-white hover:bg-yellow-500 mb-4 h-10 w-40 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"
              >
                <button className="flex py-2 px-1 ">
                  <p className="font-bold">Withdraw History</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col" style={box4}>
              <input
                type="text"
                placeholder="Enter Points"
                ref={amount}
                className="placeholder-white text-white font-bold border rounded-3xl mb-2 bg-transparent"
                style={enterAmount}
              />
              <p className="text-red-500 ">{formErrors.amount}</p>
            </div>
            <div style={box5}>
              <select
                className="text-black border rounded-xl font-bold"
                value={selectedUPI}
                onChange={handleUPIChange}
                style={enterAmount}
              >
                {gamesUpi.length === 0 ? (
                  <option value="" disabled>
                    Please set the method From Wallet First
                  </option>
                ) : (
                  gamesUpi.map((upi, index) => (
                    <option key={index} value={upi.value} className="text-black">
                      {upi?.name}: {upi?.value}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div style={box4} className="flex flex-col ">
              <button
                className="text-white rounded bg-yellow-500 hover:bg-yellow-500 py-2 px-4 "
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Withdraw Now"}
              </button>
              <p className="text-red-500 font-bold text-center mt-2 ">{errorText}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithdrawFunds;
