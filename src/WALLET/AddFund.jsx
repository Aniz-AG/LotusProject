import topBackground from "../Images/main_bg.png";
import { BiArrowBack } from "react-icons/bi";
import fund from "../Images/wallet_transparent.png";
import phone_pe from "../Images/phone_pe.png";
import gpay from "../Images/gpay.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUpiOption from "../Hooks/useUpiOtion";
import { useSelector } from "react-redux";
import useWallet from "../Hooks/useWallet";
import deposit_history_btn from "../Images/deposit_history_btn.png";
import deposit_rules_btn from "../Images/deposit_rules_btn.png";
import QR_PAY from "../QR_PAY";
import { BsFileEarmarkRuledFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";

function AddFunds() {
  const [amountToAdd, setAmountToAdd] = useState("");
  const [error, setError] = useState(""); // State to track error message
  const navigate = useNavigate();
  const mobile = useSelector((state) => state.userDetail.mobile);
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useUpiOption(unique, mobile);
  const res = useWallet(unique);

  const handleAddFunds = () => {
    if (parseInt(amountToAdd) >= 500) {
      setError(""); // Clear error when valid
      alert("Funds Added Successfully!"); // Placeholder alert
      setAmountToAdd(""); // Reset input field after adding funds
    } else {
      setError("Minimum amount to add is 500"); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-my-gradient-1 flex justify-center mx-auto py-4">
      <div className="mx-auto flex flex-col items-center">
        <div className="mb-4">
          <button
            onClick={() => navigate("/depositrule")}
            className="w-full px-[50px] bg-my-gradient-2 text-white font-bold py-2 rounded-full"
          >
            Deposit Rule
          </button>
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={amountToAdd}
            onChange={(e) => setAmountToAdd(e.target.value)}
            placeholder="Enter amount to add"
            className="w-full border rounded-full p-2 px-[70px]"
            min="500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Error message */}
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-white rounded-lg p-4 mr-2">
            <label className="flex items-center">
              <input type="radio" name="paymentMethod" value="PhonePe" className="mr-2" />
              <img src={phone_pe} alt="PhonePe" className="h-6 w-6 mr-2" />
              PhonePe
            </label>
          </div>

          <div className="bg-white rounded-lg p-4">
            <label className="flex items-center">
              <input type="radio" name="paymentMethod" value="GPay" className="mr-2" />
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
