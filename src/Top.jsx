import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import addfund from "./assets/ICONS AND BACKGROUNDS/add fund.png";
import call from './assets/ICONS AND BACKGROUNDS/call.png';
import withdraw from './assets/ICONS AND BACKGROUNDS/withdraw.png';
import whatsapp from './assets/ICONS AND BACKGROUNDS/whatsapp.png';
import gali from "./assets/ICONS AND BACKGROUNDS/gali.png";
import telegram from "./assets/ICONS AND BACKGROUNDS/telegram.png";
import star from "./assets/ICONS AND BACKGROUNDS/starlineFinal.png";
import useCarosuel from "./Hooks/useCarosuel";
import useGameFront from "./Hooks/useGameFront";

function Top() {
  const token = useSelector((state) => state.userDetail.token);
  const res = useCarosuel(token);
  const [sd, setsd] = useState([]);
  const navigate = useNavigate();
  const addF = () => {
    navigate("/imp9");
  };

  useEffect(() => {
    if (res && res.sliderdata) {
      setsd(res.sliderdata);
    }
  }, [res]);

  const unique = useSelector((state) => state.userDetail.token);
  const resinfo = useGameFront(unique);
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([{}]);

  useEffect(() => {
    if (resinfo && resinfo["mobile_1"]) {
      setStatus(true);
      setGameRates(resinfo["mobile_1"]);
    }
  }, [resinfo]);

  const phoneNumber = gameRates;
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <>     
        <div className="px-2">
          <div className="grid grid-cols-4 gap-4 px-2">
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <button onClick={() => navigate("/addfund")} className="flex flex-col items-center justify-center py-4">
                <img src={addfund} alt="Addfund Icon" className="w-[63px] h-[63px] sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-sm mb-1 shadow-sm" />
                <p className="font-bold text-black text-xs">AddFund</p>
              </button>

              <button onClick={() => navigate("/withdraw")} className="flex flex-col items-center justify-center py-4">
                <img src={withdraw} alt="Withdraw Icon" className="w-[60px] h-[60px] sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-sm mb-[6px] translate-y-[2px] shadow-sm" />
                <p className="font-bold text-black text-xs m-0 p-0">Withdraw</p>
              </button>
            </div>

            <div className="col-span-2 mt-2">
              <button onClick={() => navigate("/galiIMP")} className="relative flex flex-col items-center justify-center py-4">
                <img src={gali} alt="Gali Icon" className="w-[180px] h-[58px] rounded-sm mb-1 shadow-md" />
                <p className="font-bold text-black text-xs m-0 p-0">Gali Disawar</p>
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-2 overflow-hidden shadow-sm">
            <p className="animate-marquee whitespace-nowrap bg-purple font-bold text-sm px-4 ">
              PLEASE DOWNLOAD OUR APP TO ADD AND WITHDRAW FAST (24X7)
            </p>
          </div>

          <div className="flex justify-center items-center pb-2">
            <button className="relative" onClick={() => navigate("/imp2")}>
              <img src={star} alt="Starline Icon" className="w-[335px] h-[60px] mt-0.75 shadow-md" />
            </button>
          </div>
          <div>
            <h1 className="text-center font-bold text-2xl text-red-600 glow-text">विश्व का सबसे भरोसेमंद मटका  </h1>
          </div>
        </div>
    </>
  );
}

export default React.memo(Top);
