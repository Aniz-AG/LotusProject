import { BiArrowBack } from "react-icons/bi";
import WalletIcon from "../Images/wallet.png";
import topBackground from "../Images/bg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useGameFront from "../Hooks/useGameFront";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GaliModal from "./GaliModal.jsx";

function LeftDigit() {
  const singleDigitArray = Array.from({ length: 10 }, (_, index) => index.toString());
  const todayDate = new Date().toISOString().split("T")[0];
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  
  const newDate = new Date();
  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();
  
  const formattedDate = day + "-" + months[monthIndex] + "-" + year;
  const [submit, setSubmit] = useState('');

  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const backStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    paddingBottom: "400px",
  };
  
  const cardStyle = {
    width: "320px", // Reduced width
    display: "flex",
    flexDirection: "column",
    padding: "10px", // Reduced padding
  };
  

  const digit = useRef();
  const date = useRef();
  const point = useRef();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useGameFront(unique);
  const [walletAmt, setWalletAmt] = useState();
  const [submittedData, setSubmittedData] = useState([]);
  const [res, setRes] = useState({});
  const [isProceed, setIsProceed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const clearSubmittedData = () => {
    setIsProceed(false);
    setSubmittedData([]); // Function to clear submittedData
  };

  const [isOpen, setIsOpen] = useState(true);
  const { gameId, openTime, gameName, pana } = useLocation().state;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const errors = validate(digit.current.value, point.current.value);

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.digit) {
        toast(errors.digit);
      } else {
        toast(errors.point);
      }
      return;
    } else {
      setIsProceed(true);
      setFormErrors({});
      const newDataObject = {
        digits: digit.current.value,
        closedigits: "",
        points: point.current.value,
        session: "",
      };
      const newWalletAmt = walletAmt - point.current.value;

      setWalletAmt(newWalletAmt);

      setSubmittedData((prevData) => {
        const updatedData = [...prevData, newDataObject];
        return updatedData;
      });
      setDigitValue("");
      setPointValue("");
    }
  };

  const setDigitValue = (value) => {
    digit.current.value = value;
  };

  const setPointValue = (value) => {
    point.current.value = value;
  };

  const validate = (digit, point) => {
    const errors = {};
    if (!digit) {
      errors.digit = "Please enter the number";
    } else if (!singleDigitArray.includes(digit)) {
      errors.digit = `Number ${digit} is not valid`;
    }
    if (!point) {
      errors.point = "Please enter point";
    } else if (parseInt(point) < 10) {
      errors.point = "Required minimum bid amount is 10";
    } else if (parseInt(point) > walletAmt) {
      errors.point = "Insufficient balance please refill your account";
    }
    return errors;
  };

  return (
    <>
      <div style={backStyle} className="text-white bg-my-gradient-1">
        <h1 className="text-center font-bold pt-2">Left Digit</h1>
        <div className="flex justify-center items-center pt-5">
          <div style={cardStyle}>
            <input
              type="date"
              value={todayDate}
              readOnly
              className="shadow-md w-full px-4 py-2 text-black font-bold bg-white border-2 rounded-3xl text-center"
            />
            <p className="mt-1 ml-2 text-white font-bold">Digit</p>
            <input
              type="number"
              inputMode="numeric"
              ref={digit}
              placeholder="Enter Digits"
              className="shadow-md w-full px-4 py-2 border rounded-xl text-white bg-white border-white-500"
               // Apply the gradient style here
              list="digitList"
              autoComplete="off"
            />
            <datalist id="digitList">
              {singleDigitArray.map((digit, index) => (
                <option key={index} value={digit} />
              ))}
            </datalist>
            <p className="mt-2 ml-2 text-white font-bold">Points</p>
            <input
              type="number"
              inputMode="numeric"
              ref={point}
              placeholder="Enter Points"
              className="shadow-md w-full px-4 py-2 border rounded-xl text-white bg-white border-white-500"
               // Apply the gradient style here
            />
            <div className="flex mb-4 text-white">
              <button
                className={`px-4 py-2 border-2 border-white-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 ${
                  isProceed ? "w-11/12" : "w-full"
                }`}
                onClick={handleSubmit}
              >
                Proceed
              </button>
              {isProceed && (
                <>
                  <button
                    className="px-4 py-2 border border-white-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 w-full ml-3 text-white"
                    onClick={() => setShowModal(true)}
                  >
                    Submit
                  </button>
                  {showModal && (
                    <GaliModal
                      closeModal={closeModal}
                      totalIndex={submittedData.length}
                      totalPoints={submittedData.reduce((acc, curr) => acc + parseInt(curr.points), 0)}
                      submittedData={submittedData}
                      gameId={gameId}
                      gameName={gameName}
                      pana={pana}
                      date={formattedDate}
                      clearSubmittedData={clearSubmittedData}
                    />
                  )}
                </>
              )}
            </div>
            {submittedData.map((data, index) => (
              <div key={index} className="w-full flex mb-3">
                <div
                  className="shadow-md w-10/12 p-1 border border-white-500 bg-white border-white-500 text-white flex justify-between"
                  style={{ borderRadius: "25px" }}
                >
                  <div className="flex flex-col items-center ml-4">
                    <h3>Close Digit</h3>
                    <h3>{data.digits}</h3>
                  </div>
                  <div className="flex flex-col items-center mr-4">
                    <h3>Points</h3>
                    <h3>{data.points}</h3>
                  </div>
                </div>
                <button
                  className="shadow-md border bg-white border-white-500 px-4 py-2 flex items-center justify-center ml-1"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    const newData = submittedData.filter((_, i) => i !== index);
                    setSubmittedData(newData);
                    const removedItem = submittedData[index];
                    const removedItemPoint = parseInt(removedItem.points);
                    if (!isNaN(removedItemPoint)) {
                      const newWalletAmt = walletAmt + removedItemPoint;
                      setWalletAmt(newWalletAmt);
                    }
                    if (newData.length === 0) {
                      setIsProceed(false);
                    }
                  }}
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftDigit;
