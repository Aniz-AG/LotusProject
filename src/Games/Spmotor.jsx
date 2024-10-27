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
import MyModal from "../ShowModal.jsx";

function Spmotor() {
  const SpmotorArray = [
    "120",
    "123",
    "124",
    "125",
    "126",
    "127",
    "128",
    "129",
    "130",
    "134",
    "135",
    "136",
    "137",
    "138",
    "139",
    "140",
    "145",
    "146",
    "147",
    "148",
    "149",
    "150",
    "156",
    "157",
    "158",
    "159",
    "160",
    "167",
    "168",
    "169",
    "170",
    "178",
    "179",
    "180",
    "189",
    "190",
    "230",
    "234",
    "235",
    "236",
    "237",
    "238",
    "239",
    "240",
    "245",
    "246",
    "247",
    "248",
    "249",
    "250",
    "256",
    "257",
    "258",
    "259",
    "260",
    "267",
    "268",
    "269",
    "270",
    "278",
    "279",
    "280",
    "289",
    "290",
    "340",
    "345",
    "346",
    "347",
    "348",
    "349",
    "350",
    "356",
    "357",
    "358",
    "359",
    "360",
    "367",
    "368",
    "369",
    "370",
    "378",
    "379",
    "380",
    "389",
    "390",
    "450",
    "456",
    "457",
    "458",
    "459",
    "460",
    "467",
    "468",
    "469",
    "470",
    "478",
    "479",
    "480",
    "489",
    "490",
    "560",
    "567",
    "568",
    "569",
    "570",
    "578",
    "579",
    "580",
    "589",
    "590",
    "670",
    "678",
    "679",
    "680",
    "689",
    "690",
    "780",
    "789",
    "790",
    "890",
  ];
  const todayDate = new Date().toISOString().split("T")[0];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const newDate = new Date();
  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();

  const formattedDate = day + "-" + months[monthIndex] + "-" + year;
  const [submit, setSubmit] = useState("");

  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const backStyle = {
    backgroundSize: "cover", // This will make the background image cover the container without
    backgroundPosition: "center",
    position: "relative",
    paddingBottom: "400px",
  };
  const cardStyle = {
    width:"400px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
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
  const [selectedOption, setSelectedOption] = useState("open");
  const { gameId, openTime, gameName, pana } = useLocation().state;
  console.log(gameId);

  const fetchData = async () => {
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
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        "https://lotus365matka.in/api-user-wallet-balance",
        requestOptions
      );
      const result = await response.json();
      if (result && result.wallet_amt !== undefined) {
        setWalletAmt(result.wallet_amt);
      }

      setRes(result);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(isOpen);
  }, [res.wallet_amt]);

  useEffect(() => {
    if (res && res.wallet_amt) {
      setWalletAmt(resinfo.wallet_amt);
      console.log(typeof walletAmt);
    }
  }, [res.wallet_amt]);

  useEffect(() => {
    calculateTimeLeft(); // Call calculateTimeLeft whenever openTime changes
  }, [openTime]);

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
      const sessionValue = document.getElementById("option2").checked
        ? "open"
        : "close";
      const newDataObject = {
        digits: digit.current.value,
        closedigits: "",
        points: point.current.value,
        session: sessionValue,
      };
      const newWalletAmt = walletAmt - point.current.value;

      setWalletAmt(newWalletAmt);

      setSubmittedData((prevData) => {
        const updatedData = [...prevData, newDataObject];
        console.log(submittedData);
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
    } else if (!SpmotorArray.includes(digit)) {
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

  const calculateTimeLeft = () => {
    // Function to convert 12-hour format (e.g., "10:59 PM") to 24-hour format ("22:59")
    const convertTo24Hour = (time12h) => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
  
      if (modifier.toLowerCase() === 'pm' && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      }
      if (modifier.toLowerCase() === 'am' && hours === '12') {
        hours = '00';
      }
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };
  
    // Convert openTime to 24-hour format
    const openTime24Hour = convertTo24Hour(openTime);
    console.log("Converted open time (24-hour):", openTime24Hour);
  
    // Get the current clock time (HH:MM)
    const currentTime = new Date();
    const currentHours = currentTime.getHours().toString().padStart(2, '0');
    const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentTimeOnly = `${currentHours}:${currentMinutes}`;
  
    console.log("Current time (HH:MM):", currentTimeOnly);
  
    // Compare the converted open time and current time
    if (openTime24Hour <= currentTimeOnly) {
      setIsOpen(false);
      setSelectedOption("close");
    } else {
      setIsOpen(true);
      setSelectedOption("open");
    }
  };

  return (
    <>  
      <div style={backStyle} className="text-white bg-my-gradient-1">
      <div className="font-bold flex items-center justify-center text-lg underline pt-2 ml-2"><h1>SP Motor</h1></div>
        <div className="flex justify-center items-center pt-5 ">
          <div className="" style={cardStyle}>
            <input
              type="date"
              value={todayDate}
              readOnly
              className="shadow-md w-full flex justify-center py-2 px-4 text-black border border-black-500 rounded-xl text-center"
            />
            <p className="mt-2 ml-2 text-white">Choose Session</p>
            <div className="flex space-x-4 justify-center items-center w-full ">
            {isOpen ? (
                  <div className="shadow-md border flex justify-center items-center w-1/2 border-black-500 px-4 py-2 bg-white rounded-xl">
                  <input
                    type="radio"
                    id="option2"
                    name="radioGroup"
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500"
                    checked={selectedOption === "open"}
                    onChange={() => setSelectedOption("open")}
                  />
                  <label htmlFor="option2" className="ml-2 text-gray-700">
                    Open
                  </label>
                </div>
              ) : (
                <div className="shadow-md border flex justify-center items-center w-1/2 border-black-500 px-4 py-2 bg-gray-300 rounded-xl cursor-not-allowed opacity-50">
                  <input
                    type="radio"
                    id="option2"
                    name="radioGroup"
                    className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500"
                    checked={selectedOption === "open"}
                    disabled
                  />
                  <label htmlFor="option2" className="ml-2 text-gray-700">
                    Open
                  </label>
                </div>
              )}
              <div className="shadow-md flex justify-center items-center w-1/2 border border-black-500 px-4 py-2 bg-white rounded-xl">
                <input
                  type="radio"
                  id="option1"
                  name="radioGroup"
                  className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-500"
                  checked={selectedOption === "close"}
                  onChange={() => setSelectedOption("close")}
                />
                <label htmlFor="option1" className="ml-2 text-gray-700">
                  Close
                </label>
              </div>
            </div>

            <p className="mt-2 ml-2 font-bold text-white">{selectedOption === "open" ? "Open Pana" : "Close Pana"}</p>
            <input
              type="number"
              inputMode="numeric"
              ref={digit}
              placeholder="Enter Pana"
              className="shadow-md w-full py-2 px-4 border border-black-500 rounded-xl text-black"
            //   list="digitList" // Step 2: Add list attribute
              autoComplete="off"
            />
            <datalist id="digitList">
              {SpmotorArray.map((digit, index) => (
                <option key={index} value={digit} />
              ))}
            </datalist>
            <p className="mt-2 ml-2 font-bold text-white">Points</p>
            <input
              type="number"
              inputMode="numeric"
              ref={point}
              placeholder="Enter Points"
              className="shadow-md w-full  py-2 px-4 border border-black-500 rounded-xl text-black"
            />
            <div className="flex  mb-4 text-white">
              <button
                className={`py-2 px-4 border border-black-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 ${
                  isProceed ? "w-11/12" : "w-full"
                }`}
                onClick={handleSubmit}
              >
                Proceed
              </button>
              {isProceed && (
                <>
                  <button
                    className="py-2 px-4 border border-black-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 w-full ml-3"
                    onClick={() => setShowModal(true)}
                  >
                    Submit
                  </button>
                  {showModal && (
                    <MyModal
                      closeModal={closeModal}
                      totalIndex={submittedData.length}
                      totalPoints={totalPoints}
                      submittedData={submittedData}
                      gameId={gameId}
                      gameName={gameName}
                      pana={pana}
                      gametype={selectedOption==="open" ? "Open" : "Close"}
                      date={formattedDate}
                      clearSubmittedData={clearSubmittedData}
                    />
                  )}
                </>
              )}
            </div>
            {submittedData.map((data, index) => {
              const handleClickRemoveDiv = (indexToRemove) => () => {
                const newData = submittedData.filter(
                  (_, i) => i !== indexToRemove
                );
                setSubmittedData(newData);
                setFormErrors({});
                const removedItem = submittedData[indexToRemove];
                const removedItemPoint = parseInt(removedItem.points);

                // Check if removedItemPoint is a valid number
                if (!isNaN(removedItemPoint)) {
                  const newWalletAmt = walletAmt + removedItemPoint;
                  setWalletAmt(newWalletAmt);
                } else {
                  console.error("Invalid points data:", removedItem);
                }
                if (newData.length === 0) {
                  setIsProceed(false); // Set isProceed to false if only one item is left
                }
                console.log(submittedData);
              };

              return (
                <div key={index} className="w-full flex mb-3 ">
                  <div
                    className="shadow-md w-10/12  p-1  border border-black-500 bg-white text-black flex justify-between"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="flex flex-col items-center ml-4">
                      <h3>{isOpen ? "Open Pana" : "Close Pana"}</h3>
                      <h3>{data.digits}</h3>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                      <h3>Points</h3>
                      <h3>{data.points}</h3>
                    </div>
                  </div>
                  <button
                    className="shadow-md border bg-white py-2 px-4 flex items-center justify-center ml-1"
                    style={{ borderRadius: "20px" }}
                    onClick={handleClickRemoveDiv(index)}
                  >
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Spmotor;
