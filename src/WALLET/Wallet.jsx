import topBackground from "../Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import fund from "../Images/wallet_transparent.png";
import phone_pe from "../Images/phone_pe.png";
import gpay from "../Images/gpay.png";
import frame from "../Images/frame_addfund.png";
import paytm from "../Images/paytm.png";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../PaymentModel.jsx";
import { useState, useEffect } from "react";
import useWallet from "../Hooks/useWallet.jsx";
import { useSelector } from "react-redux";
import wallet_history_btn from "../Images/wallet_history_btn.png";
import { FaHistory } from "react-icons/fa";

function Wallet() {
  const Container1 = {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    justifyContent: "center",
    alignItems: "center",
  };

  const box2 = {
    width: "75px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "white",
    height: "80px",
    borderRadius: "12px",
  };

  const radioImageStyle = {
    width: "30px",
    height: "30px",
  };

  const buttonTextStyle = {
    marginTop: "5px",
    padding: "5px 10px",
    borderRadius: "4px",
    border: "1px solid transparent",
    backgroundColor: "transparent",
    color: "black",
    cursor: "pointer",
    transition: "background-color 0.2s, border 0.2s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#f0c14b",
    border: "1px solid #a88734",
  };

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = async (option) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOption(null);
  };

  const unique = useSelector((state) => state.userDetail.token);
  const res = useWallet(unique);

  useEffect(() => {
    if (res && res.wallet_amt) {
      // Handle wallet amount here if needed
    }
  }, [res.wallet_amt]);

  return (
    <div className="py-5 text-black z-4 shadow-md m-auto bg-my-gradient-1 h-[100vh]">
      <div className="font-bold text-white flex items-center justify-center text-2xl mb-4">
        <h1>WALLET</h1>
      </div>
      <div className="grid grid-cols-3 gap-2 m-auto px-3">
        <div onClick={() => navigate("/imp9")} className="bg-my-gradient  text-white hover:bg-yellow-500 mb-4 h-[60px] w-25  flex items-center justify-evenly rounded-[4px] z-4 hover:shadow-lg shadow-md">
          <button className="flex py-2">
            <p className="font-bold">Add Fund</p>
          </button>
        </div>
        <div onClick={() => navigate("/imp8")} className="bg-my-gradient  text-white hover:bg-yellow-500 mb-4 h-[60px] w-25 flex items-center justify-evenly rounded-[4px] z-4 hover:shadow-lg shadow-md">
          <button className="flex py-2">
            <p className="font-bold">Withdraw Fund</p>
          </button>
        </div>
        <div onClick={() => navigate("/transfer")} className="bg-my-gradient  text-white hover:bg-yellow-500 mb-4 h-[60px] w-25 flex items-center justify-evenly rounded-[4px] z-4 hover:shadow-lg shadow-md">
          <button className="flex py-2">
            <p className="font-bold">Transfer</p>
          </button>
        </div>
      </div>

      <div className="w-80 m-auto mt-[20px] mb-[20px]">
        <div className="px-4 py-1 border bg-white mb-[30px]">
          <p className="font-bold text-center text-sm text-black">PLEASE SELECT WITHDRAW METHOD HERE</p>
        </div>
        <div style={Container1} className="w-80 px-0 pb-2">
          <div className="mr-9">
            <button className="flex flex-col items-center" style={box2} onClick={() => handleClick("1")}>
              <img src={phone_pe} alt="PhonePe" style={radioImageStyle} />
              <span
                className="text-black text-sm font-bold"
                style={buttonTextStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: "transparent", border: "1px solid transparent" })}
              >
                PhonePe
              </span>
            </button>
          </div>
          <div className="mr-9">
            <button className="flex flex-col items-center font-bold" style={box2} onClick={() => handleClick("2")}>
              <img src={paytm} alt="Paytm" style={radioImageStyle} />
              <span
                className="text-black text-sm"
                style={buttonTextStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: "transparent", border: "1px solid transparent" })}
              >
                Paytm
              </span>
            </button>
          </div>
          <div>
            <button className="flex flex-col items-center font-bold" style={box2} onClick={() => handleClick("3")}>
              <img src={gpay} alt="GPay" style={radioImageStyle} />
              <span
                className="text-black text-sm"
                style={buttonTextStyle}
                onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: "transparent", border: "1px solid transparent" })}
              >
                GPay
              </span>
            </button>
          </div>
        </div>

        {/* New rows */}
        <div className="text-white text-center mt-6 mb-4 text-xl font-bold">
          <p>Or</p>
        </div>

        <div className="text-center mb-4">
          <button
            className="w-[180px] bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-2xl"
            onClick={() => navigate("/qrpay")}
          >
            QR PAY
          </button>
        </div>

        <div className="text-center">
          <button
            className="w-[180px] bg-white text-yellow-600 hover:bg-yellow-500 font-bold py-2 px-4 border-yellow-500 border-[4px] rounded-3xl"
            onClick={() => navigate("/transaction")}
          >
            Wallet History
          </button>
        </div>
        
        {showModal && <PaymentModal closeModal={closeModal} option={selectedOption} />}
      </div>
    </div>
  );
}

export default Wallet;
