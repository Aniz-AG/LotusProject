import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Top from "./Top";
import GameFRONT from "./GameFRONT";
import topBackground from './Images/main_bg.png';
import support from "./assets/ICONS AND BACKGROUNDS/customersupport.png";
import whatsapp from "./assets/ICONS AND BACKGROUNDS/whatsapp.png";
import telegram from "./assets/ICONS AND BACKGROUNDS/telegram.png";
import call from "./assets/ICONS AND BACKGROUNDS/call.png";
import { useSelector } from "react-redux";
import useGameFront from "./Hooks/useGameFront";

function Imp() {
  const topStyle = {
    backgroundSize: 'cover',
    height: 'auto',
    width: '100%',
    paddingBottom: '20px',
  };

  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);
  const token = useSelector((state) => state.userDetail.token);
  const memoizedNavbar = useMemo(() => <Navbar />, []);
  const memoizedTop = useMemo(() => <Top />, []);

  const resinfo = useGameFront(token);
  console.log(resinfo);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [telegramNumber,setTelegramNumber]=useState('');

  useEffect(() => {
      console.log('mobile number:',resinfo["mobile_1"]);
      setPhoneNumber(resinfo["mobile_1"]);
      setTelegramNumber(resinfo["telegram_no"]);
  }, [resinfo]);

  // Toggle support icons visibility
  const toggleSupportIcons = () => {
    setShowSupport(!showSupport);
    };

  const whatsappUrl =`https://wa.me/${phoneNumber}`;
  const telegramUrl = `https://t.me/${telegramNumber}`;
  const callUrl = phoneNumber ? `tel:${phoneNumber}` : "#";

  return (
    <>
      <div className="relative">
        {memoizedTop}

        <div className="" style={topStyle}>
          <GameFRONT />
        </div>

        {/* Floating customer support icon */}
        <div className="fixed bottom-[80px] right-[5px]">
          <div className="bg-white flex flex-col gap-[2px] justify-center items-center shadow-2xl border p-1 rounded-lg">
            <img
              src={support}
              alt="Support"
              className="w-10 h-10 cursor-pointer"
              onClick={toggleSupportIcons}
            />
            <p className="font-bold text-sm">Support</p>
          </div>

          {/* Support icons (WhatsApp, Telegram, Call) */}
          {showSupport && (
            <div className="absolute bottom-16 z-5 right-0 flex flex-col items-center space-y-3">
              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <img src={whatsapp} alt="WhatsApp" className="w-12 h-12" />
                </a>
              </div>

              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  <img src={telegram} alt="Telegram" className="w-10 h-10" />
                </a>
              </div>

              <div className="bg-white shadow-lg p-1 rounded-xl">
                <a href={callUrl}>
                  <img src={call} alt="Call" className="w-12 h-12" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Imp;
