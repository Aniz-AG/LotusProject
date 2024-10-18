import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import close from "../Images/close.png";
import open from "../Images/play.png";
import useAddFundData from "../Hooks/useAddFundData";
import topBackground from "../Images/bg.png";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function AddFundHistory() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const mobile = useSelector((state) => state.userDetail.mobile);
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useAddFundData(unique, mobile);
  console.log('thispages')
  console.log(resinfo);
  
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  useEffect(() => {
    if (resinfo && resinfo["result"]) {
      setStatus(true);
      setGameRates(resinfo["result"]);
    } else {
      setStatus(false);
      setGameRates([]);
    }
  }, [resinfo]);
  const navigate = useNavigate();
  const back = () => {
    navigate("/imp9");
  }

  return (
    <>
    <div className="text-black mt-2">
      <div className="">
        {gameRates.map((game, index) => (
          <div key={index} className="mb-8">
            <a href={game?.payment_receipt} target="_blank" rel="noopener noreferrer">
              <div className="border-black text-black mr-2 ml-4 p-2 py-4 flex flex-col bg-white rounded-3xl border">
                <div>
                  <p>
                    <span className="font-bold">Id:</span> {game?.tx_request_number}
                  </p>
                </div>
                <div className="flex justify-between align-top ">
                  <div className="flex flex-col">
                    <p >
                      <span className="font-bold">Payment Method:</span> 
                      {game?.payment_method}
                    </p>
                    <p> {game?.insert_date}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-yellow-600"> {game?.amount}</p>
                    <p>{game?.request_status === "0" ? "Pending" : "true"}</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default AddFundHistory;
