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

function FullSangam() {
  const fullSangamOpenArray = Array.from({ length: 10 }, (_, index) => index.toString());
  
  const fullSangamArray = [
    "000", "100", "110", "111", "112", "113", "114", "115", "116", "117",
    "118", "119", "120", "122", "123", "124", "125", "126", "127", "128",
    "129", "130", "133", "134", "135", "136", "137", "138", "139", "140",
    "144", "145", "146", "147", "148", "149", "150", "155", "156", "157",
    "158", "159", "160", "166", "167", "168", "169", "170", "177", "178",
    "179", "180", "188", "189", "190", "199", "200", "220", "222", "223",
    "224", "225", "226", "227", "228", "229", "230", "233", "234", "235",
    "236", "237", "238", "239", "240", "244", "245", "246", "247", "248",
    "249", "250", "255", "256", "257", "258", "259", "260", "266", "267",
    "268", "269", "270", "277", "278", "279", "280", "288", "289", "290",
    "299", "300", "330", "333", "334", "335", "336", "337", "338", "339",
    "340", "344", "345", "346", "347", "348", "349", "350", "355", "356",
    "357", "358", "359", "360", "366", "367", "368", "369", "370", "377",
    "378", "379", "380", "388", "389", "390", "399", "400", "440", "444",
    "445", "446", "447", "448", "449", "450", "455", "456", "457", "458",
    "459", "460", "466", "467", "468", "469", "470", "477", "478", "479",
    "480", "488", "489", "490", "499", "500", "550", "555", "556", "557",
    "558", "559", "560", "566", "567", "568", "569", "570", "577", "578",
    "579", "580", "588", "589", "590", "599", "600", "660", "666", "667",
    "668", "669", "670", "677", "678", "679", "680", "688", "689", "690",
    "699", "700", "770", "777", "778", "779", "780", "788", "789", "790",
    "799", "800", "880", "888", "889", "890", "899", "900", "990", "999"
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

  console.log(formattedDate);
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const backStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    paddingBottom: "400px",
  };
  const cardStyle = {
    width: "400x",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  const Opendigit= useRef();
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


  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors({});
    const errors = validate(digit.current.value, point.current.value,Opendigit.current.value);

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.digit) {
        toast(errors.digit);
      }
      else if(errors.Opendigit)
      {
        toast(errors.Opendigit);
      }
       else {
        toast(errors.point);
      }
      return;
    } else {
      setIsProceed(true);
      setFormErrors({});

      const newDataObject = {
        digits: Opendigit.current.value,
        closedigits: digit.current.value,
        points: point.current.value,
        session: "closed",
      };
      const newWalletAmt = walletAmt - point.current.value;

      setWalletAmt(newWalletAmt);

      setSubmittedData((prevData) => {
        const updatedData = [...prevData, newDataObject];
        console.log(submittedData);
        return updatedData;
      });
      setOpenDigitValue("");
      setDigitValue("");
      setPointValue("");
    }
  };
  const setOpenDigitValue = (value) => {
    Opendigit.current.value = value;
  };
  const setDigitValue = (value) => {
    digit.current.value = value;
  };

  const setPointValue = (value) => {
    point.current.value = value;
  };

  const validate = (digit, point,Opendigit) => {
    const errors = {};
    if (!Opendigit) {
      errors.Opendigit = "Please enter the number";
    } else if (!fullSangamOpenArray.includes(Opendigit)) {
      errors.Opendigit = `Number ${Opendigit} is not valid`;
    }
    else if (!fullSangamArray.includes(digit)) {
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

    const totalPoints = submittedData.reduce(
    (acc, curr) => acc + parseInt(curr.points),
    0
  );


  return (
    <> 
      <div style={backStyle} className="text-white bg-my-gradient-1">
      <div className="font-bold flex items-center justify-center text-lg underline pt-2"><h1>Full Sangam</h1></div>
      <div className="flex justify-center items-center">
        <div className="" style={cardStyle}>
        <input
              type="date"
              value={todayDate}
              readOnly
              className="shadow-md  w-full flex justify-center py-2 px-2 text-black border border-black-500 rounded-xl text-center"
            />  
          <p className="mt-2 ml-2 font-bold text-white">Open Digit</p>
            <input
              type="number"
              inputMode="numeric"
              ref={Opendigit}
              placeholder="Enter Digit"
              className="shadow-md w-full py-2 px-4 border border-black-500 rounded-xl text-white"
              list="digitList" // Step 2: Add list attribute
              autoComplete="off"
            />
            <datalist id="digitList">
              {fullSangamOpenArray.map((digit, index) => (
                <option key={index} value={digit} />
              ))}
            </datalist>
            <p className="mt-2 ml-2 font-bold text-white">Close Digit</p>
            <input
              type="number"
              inputMode="numeric"
              ref={digit}
              placeholder="Enter Digit"
              className="shadow-md w-full py-2 px-4 border border-black-500 rounded-xl text-white"
              list="digitClosedList" // Step 2: Add list attribute
              autoComplete="off"
            />
            <datalist id="digitClosedList">
              {fullSangamArray.map((digit, index) => (
                <option key={index} value={digit} />
              ))}
            </datalist>
            <p className="mt-2 ml-2 font-bold text-white">Points</p>
            <input
              type="number"
              inputMode="numeric"
              ref={point}
              placeholder="Enter Points"
              className="shadow-md w-full  py-2 px-4 border border-black-500 rounded-xl text-white"
            />
            <div className="flex  mb-4 text-white">
              <button
                className={`py-2 px-4 border-black-500 rounded-xl bg-yellow-600 hover:bg-yellow-500 cursor-pointer mt-4 ${
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
                    className="shadow-md w-10/12  p-1  border border-black-500 bg-white text-white flex justify-between"
                    style={{ borderRadius: "25px" }}
                  >
                    <div className="flex flex-col items-center ml-4">
                      <h3>Open Digit</h3>
                      <h3>{data.digits}</h3>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <h3>Close Digit</h3>
                      <h3>{data.closedigits}</h3>
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
export default FullSangam;
