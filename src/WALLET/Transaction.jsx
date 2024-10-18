import useTransaction from "../Hooks/useTransaction";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi"; // Back button icon
import { MdOutlineCheckCircle, MdRemoveCircleOutline } from "react-icons/md"; // Alternate icons for checks
import { useNavigate } from "react-router-dom";
import { RiSubtractFill } from "react-icons/ri"; // Existing icon for negative transaction
import { IoAddSharp } from "react-icons/io5"; // Existing icon for positive transaction

function Transaction() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useTransaction(unique);

  useEffect(() => {
    if (resinfo && resinfo["transaction_history"]) {
      setStatus(true);
      setGameRates(resinfo["transaction_history"]);
    } else {
      setStatus(false);
      setGameRates([]);
    }
  }, [resinfo]);

  const navigate = useNavigate();
  const back = () => {
    navigate("/imp7");
  }

  return (
    <>
      <div className="text-[#081025] text-sm font-bold pt-4 bg-[#0a0a12]">
        <h1 className="text-2xl text-white text-center mb-2">History</h1>
        <div className="">
          {gameRates.map((game, index) => (
            <div key={index} className="mb-4">
              <div className="border border-black mr-2 ml-4 px-2 py-4 flex items-center justify-between rounded-2xl bg-white">
                
                {/* Icon Section (First Column) */}
                <div className="w-[10%] flex justify-center">
                  {game.transaction_type === '1' 
                    ? <MdOutlineCheckCircle className="text-green-500 text-2xl font-bold" /> 
                    : <MdRemoveCircleOutline className="text-red-500 text-2xl font-bold" />} 
                </div>

                {/* Transaction Details Section (Second Column) */}
                <div className="w-[80%] text-center">
                  <p className="text-[#001f3f] font-bold">{game?.transaction_note}</p>
                  <p className="mt-2 text-gray-400 text-xs">{game?.insert_date}</p>
                </div>

                {/* Amount Section (Third Column) */}
                <div className="w-[10%] text-right font-bold">
                  <p className={game.transaction_type === '1' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                    {game.transaction_type === '1' ? `+${game.amount}` : `-${game.amount}`}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Transaction;
