import { BiArrowBack } from "react-icons/bi";
import topBackground from "./Images/bg.png";
import { useNavigate } from "react-router-dom";
import GameRates from "./GameRates";
import { useState, useEffect } from "react";
import useQRPAY from "./Hooks/useQRPAY";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import what from "./Images/whatsapp2.png";
import { useSelector } from "react-redux";
import useGameFront from "./Hooks/useGameFront";
// import { useNavigate } from "react-router-dom";

function QR_PAY() {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
    marginTop: "0px"
  };
  const back = () => {
    navigate("/addfund");
  };
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);

  const resinfo = useQRPAY();

  useEffect(() => {
    if (resinfo && resinfo["qrdata"]) {
      setStatus(true);
      setGameRates(resinfo["qrdata"][0]);
    }
  }, [resinfo]);
  console.log(gameRates);
  console.log(gameRates.upi_id);

  
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo1 = useGameFront(unique);
  const [status1, setStatus1] = useState(false);
  const [gameRates1, setGameRates1] = useState([{}]);

  useEffect(() => {
    if (resinfo1 && resinfo1["mobile_1"]) {
      setStatus1(true);
      setGameRates1(resinfo1["mobile_1"]);
    }
  }, [resinfo1]);
  console.log(gameRates1)
  
  const phoneNumber = gameRates1;

  const [copied, setCopied] = useState(false);
  const textToCopy = gameRates.upi_id;
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  return (
    <>

      <div className=" text-white text-sm h-[100vh] bg-my-gradient-1" >
        <div style={cardStyle}>
          <p className="font-bold">Pay & Send the Screenshot </p>
          <p className="font-bold">With Registered Mobile Number</p>
          <div className=" flex flex-col justify-center items-center mt-4">
            <p className="font-bold mt-1"> Scan & Pay</p>
            <img className="h-[180px] w-[180px] mt-1 border border-black z-2" src={gameRates.qr_image} alt="" />
          </div>

          <div className=" flex justify-between items-center border rounded-3xl w-[350px] p-2 px-4 mt-[50px]">
            <p>{gameRates.upi_id}</p>
            <CopyToClipboard text={textToCopy} onCopy={() => setCopied(true)}>
              <button>
                <FaRegCopy />
              </button>
            </CopyToClipboard>
            <p>{copied && <span style={{ color: "green" }}>Copied!</span>}</p>
          </div>
          <div className="flex flex-col items-center justify-center mt-[40px] mb-1 text-sm font-bold">
            <p>Send transaction Successful </p>
            <p>Screenshot on whatsapp</p>
          </div>

          <div className=" w-[280px] text-red-500 bg-white px-8 py-1 border rounded-xl mt-3 hover:bg-gray-100 hover:border-none "> 
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer " className="flex justify-center items-center font-extrabold text-lg">
              Send Screeenshot
              <img src={what} alt=""  className="ml-2"/>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default QR_PAY;
